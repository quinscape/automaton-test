package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.model.js.StaticFunctionReferences;
import de.quinscape.automaton.runtime.attachment.AttachmentRepository;
import de.quinscape.automaton.runtime.attachment.DatabaseAttachmentContentRepository;
import de.quinscape.automaton.runtime.attachment.DefaultAttachmentRepository;
import de.quinscape.automaton.runtime.data.FilterContextConfiguration;
import de.quinscape.automaton.runtime.data.FilterContextRegistry;
import de.quinscape.automaton.runtime.domain.DomainMonitorService;
import de.quinscape.automaton.runtime.domain.IdGenerator;
import de.quinscape.automaton.runtime.domain.UUIDGenerator;
import de.quinscape.automaton.runtime.domain.op.BatchStoreOperation;
import de.quinscape.automaton.runtime.domain.op.DefaultBatchStoreOperation;
import de.quinscape.automaton.runtime.domain.op.DefaultStoreOperation;
import de.quinscape.automaton.runtime.domain.op.StoreOperation;
import de.quinscape.automaton.runtime.export.excel.ExcelExporter;
import de.quinscape.automaton.runtime.export.GraphQLQueryContext;
import de.quinscape.automaton.runtime.export.json.JSONExporter;
import de.quinscape.automaton.runtime.filter.JavaFilterTransformer;
import de.quinscape.automaton.runtime.i18n.DefaultTranslationService;
import de.quinscape.automaton.runtime.i18n.TranslationService;
import de.quinscape.automaton.runtime.pubsub.DefaultPubSubService;
import de.quinscape.automaton.runtime.pubsub.PubSubMessageHandler;
import de.quinscape.automaton.runtime.pubsub.PubSubService;
import de.quinscape.automaton.runtime.userinfo.IQueryUserInfoProvider;
import de.quinscape.automaton.runtime.userinfo.UserInfoService;
import de.quinscape.automaton.runtime.ws.DefaultAutomatonWebSocketHandler;
import de.quinscape.automatontest.domain.tables.pojos.AppTranslation;
import de.quinscape.automatontest.model.ValidationRules;
import de.quinscape.domainql.DomainQL;
import de.quinscape.domainql.meta.MetadataProvider;
import de.quinscape.spring.jsview.loader.FileResourceLoader;
import de.quinscape.spring.jsview.loader.JSONResourceConverter;
import de.quinscape.spring.jsview.loader.ResourceHandle;
import de.quinscape.spring.jsview.loader.ResourceLoader;
import org.jooq.DSLContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.util.Collections;

import static de.quinscape.automatontest.domain.Tables.*;

@Configuration
public class ServiceConfiguration
{
    private final static Logger log = LoggerFactory.getLogger(ServiceConfiguration.class);


    private FileResourceLoader externalResourceLoader;

    @Bean
    @Qualifier("validationRules")
    public ResourceHandle<ValidationRules> validationService(ResourceLoader resourceLoader, @Value("${automatontest.validation.rules:}") String externalRules) throws IOException
    {
        final ResourceHandle<ValidationRules> handle;
        final JSONResourceConverter<ValidationRules> converter = new JSONResourceConverter<>(ValidationRules.class);
        if (StringUtils.hasText(externalRules))
        {
            log.info("Loading validation rules from external file {}", externalRules);

            final File externalRulesFile = new File(externalRules);
            final File externalRulesDir = externalRulesFile.getParentFile();

            externalResourceLoader = new FileResourceLoader(externalRulesDir.getAbsolutePath(), false);
            handle = externalResourceLoader.getResourceHandle(externalRulesFile.getName(), converter);
        }
        else
        {
            log.info("Loading default validation rules from /WEB-INF/rules.json");

            handle = resourceLoader.getResourceHandle(
                "WEB-INF/rules.json",
                converter
            );
        }
        return handle;
    }

    @Bean
    public IdGenerator uuidGenerator()
    {
        return new UUIDGenerator();
    }

    @Bean
    public StoreOperation defaultStoreOperation(
        DSLContext dslContext,
        @Lazy DomainQL domainQL
    )
    {
        return new DefaultStoreOperation(
            dslContext,
            domainQL
        );
    }

    @Bean
    public BatchStoreOperation defaultBatchStoreOperation(
        DSLContext dslContext,
        @Lazy DomainQL domainQL
    )
    {
        return new DefaultBatchStoreOperation(
            dslContext,
            domainQL
        );
    }


    @Bean
    public DefaultAutomatonWebSocketHandler automatonWebSocketHandler(
        PubSubService pubSubService,
        JavaFilterTransformer javaFilterTransformer,
        @Lazy DomainQL domainQL
    )
    {
        return new DefaultAutomatonWebSocketHandler(
            Collections.singletonList(
                new PubSubMessageHandler(domainQL, pubSubService, javaFilterTransformer)
            )
        );
    }

    @Bean
    public PubSubService pubSubService(FilterContextRegistry registry)
    {
        return new DefaultPubSubService(registry);
    }

    @Bean
    public DomainMonitorService domainMonitorService(PubSubService pubSubService)
    {
        return new DomainMonitorService(
            pubSubService
        );
    }

    @Bean
    public TranslationService translationService(
        DSLContext dslContext,

        @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection") @Qualifier("jsFunctionReferences")
            ResourceHandle<StaticFunctionReferences> jsFunctionReferencesHandle
    )
    {
        return new DefaultTranslationService(
            dslContext,
            jsFunctionReferencesHandle,
            APP_TRANSLATION,
            AppTranslation.class
        );
    }

    @Bean
    public FilterContextConfiguration filterContextConfiguration(DSLContext dslContext)
    {
        return registry -> {
            registry.register("param","https://quinscape.de");
            registry.register("userCount", ctx -> dslContext.selectCount().from(APP_USER).fetchOne().value1());
        };
    }

    @Bean
    public UserInfoService userInfoService(
        @Lazy DomainQL domainQL
    )
    {
        return new UserInfoService(
            new IQueryUserInfoProvider(
                domainQL,
                // language=GraphQL
                "query getUserInfo($config: QueryConfigInput!)\n" +
                "{\n" +
                "    iQueryAppUser(config: $config)\n" +
                "    {\n" +
                "        type" +
                    "        \n" +
                    "        rows{\n" +
                "            id\n" +
                "            created\n" +
                "            lastLogin\n" +
                "            foos{\n" +
                "                name\n" +
                "                created\n" +
                "            }\n" +
                "            bazes{\n" +
                "                name\n" +
                "            }\n" +
                "        }\n" +
                "    }\n" +
                "}"
            )
        );
    }

// Alternative: File based attachment repository
//    @Bean
//    public AttachmentRepository attachmentRepository(
//        DSLContext dslContext,
//        @Lazy DomainQL domainQL,
//        @Value("${automatontest.attachments}") String attachmentDirectory
//    )
//    {
//        return new DefaultAttachmentRepository(
//            dslContext,
//            domainQL,
//            new FileBasedAttachmentContentRepository(
//                new File(attachmentDirectory)
//            )
//        );
//    }

    @Bean
    public AttachmentRepository attachmentRepository(
        DSLContext dslContext,
        @Lazy DomainQL domainQL
    )
    {
        return new DefaultAttachmentRepository(
            dslContext,
            domainQL,
            new DatabaseAttachmentContentRepository(
                dslContext,
                domainQL
            )
        );
    }


    /**
     * JSON exporter for GraphQL
     */
    @Bean
    public JSONExporter jsonExporter()
    {
        return new JSONExporter();
    }

    @Bean
    public ExcelExporter excelExporter(@Lazy DomainQL domainQL)
    {
        return ExcelExporter.newExporter(domainQL)
            .withExportStrategy(
                // default strategy with custom names
                new ExcelExporter.OneQueryStrategy("Automaton-Test Export", "automaton-test-$now.xlsx")
            )
            .build();
    }


    /**
     * Exporter example for a multi-query document export based on src/main/js/apps/shipping/queries/Q_BazAndUsers.js
     */
    @Bean
    public ExcelExporter bazExporter(@Lazy DomainQL domainQL)
    {
        return ExcelExporter.newExporter(domainQL)
            .withExportStrategy((ctx, queryContext) -> {

                final GraphQLQueryContext.MethodResult bazes = queryContext.getMethodResult("iQueryBaz");
                final GraphQLQueryContext.MethodResult appUsers = queryContext.getMethodResult("iQueryAppUser");

                // note how you also receive a schema reference for the query data, so we could also name sheets by
                // domain type etc pp
                log.info("Method ref type: {}", bazes.methodReference().toString());

                ctx.addSheet("Baz Report", bazes, ref -> !ref.getFieldName().equals("id"));
                ctx.addSheet("AppUser Reference", appUsers);

                return "baz-report-$now.xlsx";
            })
            .build();
    }

    @Bean
    public MetadataProvider headingProvider()
    {
        return (dql, meta) -> {

            // provide some headings for the text excel export
            meta.getTypeMeta("Foo").setFieldMeta("name", "heading", "Foo-Name");
            meta.getTypeMeta("AppUser").setFieldMeta("id", "heading", "Benutzer-Id");
            meta.getTypeMeta("AppUser").setFieldMeta("login", "heading", "Benutzer-Login");
        };
    }
}

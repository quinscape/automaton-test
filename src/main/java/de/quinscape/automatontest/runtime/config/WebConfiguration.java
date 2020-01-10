package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.runtime.config.ScopeTableConfig;
import de.quinscape.automaton.runtime.i18n.TranslationService;
import de.quinscape.automaton.runtime.provider.AlternateStyleProvider;
import de.quinscape.automaton.runtime.provider.AutomatonJsViewProvider;
import de.quinscape.automaton.runtime.provider.ProcessInjectionService;
import de.quinscape.automaton.runtime.provider.StyleSheetDefinition;
import de.quinscape.automaton.runtime.provider.StyleSheetSelector;
import de.quinscape.automaton.runtime.ws.AutomatonWebSocketHandler;
import de.quinscape.automatontest.model.ValidationRules;
import de.quinscape.domainql.DomainQL;
import de.quinscape.domainql.schema.SchemaDataProvider;
import de.quinscape.spring.jsview.JsViewResolver;
import de.quinscape.spring.jsview.loader.ResourceHandle;
import de.quinscape.spring.jsview.loader.ResourceLoader;
import graphql.schema.GraphQLSchema;
import org.apache.commons.collections.ArrayStack;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.ServletContext;
import java.util.Arrays;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfiguration
    implements WebMvcConfigurer
{

    private final Environment env;

    private final ServletContext servletContext;

    private final DomainQL domainQL;

    private final ResourceLoader resourceLoader;

    private final AutomatonWebSocketHandler automatonTestWebSocketHandler;

    private final ProcessInjectionService processInjectionService;
    private final TranslationService translationService;

    private final DSLContext dslContext;

    private final ScopeTableConfig scopeTableConfig;

    private final ResourceHandle<ValidationRules> validationRulesHandle;


    @Autowired
    public WebConfiguration(
        Environment env,
        ServletContext servletContext,
        ResourceLoader resourceLoader,
        ProcessInjectionService processInjectionService,
        TranslationService translationService,
        DSLContext dslContext,
        ScopeTableConfig scopeTableConfig,
        @Qualifier("validationRules")
        ResourceHandle<ValidationRules> validationRulesHandle,
        @Lazy Optional<AutomatonWebSocketHandler> optionalSocketHandler,
        @Lazy DomainQL domainQL
    )
    {
        this.env = env;
        this.servletContext = servletContext;
        this.domainQL = domainQL;
        this.resourceLoader = resourceLoader;

        this.automatonTestWebSocketHandler = optionalSocketHandler.orElse(null);
        this.processInjectionService = processInjectionService;
        this.translationService = translationService;
        this.dslContext = dslContext;
        this.scopeTableConfig = scopeTableConfig;
        this.validationRulesHandle = validationRulesHandle;
    }


    @Override
    public void configureViewResolvers(ViewResolverRegistry registry)
    {
        final GraphQLSchema graphQLSchema = domainQL.getGraphQLSchema();
        registry.viewResolver(
            JsViewResolver.newResolver(servletContext, "WEB-INF/template-alternate-styles.html")
                .withResourceLoader(resourceLoader)

                // Process injections and general miscellaneous data we would normally
                // inject by hand in a Spring-JsView application
                .withViewDataProvider(
                    new AutomatonJsViewProvider(
                        dslContext,
                        domainQL,
                        processInjectionService,
                        translationService,
                        automatonTestWebSocketHandler,
                        scopeTableConfig
                    )
                )

                .withViewDataProvider(
                    new AlternateStyleProvider(
                        servletContext.getContextPath(),
                        Arrays.asList(
                            new StyleSheetDefinition("QS", "/css/bootstrap-automaton.min.css"),
                            new StyleSheetDefinition("QS condensed", "/css/bootstrap-automaton-condensed.min.css")
                        )
                    )
                )

                .withViewDataProvider(
                    ctx -> {
                        final ValidationRules content = validationRulesHandle.getContent();
                        ctx.provideViewData("validationRules", content);
                    }
                )
                .build()
        );
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry)
    {
        registry.addResourceHandler("/js/**")
            .addResourceLocations("/js/", "/css/", "/webfonts/")
            .setCacheControl(CacheControl.maxAge(90, TimeUnit.DAYS));
    }
}

package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.model.domain.AutomatonRelation;
import de.quinscape.automaton.runtime.domain.builder.AutomatonDomain;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.pojos.Bar;
import de.quinscape.automatontest.domain.tables.pojos.Baz;
import de.quinscape.automatontest.domain.tables.pojos.BazLink;
import de.quinscape.automatontest.domain.tables.pojos.BazValue;
import de.quinscape.automatontest.domain.tables.pojos.Corge;
import de.quinscape.automatontest.domain.tables.pojos.CorgeAssoc;
import de.quinscape.automatontest.domain.tables.pojos.CorgeLink;
import de.quinscape.automatontest.domain.tables.pojos.CorgeType;
import de.quinscape.automatontest.domain.tables.pojos.Garply;
import de.quinscape.automatontest.domain.tables.pojos.Grault;
import de.quinscape.automatontest.domain.tables.pojos.MetaConfig;
import de.quinscape.automatontest.domain.tables.pojos.Node;
import de.quinscape.automatontest.domain.tables.pojos.QuxA;
import de.quinscape.automatontest.domain.tables.pojos.QuxB;
import de.quinscape.automatontest.domain.tables.pojos.QuxC;
import de.quinscape.automatontest.domain.tables.pojos.QuxMain;
import de.quinscape.automatontest.domain.tables.pojos.Waldo;
import de.quinscape.automatontest.model.ValidationRules;
import de.quinscape.domainql.DomainQL;
import de.quinscape.domainql.RelationBuilder;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.config.SourceField;
import de.quinscape.domainql.config.TargetField;
import de.quinscape.domainql.meta.MetadataProvider;
import graphql.GraphQL;
import org.jooq.DSLContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Collections;

import static de.quinscape.automatontest.domain.Tables.*;

/**
 * Exemplary configuration of GraphQL in a project.
 */
@Configuration
public class GraphQLConfiguration
{
    private final static Logger log = LoggerFactory.getLogger(GraphQLConfiguration.class);


    private final ApplicationContext applicationContext;
    private final DSLContext dslContext;


    @Autowired
    public GraphQLConfiguration(
        ApplicationContext applicationContext,
        DSLContext dslContext
    )
    {
        this.applicationContext = applicationContext;
        this.dslContext = dslContext;
    }

    
    @Bean
    public DomainQL domainQL() throws IOException
    {
        final Collection<Object> logicBeans = applicationContext.getBeansWithAnnotation(GraphQLLogic.class).values();
        final Collection<MetadataProvider> metadataProviders = applicationContext.getBeansOfType(MetadataProvider.class).values();

        final DomainQL domainQL = AutomatonDomain.newDomain(dslContext, metadataProviders)
            //.parameterProvider(new AutomatonConnectionProviderFactory(applicationContext))

            .logicBeans(logicBeans)

            .objectTypes(Public.PUBLIC)

            .withAdditionalInputTypes(
                Node.class,
                Bar.class,
                ValidationRules.class,
                QuxMain.class,
                QuxA.class,
                QuxB.class,
                QuxC.class,

                Baz.class,
                BazValue.class,
                BazLink.class,

                Corge.class,
                CorgeAssoc.class,
                CorgeLink.class,
                CorgeType.class,

                Grault.class,
                Garply.class,
                MetaConfig.class,
                Waldo.class
            )
            
            // configure object creation for schema relationships
            .configureRelation(FOO.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY)
            .configureRelation(FOO.TYPE, SourceField.SCALAR, TargetField.NONE)
            .configureRelation(NODE.PARENT_ID, SourceField.OBJECT, TargetField.NONE)

            .configureRelation(QUX_MAIN.QUX_A_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(QUX_MAIN.QUX_B_NAME, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxB", null)
            .configureRelation(QUX_MAIN.QUX_C_ID1, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxC1", null)
            .configureRelation(QUX_MAIN.QUX_C_ID2, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxC2", null)

            .configureRelation(QUX_TOP.QUX_MID_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(QUX_MID.QUX_E_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)

            .configureRelation(QUX_MAIN.QUX_D_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxD", null)
            .configureRelation(QUX_MAIN.QUX_D2_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxD2", null)
            .configureRelation(QUX_MAIN.QUX_D3_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxD3", null)
            .configureRelation(QUX_MAIN.QUX_D4_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxD4", null)

            .configureRelation(BAZ_LINK.BAZ_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY, null, null, AutomatonRelation.MANY_TO_MANY)
            .configureRelation(BAZ_LINK.VALUE_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY, null, null, AutomatonRelation.MANY_TO_MANY)
            .configureRelation(BAZ.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY)

            .configureRelation(APP_VERSION.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)

            .configureRelation(CORGE.TYPE_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(CORGE.TYPE2, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "type2Obj", null)
            .configureRelation(CORGE.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)

            .configureRelation(CORGE_LINK.CORGE_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY, null, null, AutomatonRelation.MANY_TO_MANY)
            .configureRelation(CORGE_LINK.ASSOC_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY, null, null, AutomatonRelation.MANY_TO_MANY)

            .configureRelation(GRAULT.ATTACHMENT_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(META_CONFIG.ATTACHMENT_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(META_CONFIG.CORGE_TYPE_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(META_CONFIG.TYPE, SourceField.SCALAR, TargetField.NONE)


            .configureRelation(PLUGH.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureNameField("name")

            /*
                documentation for the types defined in the automaton library
             */
            .withTypeDocsFrom(
                new ClassPathResource("automaton-typedocs.json").getInputStream()
            )
            /*
                hand-written JSON docs for example
             */
            .withTypeDocsFrom(
                new ClassPathResource("domain-typedocs.json").getInputStream()
            )
            /*
                local source docs (autogenerated by the maven 'update-typedocs' execution)
             */
            .withTypeDocsFrom(
                new ClassPathResource("source-typedocs.json").getInputStream()
            )


            .build();

        return domainQL;
    }

    @Bean
    public GraphQL graphQL(DomainQL domainQL)
    {
        return GraphQL.newGraphQL(domainQL.getGraphQLSchema()).build();
    }
}

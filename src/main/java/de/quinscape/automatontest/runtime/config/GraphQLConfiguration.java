package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.runtime.scalar.ConditionScalar;
import de.quinscape.automaton.runtime.scalar.ConditionType;
import de.quinscape.automaton.runtime.scalar.FieldExpressionScalar;
import de.quinscape.automaton.runtime.scalar.FieldExpressionType;
import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.pojos.Bar;
import de.quinscape.automatontest.domain.tables.pojos.Baz;
import de.quinscape.automatontest.domain.tables.pojos.BazLink;
import de.quinscape.automatontest.domain.tables.pojos.BazValue;
import de.quinscape.automatontest.domain.tables.pojos.Corge;
import de.quinscape.automatontest.domain.tables.pojos.CorgeAssoc;
import de.quinscape.automatontest.domain.tables.pojos.CorgeLink;
import de.quinscape.automatontest.domain.tables.pojos.CorgeType;
import de.quinscape.automatontest.domain.tables.pojos.Node;
import de.quinscape.automatontest.domain.tables.pojos.QuxA;
import de.quinscape.automatontest.domain.tables.pojos.QuxB;
import de.quinscape.automatontest.domain.tables.pojos.QuxC;
import de.quinscape.automatontest.domain.tables.pojos.QuxMain;
import de.quinscape.automatontest.model.ValidationRules;
import de.quinscape.domainql.DomainQL;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.config.SourceField;
import de.quinscape.domainql.config.TargetField;
import de.quinscape.domainql.generic.DomainObject;
import de.quinscape.domainql.generic.DomainObjectScalar;
import de.quinscape.domainql.generic.GenericScalar;
import de.quinscape.domainql.generic.GenericScalarType;
import de.quinscape.domainql.jsonb.JSONB;
import de.quinscape.domainql.jsonb.JSONBScalar;
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
import java.util.Collection;

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

        final DomainQL domainQL = DomainQL.newDomainQL(dslContext)
            //.parameterProvider(new AutomatonConnectionProviderFactory(applicationContext))

            .logicBeans(logicBeans)

            .objectTypes(Public.PUBLIC)

            .withAdditionalScalar(DomainObject.class, DomainObjectScalar.newDomainObjectScalar())
            .withAdditionalScalar(JSONB.class, new JSONBScalar())
            .withAdditionalScalar(ConditionScalar.class, ConditionType.newConditionType())
            .withAdditionalScalar(FieldExpressionScalar.class, FieldExpressionType.newFieldExpressionType())
            .withAdditionalScalar(GenericScalar.class, GenericScalarType.newGenericScalar())

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
                CorgeType.class
            )
            
            // configure object creation for schema relationships
            .configureRelation(FOO.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY)
            .configureRelation(FOO.TYPE, SourceField.SCALAR, TargetField.NONE)
            .configureRelation(NODE.PARENT_ID, SourceField.OBJECT, TargetField.NONE)

            .configureRelation(QUX_MAIN.QUX_A_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(QUX_MAIN.QUX_B_NAME, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxB", null)
            .configureRelation(QUX_MAIN.QUX_C_ID1, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxC1", null)
            .configureRelation(QUX_MAIN.QUX_C_ID2, SourceField.OBJECT_AND_SCALAR, TargetField.NONE, "quxC2", null)
            .configureRelation(QUX_MAIN.QUX_D_ID, SourceField.OBJECT, TargetField.NONE, "quxD", null)

            .configureRelation(BAZ_LINK.BAZ_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY)
            .configureRelation(BAZ_LINK.VALUE_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY)
            .configureRelation(BAZ.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY)

            .configureRelation(APP_VERSION.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)

            .configureRelation(CORGE.TYPE_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)
            .configureRelation(CORGE.OWNER_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)

            .configureRelation(CORGE_LINK.CORGE_ID, SourceField.OBJECT_AND_SCALAR, TargetField.MANY)
            .configureRelation(CORGE_LINK.ASSOC_ID, SourceField.OBJECT_AND_SCALAR, TargetField.NONE)

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

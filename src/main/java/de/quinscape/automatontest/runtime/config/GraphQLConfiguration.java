package de.quinscape.automatontest.runtime.config;

import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.domain.tables.pojos.Address;
import de.quinscape.automatontest.domain.tables.pojos.Customer;
import de.quinscape.automatontest.domain.tables.pojos.Order;
import de.quinscape.automatontest.domain.tables.pojos.OrderItem;
import de.quinscape.automatontest.model.ValidationRules;
import de.quinscape.domainql.DomainQL;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.config.SourceField;
import de.quinscape.domainql.config.TargetField;
import de.quinscape.domainql.generic.DomainObject;
import de.quinscape.domainql.generic.DomainObjectScalar;
import de.quinscape.domainql.jsonb.JSONB;
import de.quinscape.domainql.jsonb.JSONBScalar;
import graphql.GraphQL;
import graphql.schema.GraphQLSchema;
import org.jooq.DSLContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
    public DomainQL domainQL()
    {
        final Collection<Object> logicBeans = applicationContext.getBeansWithAnnotation(GraphQLLogic.class).values();

        return
            DomainQL.newDomainQL(dslContext)
            //.parameterProvider(new AutomatonConnectionProviderFactory(applicationContext))

            .logicBeans(logicBeans)

            .objectTypes(Public.PUBLIC)

            .withAdditionalScalar( DomainObject.class, DomainObjectScalar.newDomainObjectScalar())

            .withAdditionalScalar(JSONB.class, new JSONBScalar())

            .withAdditionalInputTypes(
                Customer.class,
                Order.class,
                OrderItem.class,
                Address.class,
                ValidationRules.class
            )

            // configure object creation for schema relationships
            .configureRelation( CUSTOMER.BILLING_ADDRESS_ID , SourceField.OBJECT, TargetField.NONE)
            .configureRelation( CUSTOMER.DELIVERY_ADDRESS_ID, SourceField.OBJECT, TargetField.NONE)
            .configureRelation( ORDER.CUSTOMER_ID           , SourceField.OBJECT, TargetField.MANY)
            .configureRelation( ORDER.STATUS                , SourceField.SCALAR, TargetField.NONE)
            .configureRelation( ORDER.SHIPPING_TYPE         , SourceField.OBJECT, TargetField.NONE)
            .configureRelation( ORDER_ITEM.PRODUCT_ID       , SourceField.OBJECT, TargetField.NONE)
            .configureRelation( FOO.OWNER_ID       , SourceField.OBJECT, TargetField.MANY)
            .configureRelation( FOO.TYPE       , SourceField.SCALAR, TargetField.NONE)
            .build();
    }

    @Bean
    public GraphQL graphQL(DomainQL domainQL)
    {
        return GraphQL.newGraphQL(domainQL.getGraphQLSchema()).build();
    }
}

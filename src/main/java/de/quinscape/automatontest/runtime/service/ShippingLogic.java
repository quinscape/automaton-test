package de.quinscape.automatontest.runtime.service;

import de.quinscape.automaton.model.AutomatonApplication;
import de.quinscape.automatontest.domain.tables.pojos.AppUserConfig;
import de.quinscape.automatontest.domain.tables.pojos.AppConfig;
import de.quinscape.automatontest.domain.tables.pojos.Customer;
import de.quinscape.automatontest.domain.tables.pojos.Order;
import de.quinscape.automatontest.domain.tables.pojos.Product;
import de.quinscape.domainql.annotation.GraphQLField;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.domainql.util.Paged;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static de.quinscape.automatontest.domain.Tables.*;

@GraphQLLogic
    public class ShippingLogic
{
    private final DSLContext dslContext;


    @Autowired
    public ShippingLogic(
        DSLContext dslContext
    )
    {
        this.dslContext = dslContext;
    }


    @GraphQLQuery
    public Paged<Customer> getCustomers(
        @GraphQLField(defaultValue = "0")
            int offset,
        @GraphQLField(defaultValue = "20")
            int limit
    )
    {
        final List<Customer> todos = dslContext.select()
            .from(CUSTOMER)
            .orderBy(CUSTOMER.NUMBER)
            .offset(offset)
            .limit(limit)
            .fetchInto(Customer.class);

        return new Paged<>(todos, todos.size());
    }


    @GraphQLQuery
    public Paged<Order> getOrders(
        @GraphQLField(defaultValue = "0")
            int offset,
        @GraphQLField(defaultValue = "20")
            int limit
    )
    {
        final List<Order> orders = dslContext.select()
            .from(ORDER)
            .orderBy(ORDER.NUMBER)
            .offset(offset)
            .limit(limit)
            .fetchInto(Order.class);

        return new Paged<>(orders, orders.size());
    }


    @GraphQLQuery
    public Paged<Product> getProducts(
        @GraphQLField(defaultValue = "0")
            int offset,
        @GraphQLField(defaultValue = "20")
            int limit
    )
    {
        final List<Product> todos = dslContext.select()
            .from(PRODUCT)
            .orderBy(PRODUCT.NUMBER)
            .offset(offset)
            .limit(limit)
            .fetchInto(Product.class);

        return new Paged<>(todos, todos.size());
    }


    @GraphQLQuery
    public AutomatonApplication currentAppModel()
    {
        return null;
    }


    @GraphQLQuery
    public AppConfig getAppConfig(String name)
    {
        return dslContext.select()
            .from(APP_CONFIG)
            .where(
                APP_CONFIG.NAME.eq(name)
            )
            .fetchOneInto(
                AppConfig.class
            );
    }

    @GraphQLQuery
    public AppUserConfig getUserConfig(String login)
    {
        return dslContext.select()
            .from(APP_USER_CONFIG)
            .where(
                APP_USER_CONFIG.LOGIN.eq(login)
            )
            .fetchOneInto(
                AppUserConfig.class
            );
    }

}

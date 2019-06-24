package de.quinscape.automatontest.runtime.service;

import de.quinscape.domainql.annotation.GraphQLLogic;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

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

}

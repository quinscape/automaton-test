package de.quinscape.automatontest.model;

import de.quinscape.domainql.annotation.GraphQLComputed;

public class Plugh
    extends de.quinscape.automatontest.domain.tables.pojos.Plugh
{
    @GraphQLComputed
    public String getExtra()
    {
        return "" + this.getName() + ":" + this.getNum();
    }
}

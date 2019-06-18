package de.quinscape.automatontest.runtime.service;

import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.automatontest.domain.tables.pojos.Node;

public class ComplexContainer
{
    private Foo foo;
    private Node other;


    public Foo getFoo()
    {
        return foo;
    }


    public void setFoo(Foo foo)
    {
        this.foo = foo;
    }


    public Node getOther()
    {
        return other;
    }


    public void setOther(Node other)
    {
        this.other = other;
    }
}

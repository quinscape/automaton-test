package de.quinscape.automatontest.model;

import org.svenson.JSONTypeHint;

import java.util.List;

public class Rule
{
    private String name;

    private List<RuleField> fields;


    public String getName()
    {
        return name;
    }


    public void setName(String name)
    {
        this.name = name;
    }


    public List<RuleField> getFields()
    {
        return fields;
    }


    @JSONTypeHint(RuleField.class)
    public void setFields(List<RuleField> fields)
    {
        this.fields = fields;
    }
}

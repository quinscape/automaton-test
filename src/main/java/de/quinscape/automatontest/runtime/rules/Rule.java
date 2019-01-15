package de.quinscape.automatontest.runtime.rules;

import org.svenson.JSONTypeHint;

import java.util.List;

public class Rule
{
    private String name;

    private List<RuleField> ruleFields;


    public String getName()
    {
        return name;
    }


    public void setName(String name)
    {
        this.name = name;
    }


    public List<RuleField> getRuleFields()
    {
        return ruleFields;
    }


    @JSONTypeHint(RuleField.class)
    public void setRuleFields(List<RuleField> ruleFields)
    {
        this.ruleFields = ruleFields;
    }
}

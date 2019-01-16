package de.quinscape.automatontest.model;

import org.svenson.JSONProperty;
import org.svenson.JSONTypeHint;

import java.util.Collections;
import java.util.List;

/**
 * Encapsulates the set of all named validation rules. Corresponds to the top-level rules.json file.
 */
public class ValidationRules
{
    private List<Rule> rules;
    private String comment;


    public List<Rule> getRules()
    {
        if (rules == null)
        {
            return Collections.emptyList();
        }
        
        return rules;
    }

    @JSONTypeHint(Rule.class)
    public void setRules(List<Rule> rules)
    {
        this.rules = rules;
    }


    @JSONProperty("_")
    public String getComment()
    {
        return comment;
    }


    public void setComment(String comment)
    {
        this.comment = comment;
    }
}

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

    /**
     * <code>true</code> if the rules are backed by a writable resource handle / were loaded from either the servlet
     * context or an external directory by file.
     */
    private boolean writable;

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


    public boolean isWritable()
    {
        return writable;
    }


    public void setWritable(boolean writable)
    {
        this.writable = writable;
    }
}

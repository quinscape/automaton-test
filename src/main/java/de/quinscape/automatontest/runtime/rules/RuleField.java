package de.quinscape.automatontest.runtime.rules;

import java.util.List;

public class RuleField
{
    /**
     * Field name / path (e.g. <code>"name"</code> / <code>"fields.1.name"</code>
     */
    private String name;

    private String tooltip;

    private String placeholder;

    private boolean invisible;

    private boolean required;

    private boolean disabled;

    private List<RuleFieldValidation> ruleFieldValidations;

    /**
     * Soft maximum length ensured by validation
     */
    private int length;


    public String getName()
    {
        return name;
    }


    public void setName(String name)
    {
        this.name = name;
    }


    public String getTooltip()
    {
        return tooltip;
    }


    public void setTooltip(String tooltip)
    {
        this.tooltip = tooltip;
    }


    public String getPlaceholder()
    {
        return placeholder;
    }


    public void setPlaceholder(String placeholder)
    {
        this.placeholder = placeholder;
    }


    public boolean isInvisible()
    {
        return invisible;
    }


    public void setInvisible(boolean invisible)
    {
        this.invisible = invisible;
    }


    public boolean isRequired()
    {
        return required;
    }


    public void setRequired(boolean required)
    {
        this.required = required;
    }


    public boolean isDisabled()
    {
        return disabled;
    }


    public void setDisabled(boolean disabled)
    {
        this.disabled = disabled;
    }


    public int getLength()
    {
        return length;
    }


    public void setLength(int length)
    {
        this.length = length;
    }
}


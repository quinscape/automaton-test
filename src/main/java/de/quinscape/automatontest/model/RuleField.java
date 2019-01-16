package de.quinscape.automatontest.model;

import de.quinscape.domainql.model.FieldMode;

import java.util.Collections;
import java.util.List;

public class RuleField
{

    /**
     * Field name / path (e.g. <code>"name"</code> / <code>"fields.1.name"</code>
     */
    private String name;

    private String tooltip;

    private String placeholder;

    private boolean required;

    private FieldMode mode;

    private List<RuleFieldValidation> validations;

    private ModePolicy modePolicy = ModePolicy.OVERRIDE;

    /**
     * Soft maximum length ensured by validation ( <= 0 means no soft limit)
     */
    private int length = -1;

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


    public boolean isRequired()
    {
        return required;
    }


    public void setRequired(boolean required)
    {
        this.required = required;
    }


    public int getLength()
    {
        return length;
    }


    public void setLength(int length)
    {
        this.length = length;
    }


    /**
     * Returns the fixed mode for this field. How this mode is applied depends on the {@link #modePolicy}.
     */
    public FieldMode getMode()
    {
        return mode;
    }


    public void setMode(FieldMode mode)
    {
        this.mode = mode;
    }


    public List<RuleFieldValidation> getValidations()
    {
        if (validations == null)
        {
            return Collections.emptyList();
        }

        return validations;
    }


    public void setValidations(List<RuleFieldValidation> validations)
    {
        this.validations = validations;
    }


    public ModePolicy getModePolicy()
    {
        return modePolicy;
    }


    public void setModePolicy(ModePolicy modePolicy)
    {
        this.modePolicy = modePolicy;
    }
}


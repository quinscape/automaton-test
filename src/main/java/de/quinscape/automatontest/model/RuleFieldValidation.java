package de.quinscape.automatontest.model;

public class RuleFieldValidation
{
    private String regexp;


    private String message;

    // XXX: RegExp flags: "g" makes no sense with a one time test, "y" is not standardized

    /** regex "i" flag */
    private boolean caseInsensitive;

    /** regex "m" flag */
    private boolean multiLine;


    public String getRegexp()
    {
        return regexp;
    }


    public void setRegexp(String regexp)
    {
        this.regexp = regexp;
    }


    public String getMessage()
    {
        return message;
    }


    public void setMessage(String message)
    {
        this.message = message;
    }


    public boolean isCaseInsensitive()
    {
        return caseInsensitive;
    }


    public void setCaseInsensitive(boolean caseInsensitive)
    {
        this.caseInsensitive = caseInsensitive;
    }


    public boolean isMultiLine()
    {
        return multiLine;
    }


    public void setMultiLine(boolean multiLine)
    {
        this.multiLine = multiLine;
    }
}

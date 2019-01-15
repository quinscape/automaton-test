package de.quinscape.automatontest.runtime.rules;

public class RuleFieldValidation
{
    private String regexp;
    private String errorMessage;


    public String getRegexp()
    {
        return regexp;
    }


    public void setRegexp(String regexp)
    {
        this.regexp = regexp;
    }


    public String getErrorMessage()
    {
        return errorMessage;
    }


    public void setErrorMessage(String errorMessage)
    {
        this.errorMessage = errorMessage;
    }
}

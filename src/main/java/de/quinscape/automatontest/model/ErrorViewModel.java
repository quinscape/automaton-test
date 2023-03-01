package de.quinscape.automatontest.model;

/**
 * View model for the error.js view.
 *
 */
public class ErrorViewModel
{
    private final String title;
    private final String detail;
    private final boolean showLogin;


    public ErrorViewModel(String title, String detail, boolean showLogin)
    {
        this.title = title;
        this.detail = detail;
        this.showLogin = showLogin;
    }


    /**
     * Returns the error title
     * @return error title
     */
    public String getTitle()
    {
        return title;
    }


    /**
     * Returns the error detail message
     *
     * @return error detail message
     */
    public String getDetail()
    {
        return detail;
    }


    /**
     * If true, show the login form below the error making the error view look like another login view.
     *
     * @return true to show login form
     */
    public boolean isShowLogin()
    {
        return showLogin;
    }
}

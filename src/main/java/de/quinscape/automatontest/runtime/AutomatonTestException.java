package de.quinscape.automatontest.runtime;

public class AutomatonTestException
    extends RuntimeException
{
    private static final long serialVersionUID = 2074553315181786207L;

    public AutomatonTestException(String message)
    {
        super(message);
    }


    public AutomatonTestException(String message, Throwable cause)
    {
        super(message, cause);
    }


    public AutomatonTestException(Throwable cause)
    {
        super(cause);
    }


    public AutomatonTestException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace)
    {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

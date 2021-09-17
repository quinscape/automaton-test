package de.quinscape.automatontest.model.result;

/**
 * Generic result wrapper. Allows client-side code to register post-processors based on it.
 * @param <P>   payload type
 */
public class Result<P>
{
    private final ResultType type;
    private final P payload;


    public Result(ResultType type, P payload)
    {
        this.type = type;
        this.payload = payload;
    }


    /**
     * Returns the result type.
     *
     * @return result type
     */
    public ResultType getType()
    {
        return type;
    }


    /**
     * Returns the payload of type [P]
     *
     * @return payload
     */
    public P getPayload()
    {
        return payload;
    }
}

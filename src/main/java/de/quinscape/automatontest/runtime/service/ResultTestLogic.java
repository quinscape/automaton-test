package de.quinscape.automatontest.runtime.service;

import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.automatontest.model.result.Result;
import de.quinscape.automatontest.model.result.ResultType;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLMutation;

import java.util.concurrent.atomic.AtomicInteger;

@GraphQLLogic
public class ResultTestLogic
{
    @GraphQLMutation
    public Result<Foo> resultInfo(boolean delay) throws InterruptedException
    {
        if (delay)
        {
            Thread.sleep(2000);
        }

        final Foo complexPayload = new Foo();
        complexPayload.setId("e0a4d078-8b4d-4711-94ec-8deed24c4762");
        complexPayload.setName("Complex Foo");
        complexPayload.setDescription("Created as example for a complex Result<> payload");
        complexPayload.setNum(815);

        return new Result<>(ResultType.INFO, complexPayload);
    }

    @GraphQLMutation
    public Result<String> resultWarning(boolean delay) throws InterruptedException
    {
        if (delay)
        {
            Thread.sleep(2000);
        }
        return new Result<>(ResultType.WARNING, "Warning-Payload");
    }

    @GraphQLMutation
    public Result<String> resultError(boolean delay) throws InterruptedException
    {

        if (delay)
        {
            Thread.sleep(2000);
        }
        return new Result<>(ResultType.ERROR, "Error-Payload");
    }


    @GraphQLMutation
    public Result<String> resultSilent(boolean delay) throws InterruptedException
    {

        if (delay)
        {
            Thread.sleep(2000);
        }
        return new Result<>(ResultType.SILENT, "Silent-Payload");
    }


    private AtomicInteger count = new AtomicInteger(0);

    @GraphQLMutation
    public String fiftyFifty(boolean delay) throws InterruptedException
    {
        if (delay)
        {
            Thread.sleep(2000);
        }
        final int result = count.getAndIncrement() & 1;

        if (result == 0)
        {
            return "Operation successful";
        }
        else 
        {
            throw new IllegalStateException("Operation failed");
        }
    }

}

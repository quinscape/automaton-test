package de.quinscape.automatontest.runtime.service;

import java.sql.Timestamp;

public class WireTestResult
{
    private final String id;

    private final Timestamp created;

    private final String check;


    public WireTestResult()
    {
        this(null, null, null);

    }

    public WireTestResult(String id, Timestamp created, String check)
    {
        this.id = id;
        this.created = created;
        this.check = check;
    }


    public String getId()
    {
        return id;
    }


    public Timestamp getCreated()
    {
        return created;
    }


    public String getCheck()
    {
        return check;
    }
}

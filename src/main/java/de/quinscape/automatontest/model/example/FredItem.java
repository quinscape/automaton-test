package de.quinscape.automatontest.model.example;

import javax.validation.constraints.NotNull;

/**
 * Item within a Fred
 */
public class FredItem
{
    private String name;

    private int value;

    private boolean flag;


    public FredItem()
    {
        this(null, 0, false);
    }
    
    public FredItem(String name, int value, boolean flag)
    {
        this.name = name;
        this.value = value;
        this.flag = flag;
    }

    @NotNull
    public String getName()
    {
        return name;
    }


    public void setName(String name)
    {
        this.name = name;
    }


    public int getValue()
    {
        return value;
    }


    public void setValue(int value)
    {
        this.value = value;
    }


    public boolean isFlag()
    {
        return flag;
    }


    public void setFlag(boolean flag)
    {
        this.flag = flag;
    }


    @Override
    public String toString()
    {
        return "name = '" + name + '\''
            + ", value = " + value
            + ", flag = " + flag
            ;
    }
}

package de.quinscape.automatontest.model.example;

import org.svenson.JSONTypeHint;

import javax.validation.constraints.NotNull;
import java.util.Collections;
import java.util.List;

/**
 * Container bean for the file/resource example.
 */
public class Fred
{
    private String name;

    private List<FredItem> items;


    public Fred()
    {
        this(null, null);
    }
    
    public Fred(String name)
    {
        this(name, null);
    }

    public Fred(String name, List<FredItem> items)
    {
        this.name = name;
        this.items = items;
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


    // XXX: We have to follow svenson conventions to provide the type
    @JSONTypeHint(FredItem.class)
    public List<FredItem> getItems()
    {
        if (items == null)
        {
            return Collections.emptyList();
        }
        return items;
    }


    public void setItems(List<FredItem> items)
    {
        this.items = items;
    }


    @Override
    public String toString()
    {
        return super.toString() + ": "
            + "name = '" + name + '\''
            + ", items = " + items
            ;
    }
}

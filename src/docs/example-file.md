# File-based Data Example

I recently added a new example for how to do non-database content with automaton and would like to walk you through it
here.

## Creating POJOs 

So we're using automaton and want to integrate data that is not backed by the standard database storage. First we need 
to create Java POJOs encapsulating the data we need to work with. Whether these are simple flat scalar property containers 
or a deep Java Object graph is up to you.

For our example here we create two model classes:

 * [de.quinscape.automatontest.model.example.Fred](https://github.com/quinscape/automaton-test/blob/master/src/main/java/de/quinscape/automatontest/model/example/Fred.java) 
 * [de.quinscape.automatontest.model.example.FredItem](https://github.com/quinscape/automaton-test/blob/master/src/main/java/de/quinscape/automatontest/model/example/FredItem.java)
        
which result in the following GraphQL types
                           
```graphql
"Container bean for the file/resource example."
type Fred {
    items: [FredItem]
    name: String!
}

"Item within a Fred"
type FredItem {
    flag: Boolean
    name: String!
    value: Int
}

```

We will be using normal GraphQL input types that are just automatically created mirrors of Fred/FredItem.
                         
We provide the default data in a file located *src/main/webapp/WEB-INF/fred.json*

```json
{
    "name": "Example Fred",
    "items": [
        {
            "name": "Example Item #1",
            "value": 111,
            "flag": false
        }, {
            "name": "Example Item #2",
            "value": 222,
            "flag": true
        }
    ]
}
```


## Background: ResourceLoader

The resource loader system is used internally by automaton to track some of the system resources. It abstracts
resource access so that we can use either file-access and hot-reload the resources or load the resources from
a WAR once.

The hot-reloading resources will be watched for changes and automatically update to contain fresh data when the files
are edited outside the application. You can create your own hot-reloading [FileResourceLoader](https://github.com/quinscape/spring-jsview/blob/master/src/main/java/de/quinscape/spring/jsview/loader/FileResourceLoader.java)
for external directories of your choice, too.

## Writing the GraphQL endpoints

For our example we want to read/write JSON file data using our resource system as well as raw file access.

### ResourceLoader endpoints

```java
package de.quinscape.automatontest.runtime.service;

import de.quinscape.automatontest.model.example.Fred;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLMutation;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.spring.jsview.loader.JSONResourceConverter;
import de.quinscape.spring.jsview.loader.ResourceHandle;
import de.quinscape.spring.jsview.loader.ResourceLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;


@GraphQLLogic
public class ResourceAccessLogic
{
    private final static Logger log = LoggerFactory.getLogger(ResourceAccessLogic.class);

    /**
     * resource handle to get the current contents of the file
     */
    private final ResourceHandle<Fred> resourceHandle;


    @Autowired
    public ResourceAccessLogic(
        ResourceLoader resourceLoader
    )
    {
        // We acquire a resource handle once and can then reuse it.
        this.resourceHandle = resourceLoader.getResourceHandle(
            "WEB-INF/fred.json",
            new JSONResourceConverter<>(Fred.class)
        );
    }


    @GraphQLQuery
    public Fred getFredResource() throws IOException
    {
        return resourceHandle.getContent();
    }


    @GraphQLMutation
    public boolean updateFredResource(Fred fred) throws IOException
    {
        log.info("updateFredResource: {}", fred);

        resourceHandle.update(fred);
        return true;
    }
}
```

We ask Spring to inject us with the system resource loader and use that right away to get a resource handle
for our *WEB-INF/fred.json*. The JSONResourceConverter will automatically use svenson to parse the file contents
if needed.

The Query end-point is really simple and just invokes `resourceHandle.getContent()` which will always contain
fresh data for our JSON file if we're using file acess.

We just call `resourceHandle.update()` with the new Fred(Input) instance to update the file. 


# File endpoints

```java
package de.quinscape.automatontest.runtime.service;

import de.quinscape.automatontest.model.example.Fred;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLMutation;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.spring.jsview.loader.ResourceLoader;
import de.quinscape.spring.jsview.util.JSONUtil;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.svenson.tokenize.InputStreamSource;

import javax.servlet.ServletContext;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;


/**
 * Contains the example end-points showing how to use raw file access to integrate JSON file data into the GraphQL domain.
 */
@GraphQLLogic
public class FileAccessLogic
{
    private final static Logger log = LoggerFactory.getLogger(FileAccessLogic.class);


    private final ServletContext servletContext;
    
    private final static String PATH = "WEB-INF/fred.json";

    @Autowired
    public FileAccessLogic(
        ServletContext servletContext
    )
    {
        this.servletContext = servletContext;
    }

    /**
     * Returns the current content of the fred.json via raw file access.
     * <p>
     *  This method will re-read and reparse the fred.json file on *every* invocation.
     * </p>
     *
     *
     * @return current Fred
     *
     * @throws IOException if something goes wrong reading the file
     */
    @GraphQLQuery
    public Fred getFredFile() throws IOException
    {
        final String path = getRawFilePath();

        // construct a file input stream ...
        final FileInputStream is = new FileInputStream(
            path
        );

        try
        {
            // .. and read the JSON from that stream (and closing it after)
            // XXX: to parse a JSON string use `Fred fred = JSONUtil.DEFAULT_PARSER.parse(Fred.class, json);

            return JSONUtil.DEFAULT_PARSER.parse(
                Fred.class,
                new InputStreamSource(
                    is,
                    true
                )
            );
        }
        finally
        {
            // ensure we close our stream in the error case
            IOUtils.closeQuietly(is);
        }
    }


    private String getRawFilePath()
    {
        // We locate the real path of the servlet resource. This, too, requires an "exploded WAR" deployment, but you
        // can of course also use a file path outside of the deployment
        return servletContext.getRealPath(PATH);
    }


    /**
     * Updates the fred.json file with the new content from a Fred instance via raw file IO
     *
     * @param fred  new Fred
     * @return true
     * @throws IOException if something goes wrong writing the file
     */
    @GraphQLMutation
    public boolean updateFredFile(Fred fred) throws IOException
    {
        log.info("updateFredFile: {}", fred);

        final String path = getRawFilePath();

        final OutputStreamWriter writer = new OutputStreamWriter(
            new FileOutputStream(
                path
            ),
            StandardCharsets.UTF_8
        );

        try
        {
            // this is the solution to write directly to an output stream.
            // XXX: If you want a String do `String s = JSONUtil.DEFAULT_GENERATOR.forValue(fred);`
            JSONUtil.DEFAULT_GENERATOR.writeJSONToWriter(
                fred,
                writer
            );

            return true;
        }
        finally
        {
            // ensure we close our stream in the error case
            IOUtils.closeQuietly(writer);
        }
    }
}
```
     
As you can see, the raw file-access is a little more complicated. For this example we use the same `WEB-INF/fred.json` 
file to load and write.

This example uses svenson streaming features. Note that there is no caching by default. Every single invocation of the end point
loads and reparses the file, in contrast to the resource loader version where we keep the current fresh data in-memory and
can even avoid rechecking the file thanks to the Java file watcher mechanisms.


## Process "file-test"

The ["file-test" process](https://github.com/quinscape/automaton-test/blob/master/src/main/js/apps/shipping/processes/file-test/file-test.js) 
provides a simple UI to edit the Fred data on the client. It works pretty much just like the Database backed version. 

Since we have no id field in our Fred instance, we use a counter variable to provide the key for our forms. This allows
for easy form updates when we refetch data.

To make the keys for the items work right in any case, we use the `FormContext.getUniqueId()` helper. It's a weakmap
based method that provides a unique numerical id for an observable.

Both methods can be used when having no guaranteed unique id field.


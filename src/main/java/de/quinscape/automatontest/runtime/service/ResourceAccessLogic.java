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


/**
 * Contains the example end-points showing how to use the automaton/spring-jsview resource system to integrate
 * JSON file data into your GraphQL domain.
 */
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


    /**
     * Returns the current content of the fred.json resource/file as Fred instance.
     * <p>
     *     The resource handle mechanism makes sure we only reload and reparse fred.json when
     *     the file changed.
     * </p>
     * <p>
     *     The resource loader system internally creates a file watch service that asynchronously listens to file change
     *     events and throws away stale resource content. The next call to .getContent() will then reread and
     *     reparse the content.
     * </p>
     *
     * @return current Fred
     *
     * @throws IOException if something goes wrong reading the file
     */
    @GraphQLQuery
    public Fred getFredResource() throws IOException
    {
        return resourceHandle.getContent();
    }


    /**
     * Updates the fred.json resource/file with the new content from a Fred instance.
     *
     * <p>
     *     We can only have write access if the application is deployed as "exploded WAR". In cases of a WAR deployment, all
     *     servlet resources are read via input stream and don't allow updates.
     * </p>
     *
     * @param fred  new Fred
     * @return true
     * @throws IOException if something goes wrong writing the file
     * @throws UnsupportedOperationException if the resource handle is a stream resource handle that doesn't allow updating
     */
    @GraphQLMutation
    public boolean updateFredResource(Fred fred) throws IOException
    {
        log.info("updateFredResource: {}", fred);

        resourceHandle.update(fred);
        return true;
    }
}

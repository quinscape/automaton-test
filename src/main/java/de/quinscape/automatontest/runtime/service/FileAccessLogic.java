package de.quinscape.automatontest.runtime.service;

import de.quinscape.automatontest.model.example.Fred;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLMutation;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.spring.jsview.util.JSONUtil;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.svenson.tokenize.InputStreamSource;

import jakarta.servlet.ServletContext;
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
        return servletContext.getRealPath("WEB-INF/fred.json");
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

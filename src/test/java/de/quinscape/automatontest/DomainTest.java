package de.quinscape.automatontest;

import de.quinscape.automatontest.domain.Public;
import de.quinscape.automatontest.util.Util;
import de.quinscape.domainql.DomainGenerator;
import de.quinscape.domainql.model.Domain;
import de.quinscape.domainql.model.DomainType;
import de.quinscape.spring.jsview.util.JSONUtil;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;

@Disabled
public class DomainTest
{
    private final static Logger log = LoggerFactory.getLogger(DomainTest.class);


    @Test
    @Disabled
    public void name() throws IOException
    {

        final Domain domain = DomainGenerator.createDomain(Public.PUBLIC.getTables(), null);

        File domainDir = new File("./src/main/webapp/WEB-INF/automaton/apps/shipping/domain/types");
        if (!domainDir.exists())
        {
            domainDir.mkdirs();
        }

        for (DomainType domainType : domain.getDomainTypes())
        {
            File file = new File(domainDir, domainType.getName() + ".json");

            final String json = Util.formatJSON(JSONUtil.DEFAULT_GENERATOR.forValue(domainType));

            FileUtils.writeStringToFile(file, json, "UTF-8");
        }
    }
}

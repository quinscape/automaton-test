package de.quinscape.automatontest;

import de.quinscape.automatontest.domain.tables.pojos.Node;
import de.quinscape.automatontest.runtime.config.DomainConfiguration;
import de.quinscape.automatontest.runtime.config.GraphQLConfiguration;
import de.quinscape.domainql.DomainQL;
import org.jooq.DSLContext;
import org.junit.Ignore;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static de.quinscape.automatontest.domain.Tables.*;

/**
 * Tests the functionality of the merge service. Belongs to the automaton library but is located here because it
 * requires
 * full integration testing and that's easier in a separate project (here)
 */

@ExtendWith(SpringExtension.class)
@ContextConfiguration(classes = {
    GraphQLConfiguration.class,
    DomainConfiguration.class
})
@Tag("integration")
@TestPropertySource("classpath:automatontest-integration-test.properties")
@Transactional
@Ignore
public class DBTest
{
    private final static Logger log = LoggerFactory.getLogger(DBTest.class);

    @Autowired
    DomainQL domainQL;

    @Autowired
    DSLContext dslContext;


    @Test
    void name()
    {
        final List<Node> nodes = dslContext.select().from(NODE).where(NODE.NAME.startsWith("\uD83D\uDC7D")).fetchInto(
            Node.class);

        log.info(nodes.toString());
    }
}

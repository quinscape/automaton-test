package de.quinscape.automatontest.runtime.merge;

import de.quinscape.automaton.model.merge.EntityChange;
import de.quinscape.automaton.model.merge.MergeConfig;
import de.quinscape.automaton.model.merge.MergeGroup;
import de.quinscape.automaton.model.merge.MergeResult;
import de.quinscape.automaton.model.merge.MergeTypeConfig;
import de.quinscape.automaton.runtime.merge.MergeService;
import de.quinscape.automaton.runtime.merge.MergeTypeInfo;
import de.quinscape.automaton.runtime.util.DomainSerializationUtil;
import de.quinscape.automaton.runtime.util.DomainTestUtil;
import de.quinscape.automatontest.domain.tables.pojos.AppVersion;
import de.quinscape.automatontest.domain.tables.pojos.Corge;
import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.automatontest.runtime.config.DomainConfiguration;
import de.quinscape.automatontest.runtime.config.GraphQLConfiguration;
import de.quinscape.domainql.DomainQL;
import de.quinscape.spring.jsview.util.JSONUtil;
import org.jooq.DSLContext;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.IOException;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static de.quinscape.automatontest.domain.Tables.*;
import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.*;

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
@Tag("selenium")
@TestPropertySource("classpath:automatontest-integration-test.properties")
@Transactional
public class MergeServiceTest
    implements InitializingBean
{
    private final static Logger log = LoggerFactory.getLogger(MergeServiceTest.class);

    @Autowired
    DomainQL domainQL;

    private DomainSerializationUtil util;

    private DomainTestUtil domainTestUtil;


    public void setDomainQL(DomainQL domainQL)
    {
        this.domainQL = domainQL;
    }


    @Autowired
    DSLContext dslContext;

    @Autowired
    MergeService mergeService;


    final MergeConfig mergeConfig = new MergeConfig();
    {

        mergeConfig.setTypeConfigs(
            Collections.singletonList(
                new MergeTypeConfig(
                    "Corge",
                    Collections.singletonList(
                        new MergeGroup(
                            Arrays.asList("num", "num2")
                        )
                    ),
                    Collections.singletonList("modified")
                )
            )
        );
    }


    @Test
    public void testUnconflictedStore()
    {
        mergeService.flush();

        final DomainSerializationUtil util = new DomainSerializationUtil(domainQL);

        final EntityChange change = fromJSON(
            //language=JSON
            "{\n" +
            "    \"type\" : \"Corge\",\n" +
            "    \"id\": {\n" +
            "        \"type\": \"String\",\n" +
            "        \"value\": \"20bbb666-79d1-4a50-8b23-4442be8b615e\"\n" +
            "    },\n" +
            "    \"version\" : \"9920a2aa-8554-4396-95ba-70ca9cb9bca1\",\n" +
            "    " +
            "\"changes\": [\n" +
            "        {\n" +
            "            \"field\": \"name\",\n" +
            "            \"value\": {\n" +
            "                \"type\": \"String\",\n" +
            "                \"value\" : \"Corge #123\"\n" +
            "            }\n" +
            "        },\n" +
            "        {\n" +
            "            \"field\": \"modified\",\n" +
            "            \"value\": {\n" +
            "                \"type\": \"Timestamp\",\n" +
            "                \"value\" : \"2020-07-07T15:05:16.373Z\"\n" +
            "            }\n" +
            "        }\n" +
            "    ]\n" +
            "}"
        );

        // do scalar version on JSON data (normally done by GraphQL)
        change.getChanges().get(1).getValue().setValue(
            Timestamp.from(
                Instant.parse(
                    (String)change.getChanges().get(1).getValue().getValue()
                )
            )
        );

        final MergeResult result = mergeService.merge(
            Collections.singletonList(change),
            Collections.emptyList(),
            mergeConfig
        );

        final List<AppVersion> versions =
            dslContext.select()
                .from(APP_VERSION)
                .where(
                    APP_VERSION.ENTITY_ID.eq("20bbb666-79d1-4a50-8b23-4442be8b615e")
                )
            .fetchInto(AppVersion.class);

        Corge corge =
            dslContext.select()
                .from(CORGE)
                .where(
                    CORGE.ID.eq("20bbb666-79d1-4a50-8b23-4442be8b615e")
                )
            .fetchOneInto(Corge.class);


        assertThat(corge.getName(), is("Corge #123"));
        assertThat(result.getConflicts().size(), is(0));

        assertThat(versions.size(), is(1));

        final AppVersion version = versions.get(0);

        log.info("VERSION: {}", util.serialize(version));

        final MergeTypeInfo info = new MergeTypeInfo(domainQL, "Corge");

        log.info("VERSION: {}", version);

        // app_version.id matches id field of entity
        assertThat(version.getId(), is(corge.getVersion()));
        assertThat(version.getPrev(), is("9920a2aa-8554-4396-95ba-70ca9cb9bca1"));
        assertThat(version.getEntityType(), is("Corge"));

        // exact bitmask match
        assertThat(
            version.getFieldMask(),
            is(
                BigInteger.ONE.shiftLeft(info.getFieldIndex("name")).or(
                    BigInteger.ONE.shiftLeft(info.getFieldIndex("modified"))
                )
            )
        );


        log.info("CORGE AFTER: {}", util.serialize(corge));

    }

    @Test
    public void testChangeConflict() throws IOException
    {
        //mergeService.flush();

        // prepare
        domainTestUtil.loadAndInsert(
            new File("src/test/java/de/quinscape/automatontest/runtime/merge/testChangeConflict-prep.json")
        );


        final MergeTypeInfo info = new MergeTypeInfo(domainQL, "Corge");

        log.info("Using {}", mergeService);

        final MergeResult result = mergeService.merge(
            Arrays.asList(
                fromJSON(
                    //language=JSON
                    "{\n" +
                        "    \"type\" : \"Corge\",\n" +
                        "    \"id\": {\n" +
                        "        \"type\": \"String\",\n" +
                        "        \"value\": \"20bbb666-79d1-4a50-8b23-4442be8b615e\"\n" +
                        "    },\n" +
                        "    \"version\" : \"9920a2aa-8554-4396-95ba-70ca9cb9bca1\",\n" +
                        "    " +
                        "\"changes\": [\n" +
                        "        {\n" +
                        "            \"field\": \"name\",\n" +
                        "            \"value\": {\n" +
                        "                \"type\": \"String\",\n" +
                        "                \"value\" : \"Corge #124\"\n" +
                        "            }\n" +
                        "        }\n" +
                        "    ]\n" +
                        "}"
                )
            ),
            Collections.emptyList(),
            mergeConfig
        );

        final List<AppVersion> versions =
            dslContext.select()
                .from(APP_VERSION)
                .where(
                    APP_VERSION.ENTITY_ID.eq("20bbb666-79d1-4a50-8b23-4442be8b615e")
                )
                .orderBy(APP_VERSION.CREATED)
                .fetchInto(AppVersion.class);

        Corge corge =
            dslContext.select()
                .from(CORGE)
                .where(
                    CORGE.ID.eq("20bbb666-79d1-4a50-8b23-4442be8b615e")
                )
                .fetchOneInto(Corge.class);


        assertThat(corge.getName(), is("Corge #123"));
        assertThat(result.getConflicts().size(), is(0));
        assertThat(versions.size(), is(2));

        log.info(JSONUtil.formatJSON(util.serializeList(versions)));

        final AppVersion version = versions.get(0);

        // app_version.id matches id field of entity
        assertThat(version.getId(), is("e136483c-c365-467d-877f-fb6248704f18"));
        assertThat(version.getPrev(), is("9920a2aa-8554-4396-95ba-70ca9cb9bca1"));
        assertThat(version.getEntityType(), is("Corge"));

        final AppVersion secondVersion = versions.get(1);

        // app_version.id matches id field of entity
        assertThat(secondVersion.getId(), is(corge.getVersion()));
        assertThat(secondVersion.getPrev(), is("e136483c-c365-467d-877f-fb6248704f18"));
        assertThat(secondVersion.getEntityType(), is("Corge"));

        // exact bitmask match
        assertThat(secondVersion.getFieldMask(), is(BigInteger.ONE.shiftLeft(info.getFieldIndex("name"))));
    }

    @Test
    public void testUnversionedStore()
    {
        mergeService.flush();

        log.info("Using {}", mergeService);

        final MergeResult result = mergeService.merge(
            Arrays.asList(
                fromJSON(
                    //language=JSON
                    "{\n" +
                        "    \"type\" : \"Foo\",\n" +
                        "    \"id\": {\n" +
                        "        \"type\": \"String\",\n" +
                        "        \"value\": \"13a4ad86-e2c3-4979-81e2-a8f102b501c1\"\n" +
                        "    },\n" +
                        "    " +
                        // we need no version
                        "\"changes\": [\n" +
                        "        {\n" +
                        "            \"field\": \"name\",\n" +
                        "            \"value\": {\n" +
                        "                \"type\": \"String\",\n" +
                        "                \"value\" : \"Foo #123\"\n" +
                        "            }\n" +
                        "        }\n" +
                        "    ]\n" +
                        "}"
                )
            ),
            Collections.emptyList(),
            mergeConfig
        );

        final List<AppVersion> versions =
            dslContext.select()
                .from(APP_VERSION)
                .where(
                    APP_VERSION.ENTITY_ID.eq("20bbb666-79d1-4a50-8b23-4442be8b615e")
                )
                .fetchInto(AppVersion.class);

        Foo foo =
            dslContext.select()
                .from(FOO)
                .where(
                    FOO.ID.eq("13a4ad86-e2c3-4979-81e2-a8f102b501c1")
                )
                .fetchOneInto(Foo.class);

        assertThat(foo.getName(), is("Foo #123"));
        assertThat(result.getConflicts().size(), is(0));



        // no version entry for unversioned types
        assertThat(versions.size(), is(0));
    }

    private EntityChange fromJSON(String json)
    {
        return  JSONUtil.DEFAULT_PARSER.parse(EntityChange.class, json);
    }


    @Override
    public void afterPropertiesSet() throws Exception
    {
        util = new DomainSerializationUtil(domainQL);
        domainTestUtil = new DomainTestUtil(domainQL, dslContext);
    }
}

package de.quinscape.automatontest.runtime.merge;

import de.quinscape.automaton.model.merge.EntityChange;
import de.quinscape.automaton.model.merge.EntityFieldChange;
import de.quinscape.automaton.model.merge.MergeConfig;
import de.quinscape.automaton.model.merge.MergeConflict;
import de.quinscape.automaton.model.merge.MergeGroup;
import de.quinscape.automaton.model.merge.MergeResult;
import de.quinscape.automaton.model.merge.MergeTypeConfig;
import de.quinscape.automaton.runtime.merge.MergeService;
import de.quinscape.automaton.runtime.merge.MergeServiceImpl;
import de.quinscape.automaton.runtime.merge.MergeTypeInfo;
import de.quinscape.automaton.runtime.util.DomainSerializationUtil;
import de.quinscape.automaton.runtime.util.DomainTestUtil;
import de.quinscape.automatontest.domain.tables.pojos.AppVersion;
import de.quinscape.automatontest.domain.tables.pojos.Corge;
import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.automatontest.runtime.config.DomainConfiguration;
import de.quinscape.automatontest.runtime.config.GraphQLConfiguration;
import de.quinscape.domainql.DomainQL;
import de.quinscape.domainql.generic.GenericScalar;
import de.quinscape.spring.jsview.util.JSONUtil;
import graphql.schema.Coercing;
import graphql.schema.GraphQLScalarType;
import org.apache.commons.io.Charsets;
import org.apache.commons.io.FileUtils;
import org.jooq.DSLContext;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;
import org.svenson.JSON;
import org.svenson.JSONParser;

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
@Tag("integration")
@TestPropertySource("classpath:automatontest-integration-test.properties")
@Transactional
public class MergeServiceTest
    implements InitializingBean
{
    private final static Logger log = LoggerFactory.getLogger(MergeServiceTest.class);

    @Autowired
    DomainQL domainQL;

    @Autowired
    DSLContext dslContext;

    @Autowired
    MergeService mergeService;

    private DomainSerializationUtil util;

    private DomainTestUtil domainTestUtil;

    private JSONParser parser;


    public void setDomainQL(DomainQL domainQL)
    {
        this.domainQL = domainQL;
    }


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
    @Rollback
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

//        // do scalar version on JSON data (normally done by GraphQL)
//        change.getChanges().get(1).getValue().setValue(
//            Timestamp.from(
//                Instant.parse(
//                    (String)change.getChanges().get(1).getValue().getValue()
//                )
//            )
//        );

        final MergeResult result = ((MergeServiceImpl)mergeService).mergeInternal(
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


        log.info("RESULT: {}", JSON.formatJSON(JSONUtil.DEFAULT_GENERATOR.forValue(result)));

        assertThat(result.getConflicts().size(), is(0));
        assertThat(corge.getName(), is("Corge #123"));

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
    @Rollback
    public void testChangeConflict() throws IOException
    {
        //mergeService.flush();


        final MergeResult preparation = ((MergeServiceImpl)mergeService).mergeInternal(
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
                )
            ),
            Collections.emptyList(),
            mergeConfig
        );

        /**
         * our first preparatory insert goes through without conflict (see {@link #testUnconflictedStore()} for test
         */
        assertThat(preparation.isDone(), is(true));

        final MergeResult result = ((MergeServiceImpl)mergeService).mergeInternal(
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


        log.info("RESULT: {}, mask = {}", versions, changeMask("Corge", "name", "modified"));

        assertThat(result.getConflicts().size(), is(1));
        assertThat(corge.getName(), is("Corge #123"));

        final MergeConflict conflict = result.getConflicts().get(0);

        assertThat(conflict.getFields().size(), is(2));

        assertThat(versions.size(), is(1));

        //log.info(JSONUtil.formatJSON(util.serializeList(versions)));
        final AppVersion version = versions.get(0);

        // app_version.id matches id field of entity
        assertThat(version.getId(), is(corge.getVersion()));
        assertThat(version.getPrev(), is("9920a2aa-8554-4396-95ba-70ca9cb9bca1"));
        assertThat(version.getEntityType(), is("Corge"));

        // exact bitmask match
        assertThat(version.getFieldMask(), is(
            changeMask("Corge", "name", "modified")
        ));
    }

    @Test
    @Rollback
    public void testUnversionedStore()
    {
        mergeService.flush();

        log.info("Using {}", mergeService);

        final MergeResult result = ((MergeServiceImpl)mergeService).mergeInternal(
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
        return convert(JSONUtil.DEFAULT_PARSER.parse(EntityChange.class, json));
    }

    private List<EntityChange> listFromJSON(String json)
    {
        final List<EntityChange> list = parser.parse(List.class, json);

        for (EntityChange entityChange : list)
        {
            convert(entityChange);
        }
        return list;
    }


    @Test
    @Rollback
    void testInsertionOrderCorrection() throws IOException
    {
        mergeService.flush();

        log.info("Using {}", mergeService);

        final MergeResult result = ((MergeServiceImpl)mergeService).mergeInternal(
                listFromJSON(
                    FileUtils.readFileToString(new File("src/test/java/de/quinscape/automatontest/runtime/merge/testInsertionOrder.json"), Charsets.UTF_8)
                ),
            Collections.emptyList(),
            mergeConfig
        );

        final List<AppVersion> versions =
            dslContext.select()
                .from(APP_VERSION)
                .where(
                    APP_VERSION.ENTITY_ID.eq("0b44436f-2756-490f-add0-9b286ed65765")
                )
                .orderBy(APP_VERSION.CREATED)
                .fetchInto(AppVersion.class);

        Corge corge =
            dslContext.select()
                .from(CORGE)
                .where(
                    CORGE.ID.eq("0b44436f-2756-490f-add0-9b286ed65765")
                )
                .fetchOneInto(Corge.class);


        //log.info("RESULT: {}", JSONUtil.formatJSON(result.toJSON()));

        assertThat(result.getConflicts().size(), is(0));
        assertThat(corge.getName(), is("Corge #124"));
        assertThat(corge.getTypeId(), is("c7e3f280-b105-4e52-883e-4843781eb0e1"));
        assertThat(corge.getType2(), is("c0c740fc-2a8a-4c1a-a211-078ec7c3968c"));
        assertThat(versions.size(), is(1));

        //log.info(JSONUtil.formatJSON(util.serializeList(versions)));
        final AppVersion version = versions.get(0);

        // app_version.id matches id field of entity
        assertThat(version.getId(), is(corge.getVersion()));
        assertThat(version.getPrev(), is(nullValue()));
        assertThat(version.getEntityType(), is("Corge"));

        // exact bitmask match
        assertThat(version.getFieldMask(), is(
            changeMask("Corge",     "id", "name", "created", "flag", "modified", "num", "ownerId", "typeId", "type2")
        ));

    }

    private BigInteger changeMask(String domainType, String... fields)
    {
        final MergeTypeInfo info = new MergeTypeInfo(domainQL, domainType);

        BigInteger value = BigInteger.ONE.shiftLeft(info.getFieldIndex(fields[0]));

        for (int i = 1 ; i < fields.length; i++)
        {
            value = value.or(
                BigInteger.ONE.shiftLeft(info.getFieldIndex(fields[i]))
            );
        }

        return value;
    }


    /**
     * Adhoc conversion for the test. Normally done by GraphQL automatically.
     *
     * @param entityChange  change to convert fields in
     *
     * @return same entity change instance
     */
    private EntityChange convert(EntityChange entityChange)
    {

        for (EntityFieldChange change : entityChange.getChanges())
        {
            final GenericScalar genericScalar = change.getValue();

            final Coercing<?,?> coercing = ((GraphQLScalarType) domainQL.getGraphQLSchema().getType(
                genericScalar.getType())).getCoercing();

            genericScalar.setValue(coercing.parseValue(genericScalar.getValue()));
        }

        return entityChange;
    }


    @Override
    public void afterPropertiesSet() throws Exception
    {
        util = new DomainSerializationUtil(domainQL);
        domainTestUtil = new DomainTestUtil(domainQL, dslContext);

        parser = new JSONParser();
        parser.setObjectSupport(JSONUtil.OBJECT_SUPPORT);
        parser.addTypeHint("[]", EntityChange.class);
    }
}

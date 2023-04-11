import de.quinscape.automatontest.domain.tables.pojos.Bar;
import org.jooq.DSLContext;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.svenson.util.JSONBuilder;

import java.util.List;

import static de.quinscape.automatontest.domain.Tables.*;

public class TestCase
{
    private final static Logger log = LoggerFactory.getLogger(TestCase.class);


    @Test
    public void name()
    {
        final String str = "\uD83E\uDD14 💥Emoji Rule💥";
        System.out.println(str.substring(0, str.offsetByCodePoints(0, 6)));
    }


    @Test
    @Disabled
    void name2()
    {
        DSLContext dslContext = null;


        final List<Bar> bars = dslContext.select()
            .from(BAR)
            .where(BAR.NUMA.lessThan(100))
            .fetchInto(Bar.class);
    }


    @Test
    void name3()
    {
        log.info(JSONBuilder.buildObject()
            .includeProperty("expected", "{\n  \"iQueryFoo\":{\n    \"type\":\"Foo\",\n    \"columnStates\":[\n      {\n        \"name\":\"id\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"name\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"num\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"description\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"created\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"type\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"flag\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"owner.id\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"owner.login\",\n        \"enabled\":true,\n        \"sortable\":true\n      }\n    ],\n    \"queryConfig\":{\n      \"id\":null,\n      \"condition\":{\n        \"type\":\"Condition\",\n        \"name\":\"and\",\n        \"operands\":[\n          {\n            \"type\":\"Condition\",\n            \"name\":\"eq\",\n            \"operands\":[\n              {\n                \"type\":\"Field\",\n                \"name\":\"name\"\n              },\n              {\n                \"type\":\"Value\",\n                \"scalarType\":\"String\",\n                \"name\":null,\n                \"methodResult\":\"Test Foo\"\n              }\n            ]\n          },\n          {\n            \"type\":\"Condition\",\n            \"name\":\"eq\",\n            \"operands\":[\n              {\n                \"type\":\"Field\",\n                \"name\":\"owner.login\"\n              },\n              {\n                \"type\":\"Value\",\n                \"scalarType\":\"String\",\n                \"name\":null,\n                \"methodResult\":\"OtherUser\"\n              }\n            ]\n          }\n        ]\n      },\n      \"offset\":0,\n      \"pageSize\":10,\n      \"sortFields\":[\n        \"id\"\n      ]\n    },\n    \"rows\":[\n      \n    ]\n  }\n}")
            .includeProperty("was", "{\n  \"iQueryFoo\":{\n    \"type\":\"Foo\",\n    \"columnStates\":[\n      {\n        \"name\":\"id\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"name\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"num\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"description\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"created\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"type\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"flag\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"owner.id\",\n        \"enabled\":true,\n        \"sortable\":true\n      },\n      {\n        \"name\":\"owner.login\",\n        \"enabled\":true,\n        \"sortable\":true\n      }\n    ],\n    \"queryConfig\":{\n      \"id\":null,\n      \"condition\":{\n        \"operands\":[\n          {\n            \"operands\":[\n              {\n                \"name\":\"name\",\n                \"type\":\"Field\"\n              },\n              {\n                \"name\":null,\n                \"scalarType\":\"String\",\n                \"type\":\"Value\",\n                \"methodResult\":\"Test Foo\"\n              }\n            ],\n            \"name\":\"eq\",\n            \"type\":\"Condition\"\n          },\n          {\n            \"operands\":[\n              {\n                \"name\":\"owner.login\",\n                \"type\":\"Field\"\n              },\n              {\n                \"name\":null,\n                \"scalarType\":\"String\",\n                \"type\":\"Value\",\n                \"methodResult\":\"OtherUser\"\n              }\n            ],\n            \"name\":\"eq\",\n            \"type\":\"Condition\"\n          }\n        ],\n        \"name\":\"and\",\n        \"type\":\"Condition\"\n      },\n      \"offset\":0,\n      \"pageSize\":10,\n      \"sortFields\":[\n        \"id\"\n      ]\n    },\n    \"rows\":[\n      \n    ]\n  }\n}")
            .output());


    }
}

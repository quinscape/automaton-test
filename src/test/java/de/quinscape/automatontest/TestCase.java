package de.quinscape.automatontest;

import de.quinscape.automatontest.domain.tables.pojos.AppUser;
import de.quinscape.spring.jsview.util.JSONUtil;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TestCase
{
    private final static Logger log = LoggerFactory.getLogger(TestCase.class);


    @Test
    public void testJSONification()
    {
        log.info(JSONUtil.DEFAULT_PARSER.parse(AppUser.class, "{\"lastLogin\":null,\"password\":null,\"created\":null," +
            "\"roles\":null,\"_type\":\"AppUser\",\"disabled\":null,\"id\":null,\"login\":\"TestUser\"}").toString());

    }
}

package de.quinscape.automatontest;

import de.quinscape.automatontest.runtime.AutomatonTestApplication;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest(
    // prevent websocket errors
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ContextConfiguration(classes = {
    AutomatonTestApplication.class
})
//@EnabledIf(
//    expression ="#{ 'integration-test'.equals(systemProperties['spring.profiles.active']) }"
//)

//XXX: This test is only an example how to setup a complete integration-test. Also see MergeServiceTest for an example
//     of a partial context loading test.
@Disabled
public class AutomatonTestApplicationTests
{

    @Test
    public void contextLoads()
    {
        Assertions.assertEquals(true, true, "");
    }

}

package de.quinscape.automatontest;

import de.quinscape.automatontest.runtime.AutomatonTestApplication;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.EnabledIf;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(
    // prevent websocket errors
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@ContextConfiguration(classes = {
    AutomatonTestApplication.class
})
@EnabledIf(expression ="${ spring.profiles.active === 'integration-test'}")

//XXX: This test is only an example how to setup a complete integration-test. Also see MergeServiceTest for an example
//     of a partial context loading test.
@Ignore
public class AutomatonTestApplicationTests
{

    @Test
    public void contextLoads()
    {
    }

}

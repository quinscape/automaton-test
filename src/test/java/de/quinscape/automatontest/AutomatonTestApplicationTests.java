package de.quinscape.automatontest;

import de.quinscape.automatontest.runtime.AutomatonTestApplication;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes = {
    AutomatonTestApplication.class
})

//XXX: deactivated because it is slow and we have no context-requiring tests yet but keep this as example of how to do it.
@Ignore
public class AutomatonTestApplicationTests
{

    @Test
    public void contextLoads()
    {
    }

}

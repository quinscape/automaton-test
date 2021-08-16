import de.quinscape.automatontest.domain.tables.pojos.Bar;
import org.jooq.DSLContext;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import java.util.List;

import static de.quinscape.automatontest.domain.Tables.*;

public class TestCase
{
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
}

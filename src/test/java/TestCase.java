import org.junit.Test;

public class TestCase
{
    @Test
    public void name()
    {
        final String str = "💥Emoji Rule💥";
        System.out.println(str.substring(0, str.offsetByCodePoints(0, 6)));
    }

    
}

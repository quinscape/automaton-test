import org.junit.jupiter.api.Test;

public class TestCase
{
    @Test
    public void name()
    {
        final String str = "\uD83E\uDD14 💥Emoji Rule💥";
        System.out.println(str.substring(0, str.offsetByCodePoints(0, 6)));
    }


    @Test
    void name2()
    {
        System.out.println(-1);
        System.out.println(-1 >>> 1);
        System.out.println(-1 >>> 2);
    }
}

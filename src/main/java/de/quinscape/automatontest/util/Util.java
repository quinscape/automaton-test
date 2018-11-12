package de.quinscape.automatontest.util;

import java.util.Collection;
import java.util.Iterator;
import java.util.StringTokenizer;

public final class Util
{
    private Util()
    {

    }

    public static String joinWithComma(Collection<?> c)
    {
        return join(c, ", ");
    }

    public static String join(Collection<?> collection, String sep)
    {
        if (collection == null)
        {
            throw new IllegalArgumentException("collection can't be null");
        }

        if (sep == null)
        {
            throw new IllegalArgumentException("sep can't be null");
        }

        final StringBuilder buff = new StringBuilder();
        for (Iterator<?> iterator = collection.iterator(); iterator.hasNext(); )
        {
            Object o = iterator.next();

            buff.append(o);

            if (iterator.hasNext())
            {
                buff.append(sep);
            }
        }
        return buff.toString();
    }


    public static String formatJSON(String s)
    {

        StringBuilder sb = new StringBuilder(s.length() * 3 / 2);
        StringTokenizer st = new StringTokenizer(s, "{}[],\"", true);
        int icnt = 0;
        String lastToken="";
        boolean quoted=false;
        while (st.hasMoreTokens())
        {
            String token = st.nextToken();

            if (token.equals("\""))
            {
                int pos=lastToken.length()-1;
                int cnt=0;
                while (pos >= 0 && lastToken.charAt(pos) == '\\')
                {
                    pos--;
                    cnt++;
                }

                if ((cnt & 1) == 0)
                {
                    quoted=!quoted;
                }
            }

            if (quoted)
            {
                sb.append(token);
            }
            else
            {
                if (token.equals("{") || token.equals("["))
                {
                    icnt++;
                    sb.append(token);
                    newLine(sb, icnt);
                }
                else if (token.equals("}") || token.equals("]"))
                {
                    icnt--;
                    newLine(sb, icnt);
                    sb.append(token);
                }
                else if (token.equals(","))
                {
                    sb.append(token);
                    newLine(sb, icnt);
                }
                else
                {
                    sb.append(token);
                }
            }
            lastToken=token;
        }
        return sb.toString();
    }

    private final static String INDENT = "    ";

    private final static String NEWLINE = System.getProperty("line.separator");

    /**
     * Adds a newline followed by a given number of indentation spaces.
     *
     * @param sb
     *          StringStreamBuilder
     * @param cnt
     *          level of indentation
     */
    private static void newLine(StringBuilder sb, int cnt)
    {
        sb.append(NEWLINE);
        for (int i = 0; i < cnt; i++)
        {
            sb.append(INDENT);
        }
    }

}

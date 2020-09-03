import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.MethodDeclaration;
import de.quinscape.spring.jsview.util.JSONUtil;
import org.jooq.Condition;
import org.jooq.Field;
import org.jooq.impl.DSL;
import org.junit.Ignore;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileNotFoundException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class DSLPlayground
{
    private final static Logger log = LoggerFactory.getLogger(DSLPlayground.class);

    @Test
    @Ignore
    public void testDSL() throws FileNotFoundException
    {
        System.out.println("-- Global Conditions");
        Map<String, Integer> globals = findConditions(DSL.class, Condition.class);
        System.out.println(JSONUtil.DEFAULT_GENERATOR.dumpObjectFormatted(globals) + " , count = " + globals.size());

        System.out.println("-- Conditions");
        Map<String, Integer> conditions = findConditions(Field.class, Field.class);
        System.out.println(JSONUtil.DEFAULT_GENERATOR.dumpObjectFormatted(conditions) + " , count = " + conditions.size());

        System.out.println("-- Meta Conditions");
        Map<String, Integer> conditions2 = findConditions(Condition.class, Condition.class);
        System.out.println(JSONUtil.DEFAULT_GENERATOR.dumpObjectFormatted(conditions2) + " , count = " + conditions2.size());

        final Set<String> deprecated = getDeprecatedFieldMethods();

        System.out.println("deprecated = " + deprecated);
        System.out.println("-- Fields");
        Map<String, Integer> fields = findReturning(Field.class, Field.class, Field.class);

        fields.keySet().removeIf(deprecated::contains);
        
        System.out.println(JSONUtil.DEFAULT_GENERATOR.dumpObjectFormatted(fields) + " , count = " + fields.size());

    }


    private Set<String> getDeprecatedFieldMethods() throws FileNotFoundException
    {

        final CompilationUnit compilationUnit = StaticJavaParser.parse(new File("./src/test/resources/Field.java"));


        final Set<String> methods = new HashSet<>(
            compilationUnit.findAll(MethodDeclaration.class).stream()
                .filter(
                    decl ->
                        decl.getType().asString().startsWith("Field<") &&
                        decl.getJavadoc().isPresent() &&
                        decl.getJavadoc().get().toText().contains("This method is part of the pre-2.0 API")
                )
                .map(methodDeclaration -> methodDeclaration.getName().asString())
                .collect(Collectors.toSet()));

        methods.add("as");
        methods.add("cast");
        methods.add("coerce");
        return methods;
    }

    private Map<String, Integer> findConditions(Class<?> cls, Class<?> paramClass)
    {
        final Class<Condition> type = Condition.class;
        return findReturning(cls, paramClass, type);
    }


    private Map<String, Integer> findReturning(Class<?> cls, Class<?> paramClass, Class<?> returnType)
    {
        Map<String, Integer> conditions = new HashMap<>();
        for (Method method : cls.getMethods())
        {
            final Class<?> methodType = method.getReturnType();

            if (methodType.equals(returnType) && Arrays.stream(method.getParameterTypes())
                .allMatch(c -> paramClass.isAssignableFrom(c)))
            {
                conditions.put(method.getName(), method.getParameterTypes().length);
            }
        }
        return conditions;
    }
}

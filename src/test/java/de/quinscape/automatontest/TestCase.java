package de.quinscape.automatontest;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.MethodDeclaration;
import de.quinscape.spring.jsview.util.JSONUtil;
import org.jooq.Condition;
import org.jooq.Field;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.svenson.JSON;

import java.io.File;
import java.io.FileNotFoundException;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

public class TestCase
{
    private final static Logger log = LoggerFactory.getLogger(TestCase.class);

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @Test
    public void testPW() throws Exception
    {
        pw("admin");
        pw("user_a");
        pw("user_b");
        pw("user_c");
    }


    private void pw(String name)
    {
        log.info(
            "INSERT INTO app_user (id,login,password,roles,created, last_login) VALUES ('{}', '{}', '{}', '{}', now()" +
                ", now());",
            UUID.randomUUID().toString(),
            name,
            encoder.encode(name),
            "ROLE_" + name.toUpperCase()
        );
    }


    public final static Set<String> existing = new HashSet<>(Arrays.asList(
        "greaterOrEqual",
        "lessOrEqual",
        "lt",
        "notBetweenSymmetric",
        "notEqualIgnoreCase",
        "betweenSymmetric",
        "lessThan",
        "equalIgnoreCase",
        "isDistinctFrom",
        "between",
        "ge",
        "greaterThan",
        "isNotNull",
        "notLikeRegex",
        "notBetween",
        "notEqual",
        "isFalse",
        "containsIgnoreCase",
        "eq",
        "gt",
        "equal",
        "likeRegex",
        "isTrue",
        "contains",
        "notContainsIgnoreCase",
        "notContains",
        "ne",
        "isNull",
        "endsWith",
        "le",
        "isNotDistinctFrom",
        "startsWith",
        "in",
        "not",
        "or",
        "orNot",
        "and",
        "andNot",
        "bitNand",
        "mod",
        "div",
        "neg",
        "rem",
        "add",
        "subtract",
        "plus",
        "bitAnd",
        "bitXor",
        "shl",
        "unaryMinus",
        "bitNor",
        "shr",
        "modulo",
        "bitXNor",
        "bitNot",
        "sub",
        "minus",
        "mul",
        "bitOr",
        "times",
        "pow",
        "divide",
        "power",
        "multiply",
        "unaryPlus",
        "lower",
        "upper",
        "concat",
        "toString",
        "asc",
        "desc"
    ));


    @Test
    void testDSLMethods() throws FileNotFoundException
    {
        final JSON gen = JSONUtil.DEFAULT_GENERATOR;

        final Set<String> deprecated = getDeprecatedFieldMethods();

        StringBuilder conditions = new StringBuilder();
        StringBuilder operations = new StringBuilder();
        StringBuilder conditionsEx = new StringBuilder();
        StringBuilder operationsEx = new StringBuilder();

        final Method[] methods = Field.class.getMethods();
        for (Method method : methods)
        {
            if (
                !existing.contains(method.getName()) &&
                !deprecated.contains(method.getName()) &&
                Arrays
                    .stream(method.getParameterTypes())
                    .noneMatch(Class::isArray)
            )
            {
                final boolean onlyFieldsAndConditions = Arrays.stream(method.getParameterTypes())
                    .allMatch(aClass -> aClass.equals(Field.class) || aClass.equals(Condition.class));


                if (method.getReturnType().equals(Field.class))
                {
                    StringBuilder ops = onlyFieldsAndConditions ? operations : operationsEx;

                    ops.append(gen.quote(method.getName()))
                        .append(": ")
                        .append(method.getParameterTypes().length)
                        .append(",\t\t// ")
                        .append(method.getName())
                        .append("(")
                        .append(Arrays.stream(method.getParameterTypes())
                            .map(Class::getSimpleName)
                            .collect(Collectors.joining(", "))
                        )
                        .append(")\n");
                }
                else if (method.getReturnType().equals(Condition.class))
                {
                    StringBuilder conds = onlyFieldsAndConditions ? conditions : conditionsEx;
                    conds.append(gen.quote(method.getName()))
                        .append(": ")
                        .append(method.getParameterTypes().length)
                        .append(",\t\t// ")
                        .append(method.getName())
                        .append("(")
                        .append(Arrays.stream(method.getParameterTypes())
                            .map(Class::getSimpleName)
                            .collect(Collectors.joining(", "))
                        )
                        .append(")\n");
                }
            }
        }
        log.info("FIELD METHODS: {}", methods.length);
        
        log.info("\n--- MISSING \nCONDITIONS: \n{}OPERATIONS: \n{}", conditions, operations);
        log.info("\n--- MISSING EXTENDED\nCONDITIONS: \n{}OPERATIONS: \n{}", conditionsEx, operationsEx);
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

}


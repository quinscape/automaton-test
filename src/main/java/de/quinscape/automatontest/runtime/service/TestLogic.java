package de.quinscape.automatontest.runtime.service;

import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.domainql.annotation.GraphQLField;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLMutation;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.domainql.util.Paged;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.time.temporal.TemporalField;
import java.util.Arrays;
import java.util.List;

import static de.quinscape.automatontest.domain.Tables.*;

@GraphQLLogic
public class TestLogic
{
    private final DSLContext dslContext;

    @Autowired
    public TestLogic(
        DSLContext dslContext
    )
    {
        this.dslContext = dslContext;
    }

    @GraphQLQuery
    public List<Foo> queryWithComplexList()
    {
        return dslContext.select()
            .from(FOO)
            .orderBy(FOO.CREATED)
            .limit(3)
            .fetchInto(Foo.class);
    }

    @GraphQLQuery
    public List<Integer> queryWithList()
    {
        return Arrays.asList( 4, 8, 15, 16, 23, 42);
    }

    @GraphQLQuery
    public Timestamp queryWithScalar()
    {
        return Timestamp.valueOf("2018-01-02 12:00:00");
    }

    @GraphQLQuery
    public Paged<Foo> getFoos(
        @GraphQLField(defaultValue = "0")
            int offset,
        @GraphQLField(defaultValue = "10")
            int limit
    )
    {
        final List<Foo> foos = dslContext.select()
            .from(FOO)
            .orderBy(FOO.CREATED)
            .offset(offset)
            .limit(limit)
            .fetchInto(Foo.class);

        return new Paged<>(foos, dslContext.fetchCount(FOO));
    }


    @GraphQLMutation
    public WireTestResult wireTestMutation(Foo input, int count)
    {
        return new WireTestResult(input.getId() , input.getCreated(), input.getCreated().toInstant() + ":" + count);
    }
}

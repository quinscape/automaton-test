package de.quinscape.automatontest.runtime.service;

import de.quinscape.automaton.runtime.auth.AutomatonAuthentication;
import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.automatontest.model.ComplexContainer;
import de.quinscape.domainql.annotation.GraphQLField;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLMutation;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.domainql.util.Paged;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

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
    

//    @GraphQLQuery
//    public Filtered<Foo> getFoos(
//        QueryConfig queryConfig
//    )
//    {
//        final int pageSize = queryConfig.getPageSize();
//        final int offset = queryConfig.getCurrentPage() * pageSize;
//
//        final List<Foo> foos = dslContext.select()
//            .from(FOO)
//            .orderBy(FOO.CREATED)
//            .offset(offset)
//            .limit(pageSize)
//            .fetchInto(Foo.class);
//
//        return new Filtered<>(foos, dslContext.fetchCount(FOO), queryConfig);
//    }



    @GraphQLMutation
    public WireTestResult wireTestMutation(Foo input, int count)
    {
        return new WireTestResult(input.getId() , input.getCreated(), input.getCreated().toInstant() + ":" + count);
    }

    @GraphQLMutation
    public Foo createFoo(@NotNull String name)
    {
        final Foo foo = new Foo();

        foo.setId(UUID.randomUUID().toString());
        foo.setName(name);
        foo.setNum(0);
        foo.setCreated(Timestamp.from(Instant.now()));
        foo.setType("TYPE_A");
        foo.setOwnerId(AutomatonAuthentication.current().getId());

        return foo;
    }

    @GraphQLMutation
    public boolean complexStore(ComplexContainer container)
    {

        return true;
    }


    public static class WireTestResult
    {
        private final String id;

        private final Timestamp created;

        private final String check;


        public WireTestResult()
        {
            this(null, null, null);

        }

        public WireTestResult(String id, Timestamp created, String check)
        {
            this.id = id;
            this.created = created;
            this.check = check;
        }


        public String getId()
        {
            return id;
        }


        public Timestamp getCreated()
        {
            return created;
        }


        public String getCheck()
        {
            return check;
        }
    }
}

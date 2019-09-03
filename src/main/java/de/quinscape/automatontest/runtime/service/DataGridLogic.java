 package de.quinscape.automatontest.runtime.service;

import de.quinscape.automaton.model.data.ColumnState;
import de.quinscape.automaton.model.data.InteractiveQuery;
import de.quinscape.automaton.model.data.QueryConfig;
import de.quinscape.automaton.runtime.auth.AutomatonAuthentication;
import de.quinscape.automaton.runtime.data.RuntimeQuery;
import de.quinscape.automaton.runtime.data.InteractiveQueryService;
import de.quinscape.automatontest.domain.tables.pojos.AppUser;
import de.quinscape.automatontest.domain.tables.pojos.Bar;
import de.quinscape.automatontest.domain.tables.pojos.Baz;
import de.quinscape.automatontest.domain.tables.pojos.BazLink;
import de.quinscape.automatontest.domain.tables.pojos.BazValue;
import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.automatontest.domain.tables.pojos.FooType;
import de.quinscape.automatontest.domain.tables.pojos.GridColumns;
import de.quinscape.automatontest.domain.tables.pojos.Node;
import de.quinscape.automatontest.domain.tables.pojos.QuxA;
import de.quinscape.automatontest.domain.tables.pojos.QuxB;
import de.quinscape.automatontest.domain.tables.pojos.QuxC;
import de.quinscape.automatontest.domain.tables.pojos.QuxD;
import de.quinscape.automatontest.domain.tables.pojos.QuxMain;
import de.quinscape.automatontest.domain.tables.pojos.SumPerMonth;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLMutation;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.domainql.annotation.GraphQLTypeParam;
import de.quinscape.domainql.jsonb.JSONB;
import graphql.schema.DataFetchingEnvironment;
import org.jooq.DSLContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

import static org.jooq.impl.DSL.and;
import static de.quinscape.automatontest.domain.Tables.*;

@GraphQLLogic
public class DataGridLogic
{
    private final static Logger log = LoggerFactory.getLogger(DataGridLogic.class);

    private final DSLContext dslContext;
    private final InteractiveQueryService interactiveQueryService;

    @Autowired
    public DataGridLogic(
        DSLContext dslContext,
        InteractiveQueryService interactiveQueryService
    )
    {
        this.dslContext = dslContext;
        this.interactiveQueryService = interactiveQueryService;
    }


    /**
     * Queries [T] objects based on the given query config
     *
     * @param type
     * @param env
     * @param config    configuration for the Interactive query.
     * @param <T>
     * @return
     */
    @GraphQLQuery
    public <T> InteractiveQuery<T> iQuery(
        @GraphQLTypeParam(
            types = {
                Foo.class,
                FooType.class,
                Bar.class,
                Node.class,
                AppUser.class,
                SumPerMonth.class,

                QuxMain.class,
                QuxA.class,
                QuxB.class,
                QuxC.class,
                QuxD.class,

                Baz.class,
                BazValue.class,
                BazLink.class
            }
        )
        Class<T> type,
        DataFetchingEnvironment env,
        @NotNull QueryConfig config
    )
    {

        log.info("iQuery<{}>, config = {}", type, config);

        return interactiveQueryService.buildInteractiveQuery( type, env, config)
            .execute();

    }

    @GraphQLQuery
    public <T> InteractiveQuery<T> iQuerywithColumnConfig(
        @GraphQLTypeParam(
            types = {
                Foo.class,
            }
        )
        Class<T> type,
        DataFetchingEnvironment env,
        QueryConfig config
    )
    {
        log.info("iQuerywithColumnConfig<{}>, config = {}", type, config);

        final RuntimeQuery<T> builder = interactiveQueryService.buildInteractiveQuery(
            type,
            env,
            config
        ).withColumnsFromQuery();


        final List<ColumnState> columnStates = builder.getColumnStates();
        final JSONB columns = getColumnConfigForUser(config.getId());

        log.info("Columns configuration for current user and id = '{}': {}", config.getId(), columns);

        if (columns != null)
        {
            reconfigureColumns(columnStates, columns);
        }
        return builder.execute();
    }


    /**
     * Example for Datagrid column configuration. Stores columns in public.grid_columns
     *
     * @param name          query name
     * @param columns       columns JSONB object
     *
     * @return always true
     */
    @GraphQLMutation
    public boolean configureColumns(@NotNull String name, JSONB columns)
    {
        log.info("configureColumns: {}, {}", name, columns);

        final AutomatonAuthentication current = AutomatonAuthentication.current();

        final GridColumns pojo = dslContext.select()
            .from(GRID_COLUMNS)
            .where(
                and(
                    GRID_COLUMNS.NAME.eq(name),
                    GRID_COLUMNS.OWNER_ID.eq(current.getId())
                )
            )
            .fetchOneInto(GridColumns.class);

        if (pojo == null)
        {
            dslContext.insertInto(GRID_COLUMNS)
                .set(GRID_COLUMNS.ID, UUID.randomUUID().toString())
                .set(GRID_COLUMNS.NAME, name)
                .set(GRID_COLUMNS.COLUMNS, columns)
                .set(GRID_COLUMNS.OWNER_ID, current.getId())
                .execute();
        }
        else
        {
            dslContext.update(GRID_COLUMNS)
                .set(GRID_COLUMNS.COLUMNS, columns)
                .where(
                    and(
                        GRID_COLUMNS.NAME.eq(name),
                        GRID_COLUMNS.OWNER_ID.eq(current.getId())
                    )
                )
                .execute();

        }
        return true;
    }

    private <T> void reconfigureColumns(List<ColumnState> columnStates, @NotNull JSONB columns)
    {
        for (ColumnState columnState : columnStates)
        {
            final boolean isEnabled = columns.getProperty(columnState.getName()).equals(true);
            columnState.setEnabled(isEnabled);
        }
    }


    private JSONB getColumnConfigForUser(String name)
    {
        final AutomatonAuthentication current = AutomatonAuthentication.current();

        final GridColumns pojo = dslContext.select()
            .from(GRID_COLUMNS)
            .where(
                and(
                    GRID_COLUMNS.NAME.eq(name),
                    GRID_COLUMNS.OWNER_ID.eq(current.getId())
                )
            )
            .fetchOneInto(GridColumns.class);

        return pojo != null ? pojo.getColumns() : null;
    }
}

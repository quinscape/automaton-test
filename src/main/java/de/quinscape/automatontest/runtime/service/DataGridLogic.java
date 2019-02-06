package de.quinscape.automatontest.runtime.service;

import de.quinscape.automaton.model.data.ColumnConfig;
import de.quinscape.automaton.model.data.InteractiveQuery;
import de.quinscape.automaton.model.data.QueryConfig;
import de.quinscape.automaton.runtime.data.FilterTransformationService;
import de.quinscape.automatontest.domain.tables.pojos.Foo;
import de.quinscape.domainql.annotation.GraphQLLogic;
import de.quinscape.domainql.annotation.GraphQLQuery;
import de.quinscape.domainql.annotation.GraphQLTypeParam;
import graphql.schema.DataFetchingEnvironment;
import org.jooq.DSLContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

@GraphQLLogic
public class DataGridLogic
{
    private final static Logger log = LoggerFactory.getLogger(DataGridLogic.class);


    private final DSLContext dslContext;
    private final FilterTransformationService filterTransformationService;

    @Autowired
    public DataGridLogic(
        DSLContext dslContext,
        FilterTransformationService filterTransformationService
    )
    {
        this.dslContext = dslContext;
        this.filterTransformationService = filterTransformationService;
    }


    @GraphQLQuery
    public <T> InteractiveQuery<T> iQuery(
        @GraphQLTypeParam(types = { Foo.class }) Class<T> type,
        DataFetchingEnvironment env,
        QueryConfig config
    )
    {

        log.info("iQuery<{}>, config = {}", type, config);

        final ColumnConfig columnConfig = InteractiveQuery.configFromEnv(env, type);
        return InteractiveQuery.executeQuery(
            env,
            dslContext,
            type,
            config,
            columnConfig,
            filterTransformationService.createConditions(type, columnConfig, config),
            InteractiveQuery.orderByFields(columnConfig, config)
        );
    }





    
}

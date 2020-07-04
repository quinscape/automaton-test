package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.runtime.controller.ScopeTableConfig;
import de.quinscape.automaton.runtime.i18n.TranslationService;
import de.quinscape.automaton.runtime.provider.AutomatonJsViewProvider;
import de.quinscape.automaton.runtime.provider.ProcessInjectionService;
import de.quinscape.automaton.runtime.ws.AutomatonWebSocketHandler;
import de.quinscape.domainql.preload.PreloadedGraphQLQueryProvider;
import de.quinscape.domainql.schema.SchemaDataProvider;
import de.quinscape.spring.jsview.JsViewResolver;
import de.quinscape.spring.jsview.loader.ResourceLoader;
import graphql.schema.GraphQLSchema;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.ServletContext;
import java.util.Optional;

@Configuration
public class WebConfiguration
    implements WebMvcConfigurer
{

    private final ServletContext servletContext;

    private final ResourceLoader resourceLoader;

    private final GraphQLSchema graphQLSchema;

    private final AutomatonWebSocketHandler automatonTestWebSocketHandler;

    private final ProcessInjectionService processInjectionService;
    private final TranslationService translationService;

    private final DSLContext dslContext;

    private final ScopeTableConfig scopeTableConfig;


    @Autowired
    public WebConfiguration(
        ServletContext servletContext,
        GraphQLSchema graphQLSchema,
        ResourceLoader resourceLoader,
        ProcessInjectionService processInjectionService,
        TranslationService translationService,
        DSLContext dslContext,
        @Lazy Optional<AutomatonWebSocketHandler> optionalSocketHandler,
        ScopeTableConfig scopeTableConfig
    )
    {
        this.servletContext = servletContext;
        this.graphQLSchema = graphQLSchema;
        this.resourceLoader = resourceLoader;

        this.automatonTestWebSocketHandler = optionalSocketHandler.orElse(null);
        this.processInjectionService = processInjectionService;
        this.translationService = translationService;
        this.dslContext = dslContext;
        this.scopeTableConfig = scopeTableConfig;
    }


    @Override
    public void configureViewResolvers(ViewResolverRegistry registry)
    {
        registry.viewResolver(
            JsViewResolver.newResolver(servletContext, "WEB-INF/template.html")
                .withResourceLoader(resourceLoader)

                // Process injections and general miscellaneous data we would normally
                // inject by hand in a Spring-JsView application
                .withViewDataProvider(
                    new AutomatonJsViewProvider(
                        dslContext, processInjectionService,
                        translationService, automatonTestWebSocketHandler,
                        scopeTableConfig
                    )
                )

                // queries defined via PRELOADED_QUERIES
                .withViewDataProvider(
                    new PreloadedGraphQLQueryProvider(
                        graphQLSchema,
                        resourceLoader
                    )
                )

                // schema data for domainql-form and automaton-js
                .withViewDataProvider(
                    new SchemaDataProvider(
                        graphQLSchema
                    )
                )

                .build()
        );
    }
}

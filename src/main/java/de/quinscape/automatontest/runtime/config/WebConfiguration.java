package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.model.js.StaticFunctionReferences;
import de.quinscape.automaton.runtime.provider.AlternateStyleProvider;
import de.quinscape.automaton.runtime.provider.AutomatonJsViewProvider;
import de.quinscape.automaton.runtime.provider.StyleSheetDefinition;
import de.quinscape.automaton.runtime.util.ProcessListUtil;
import de.quinscape.automatontest.model.ValidationRules;
import de.quinscape.domainql.DomainQL;
import de.quinscape.spring.jsview.JsViewResolver;
import de.quinscape.spring.jsview.loader.ResourceHandle;
import de.quinscape.spring.jsview.loader.ResourceLoader;
import graphql.schema.GraphQLSchema;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.servlet.ServletContext;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfiguration
    implements WebMvcConfigurer
{


    private final Environment env;

    private final ServletContext servletContext;

    private final DomainQL domainQL;

    private final ResourceLoader resourceLoader;

    private final DSLContext dslContext;

    private final AutomatonJsViewProvider automatonJsViewProvider;

    private final ResourceHandle<ValidationRules> validationRulesHandle;

    private final ResourceHandle<StaticFunctionReferences> staticFnHandle;

    @Autowired
    public WebConfiguration(
        Environment env,
        ServletContext servletContext,
        ResourceLoader resourceLoader,
        @Lazy DomainQL domainQL,
        DSLContext dslContext,
        AutomatonJsViewProvider automatonJsViewProvider,
        @Qualifier("validationRules")
        ResourceHandle<ValidationRules> validationRulesHandle,
        ResourceHandle<StaticFunctionReferences> staticFnHandle
    )
    {
        this.env = env;
        this.servletContext = servletContext;

        this.domainQL = domainQL;
        this.resourceLoader = resourceLoader;
        this.dslContext = dslContext;
        this.automatonJsViewProvider = automatonJsViewProvider;
        this.validationRulesHandle = validationRulesHandle;
        this.staticFnHandle = staticFnHandle;
    }


    @Override
    public void configureViewResolvers(ViewResolverRegistry registry)
    {
        final GraphQLSchema graphQLSchema = domainQL.getGraphQLSchema();
        registry.viewResolver(
            JsViewResolver.newResolver(servletContext, "WEB-INF/template-alternate-styles.html")
                .withResourceLoader(resourceLoader)

                // Process injections and general miscellaneous data we would normally
                // inject by hand in a Spring-JsView application
                .withViewDataProvider(
                    automatonJsViewProvider
                )

                .withViewDataProvider(
                    new AlternateStyleProvider(
                        servletContext.getContextPath(),
                        Arrays.asList(
                            new StyleSheetDefinition("QS", "/css/bootstrap-automaton.min.css"),
                            new StyleSheetDefinition("QS condensed", "/css/bootstrap-automaton-condensed.min.css")
                        )
                    )
                )

                .withViewDataProvider(
                    ctx -> {
                        final ValidationRules content = validationRulesHandle.getContent();
                        ctx.provideViewData("validationRules", content);
                        ctx.provideViewData("processes", ProcessListUtil.listProcesses("shipping", staticFnHandle));
                    }
                )
                .withViewDataProvider(
                    new AutomatonTestErrorProvider()
                )
                .build()
        );
    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry)
    {
        registry.addResourceHandler("/js/**")
            .addResourceLocations("/js/", "/css/", "/webfonts/")
            .setCacheControl(CacheControl.maxAge(90, TimeUnit.DAYS));
    }
}

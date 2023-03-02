package de.quinscape.automatontest.runtime;

import de.quinscape.automaton.runtime.config.AutomatonConfiguration;
import de.quinscape.automaton.runtime.config.WebsocketConfiguration;
import de.quinscape.automaton.runtime.data.FilterContextRegistry;
import de.quinscape.automatontest.runtime.config.DomainConfiguration;
import de.quinscape.automatontest.runtime.config.GraphQLConfiguration;
import de.quinscape.automatontest.runtime.config.SecurityConfiguration;
import de.quinscape.automatontest.runtime.config.ServiceConfiguration;
import de.quinscape.automatontest.runtime.config.WebConfiguration;
import de.quinscape.automatontest.runtime.controller.JsEntryPointController;
import de.quinscape.automatontest.runtime.service.ShippingLogic;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import javax.annotation.PostConstruct;

@SpringBootApplication(
    scanBasePackageClasses = {
        ShippingLogic.class,
        JsEntryPointController.class
    }
)

@Import({
    AutomatonConfiguration.class,
    WebsocketConfiguration.class,

    GraphQLConfiguration.class,
    DomainConfiguration.class,
    WebConfiguration.class,
    SecurityConfiguration.class,
    ServiceConfiguration.class
})

@EnableWebSecurity(debug = false)
@PropertySource({"classpath:automatontest-${spring.profiles.active}.properties"})
public class AutomatonTestApplication
    extends SpringBootServletInitializer
    implements ApplicationContextAware
{
    private ApplicationContext applicationContext;

    private final static Logger log = LoggerFactory.getLogger(AutomatonTestApplication.class);


    @Autowired
    public void setConfigFileLocation(
        @Value("automatontest-${spring.profiles.active}.properties") String config
    )
    {
        log.info("Using configuration from {}", config);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application)
    {
        return application.sources(AutomatonTestApplication.class);
    }

    public static void main(String[] args)
    {
        SpringApplication.run(AutomatonTestApplication.class, args);
    }


    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException
    {
        this.applicationContext = applicationContext;
    }

}

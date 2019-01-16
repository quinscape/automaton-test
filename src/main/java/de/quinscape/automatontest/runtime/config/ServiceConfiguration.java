package de.quinscape.automatontest.runtime.config;

import de.quinscape.automatontest.model.ValidationRules;
import de.quinscape.spring.jsview.loader.FileResourceLoader;
import de.quinscape.spring.jsview.loader.JSONResourceConverter;
import de.quinscape.spring.jsview.loader.ResourceHandle;
import de.quinscape.spring.jsview.loader.ResourceLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;

@Configuration
public class ServiceConfiguration
{
    private final static Logger log = LoggerFactory.getLogger(ServiceConfiguration.class);


    private FileResourceLoader externalResourceLoader;

    @Bean
    @Qualifier("validationRules")
    public ResourceHandle<ValidationRules> validationService(ResourceLoader resourceLoader, @Value("${automatontest.validation.rules:}") String externalRules) throws IOException
    {
        final ResourceHandle<ValidationRules> handle;
        final JSONResourceConverter<ValidationRules> converter = new JSONResourceConverter<>(ValidationRules.class);
        if (StringUtils.hasText(externalRules))
        {
            log.info("Loading validation rules from external file {}", externalRules);

            final File externalRulesFile = new File(externalRules);
            final File externalRulesDir = externalRulesFile.getParentFile();

            externalResourceLoader = new FileResourceLoader(externalRulesDir.getAbsolutePath(), false);
            handle = externalResourceLoader.getResourceHandle(externalRulesFile.getName(), converter);
        }
        else
        {
            log.info("Loading default validation rules from /WEB-INF/rules.json");

            handle = resourceLoader.getResourceHandle(
                "WEB-INF/rules.json",
                converter
            );
        }
        return handle;
    }
}

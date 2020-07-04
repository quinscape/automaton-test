package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.runtime.config.AutomatonCSRFExceptions;
import de.quinscape.automaton.runtime.auth.AppAuthenticationService;
import de.quinscape.automaton.runtime.auth.DefaultPersistentTokenRepository;
import de.quinscape.automaton.runtime.controller.GraphQLController;
import de.quinscape.automatontest.domain.tables.pojos.AppLogin;
import de.quinscape.automatontest.domain.tables.pojos.AppUser;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

@Configuration
//@Import(MethodSecurityConfiguration.class)
// Enable method security ( with @PreAuthorize/@PostAuthorize annotations)
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration
    extends WebSecurityConfigurerAdapter
{

    private final DSLContext dslContext;

    private final boolean crsfDevExceptions;


    private final static String[] PUBLIC_URIS = new String[]
        {
            "/index.jsp",
            "/error",
            "/js/**",
            "/css/**",
            "/webfonts/**",
            "/_dev/**"
        };


    @Autowired
    public SecurityConfiguration(
        DSLContext dslContext,
        @Value("${automatontest.crsf.dev:false}")
        boolean crsfDevExceptions
    )
    {
        this.dslContext = dslContext;
        this.crsfDevExceptions = crsfDevExceptions;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http
            .authorizeRequests()
            .antMatchers(
                PUBLIC_URIS
            ).permitAll()

            .antMatchers("/admin/**")
                .hasRole("ADMIN")

            .antMatchers("**")
                .hasRole("USER")

            .and()
                .formLogin()
                    .loginPage("/login")
                    .loginProcessingUrl("/login_check")
                    .defaultSuccessUrl("/shipping/")
                    .permitAll()
            .and()

            // exempt GRAPHQL_DEV_URI from CSRF requirements if allowDevGraphQLAccess is set
            .csrf()
                .requireCsrfProtectionMatcher(
                    new AutomatonCSRFExceptions(crsfDevExceptions)
                )
            .and()
            .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .deleteCookies("remember-me")
                .and()
                .rememberMe()
                    .key("Y.hOf+S/Ze3MY@O5bSxt")
                    .tokenRepository(persistentTokenRepository())
                    .userDetailsService(userDetailsServiceBean());

    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception
    {
        auth
            .userDetailsService(userDetailsServiceBean())
            .passwordEncoder(new BCryptPasswordEncoder());

    }

    @Bean
    public PersistentTokenRepository persistentTokenRepository()
    {
        return new DefaultPersistentTokenRepository<AppLogin>(dslContext, "app_login", AppLogin.class);
    }


    @Bean
    @Override
    public UserDetailsService userDetailsServiceBean()
    {
        return new AppAuthenticationService<AppUser>(
            dslContext,
            "app_user",
            AppUser.class
        );
    }
}

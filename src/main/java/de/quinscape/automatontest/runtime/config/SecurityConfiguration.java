package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.runtime.auth.AppAuthenticationService;
import de.quinscape.automaton.runtime.auth.DefaultPersistentTokenRepository;
import de.quinscape.automaton.runtime.config.AutomatonCSRFExceptions;
import de.quinscape.automaton.runtime.config.AutomatonSessionExpiredStrategy;
import de.quinscape.automatontest.domain.tables.pojos.AppLogin;
import de.quinscape.automatontest.domain.tables.pojos.AppUser;
import jakarta.servlet.Filter;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.authentication.session.ConcurrentSessionControlAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.session.ConcurrentSessionFilter;

@Configuration
//@Import(MethodSecurityConfiguration.class)
// Enable method security ( with @PreAuthorize/@PostAuthorize annotations)
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration
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


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception
    {
        
        http
            .formLogin()
                .loginPage("/v/v-login/")
                .loginProcessingUrl("/login_check")
                .defaultSuccessUrl("/shipping/")
                .permitAll()
            .and()
            .logout()
            .logoutUrl("/logout")
            .logoutSuccessUrl("/")
            .deleteCookies("remember-me")
            .and()
            .authorizeHttpRequests(
                auth ->
                    auth.requestMatchers(PUBLIC_URIS).permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/**").hasRole("USER")
            )

            // exempt GRAPHQL_DEV_URI from CSRF requirements if allowDevGraphQLAccess is set
            .csrf()
            .requireCsrfProtectionMatcher(
                new AutomatonCSRFExceptions(crsfDevExceptions)
            )
            .and()
            .rememberMe()
            .key("Y.hOf+S/Ze3MY@O5bSxt")
            .tokenRepository(persistentTokenRepository())
            .userDetailsService(userDetailsServiceBean())
            .and()

            .addFilterBefore(concurrentSessionFilter(), ConcurrentSessionFilter.class)
            .sessionManagement()
            .sessionAuthenticationStrategy(sessionAuthenticationStrategy())
            // configure the number of concurrent *sessions* (not windows), -1 for unlimited
            .maximumSessions(-1);
        return http.build();
    }

//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception
//    {
//        auth
//            .userDetailsService(userDetailsServiceBean())
//            .passwordEncoder(new BCryptPasswordEncoder());
//
//    }

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public PersistentTokenRepository persistentTokenRepository()
    {
        return new DefaultPersistentTokenRepository<AppLogin>(dslContext, "app_login", AppLogin.class);
    }


    @Bean
    public UserDetailsService userDetailsServiceBean()
    {
        return new AppAuthenticationService<AppUser>(
            dslContext,
            "app_user",
            AppUser.class
        );
    }

    @Bean
    public SessionRegistry sessionRegistry()
    {
        return new SessionRegistryImpl();
    }

    @Bean
    public SessionAuthenticationStrategy sessionAuthenticationStrategy()
    {
        return new ConcurrentSessionControlAuthenticationStrategy(
            sessionRegistry()
        );
    }

    @Bean
    public Filter concurrentSessionFilter()
    {
        return new ConcurrentSessionFilter(
            sessionRegistry(),
            new AutomatonSessionExpiredStrategy()
        );
    }
}

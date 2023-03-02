package de.quinscape.automatontest.runtime.controller;

import de.quinscape.automaton.runtime.controller.UnifiedResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Enumeration;
import java.util.Objects;

@Controller
public class JsEntryPointController
    implements ErrorController
{
    private static final String ORIGINAL_URI = JsEntryPointController.class.getName() + ":originalURI";

    private final static String SESSION_EXPIRED = "SESSION_EXPIRED";

    public static final String APPLICATION_JSON = "application/json";

    private final static Logger log = LoggerFactory.getLogger(JsEntryPointController.class);

    @RequestMapping("/shipping/**")
    public String serveTodo()
    {
        return "shipping";
    }

    @RequestMapping("/error")
    public Object serveError(HttpServletRequest request, HttpServletResponse response)
    {
        if (Objects.equals(request.getContentType(),APPLICATION_JSON))
        {
            // special case hack to detect expired sessions in case the AutomatonSessionExpiredStrategy doesn't
            final String oldSessionId = getOldSessionId(request);
            final HttpSession session = request.getSession(false);
            if (oldSessionId != null && session != null)
            {
                final String sessionId = session.getId();
                if (!oldSessionId.equals(sessionId))
                {
                    log.info("Session expired: was {}, is {}", oldSessionId, sessionId);
                    session.invalidate();

                    return UnifiedResponse.errors(
                        HttpStatus.FORBIDDEN,
                        SESSION_EXPIRED
                    );
                }
            }
            log.info("Internal server error");
            return UnifiedResponse.errors(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error"
            );
        }

//        logAttributes(request);
//        log.debug("ORIGINAL_URI:", request.getAttribute(ORIGINAL_URI));
        return "v-error";
    }


    private HttpStatus errorStatus(HttpServletResponse response)
    {
        final int status = response.getStatus();
        if (status < 400)
        {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(status);
    }


    private String getOldSessionId(HttpServletRequest request)
    {
        final Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies)
        {
            if (cookie.getName().equals("JSESSIONID"))
            {
                return cookie.getValue();
            }
        }
        return null;
    }

    private void logAttributes(HttpServletRequest request)
    {
        StringBuilder buf = new StringBuilder();
        final Enumeration<String> names = request.getAttributeNames();
        while(names.hasMoreElements())
        {
            String name = names.nextElement();
            buf.append(name).append(" = ").append(request.getAttribute(name)).append("\n");
        }

        log.debug("REQUEST ATTRIBUTES: {}", buf);
    }


    @ExceptionHandler(Exception.class)
    public String exceptionHandler(HttpServletRequest request, HttpServletResponse response, Exception e)
    {

        log.debug("exceptionHandler:", e);
        request.setAttribute(ORIGINAL_URI, request.getRequestURI());

        return "v-error";
    }

}

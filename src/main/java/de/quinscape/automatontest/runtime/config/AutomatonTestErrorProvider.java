package de.quinscape.automatontest.runtime.config;

import de.quinscape.automaton.runtime.ProcessNotFoundException;
import de.quinscape.automaton.runtime.util.ErrorUtil;
import de.quinscape.automatontest.model.ErrorViewModel;
import de.quinscape.spring.jsview.JsViewContext;
import de.quinscape.spring.jsview.JsViewProvider;
import org.springframework.http.HttpStatus;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;

/**
 * Provides an error view model to the error.js view. Is a workaround for the fact that we have no standalone view
 * injection (as opposed to the process injection)
 */
public class AutomatonTestErrorProvider
    implements JsViewProvider
{
    @Override
    public void provide(JsViewContext context) throws Exception
    {
        final HttpServletRequest request = context.getRequest();

        boolean showLogin = false;
        if (request.getRequestURI().equals(request.getContextPath() + "/error"))
        {
            String title = getErrorMessageFromCode(request);

            String detail = "---";

            final Throwable t = ErrorUtil.getLatestJavaxServletException(request);
            if (ErrorUtil.hasCause(t, ProcessNotFoundException.class))
            {
                title = "Not Found";
                detail = "Prozess nicht gefunden";
            }

            context.provideViewData("errorView", new ErrorViewModel(
                title,
                detail,
                showLogin
            ));
        }
    }


    private String getErrorMessageFromCode(HttpServletRequest request)
    {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (status != null) {
            Integer statusCode = Integer.valueOf(status.toString());

            for (HttpStatus httpStatus : HttpStatus.values())
            {
                if (statusCode == httpStatus.value())
                {
                    return httpStatus.getReasonPhrase();
                }
            }
        }
        return "Internal Error";
    }
}

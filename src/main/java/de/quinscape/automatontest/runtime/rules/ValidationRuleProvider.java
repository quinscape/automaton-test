package de.quinscape.automatontest.runtime.rules;

import de.quinscape.spring.jsview.JsViewContext;
import de.quinscape.spring.jsview.JsViewProvider;

public class ValidationRuleProvider
    implements JsViewProvider
{
    @Override
    public void provide(JsViewContext jsViewContext) throws Exception
    {
        jsViewContext.provideViewData("validationRules", new Rule());

    }
}

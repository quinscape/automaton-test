package de.quinscape.automatontest.runtime.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JsEntryPointController
{
    @RequestMapping("/shipping/**")
    public String serveTodo()
    {
        return "shipping";
    }
}

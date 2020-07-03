package de.quinscape.automatontest.runtime.controller;

import de.quinscape.automaton.runtime.config.AutomatonCSRFExceptions;
import de.quinscape.automaton.runtime.merge.MergeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@Profile("dev")
public class MergeServiceController
{
    private final static Logger log = LoggerFactory.getLogger(MergeServiceController.class);


    private final MergeService mergeService;

    private final static String URI = AutomatonCSRFExceptions.DEV_SERVICES_PATH + "merge-service-flush";

    private final static ResponseEntity<String> OK = new ResponseEntity("Service flushed.", HttpStatus.OK);

    @Autowired
    public MergeServiceController(MergeService mergeService)
    {
        this.mergeService = mergeService;

        log.debug("Create MergeServiceController");
    }


    @RequestMapping(method = RequestMethod.POST, value = URI)
    public ResponseEntity<String> flushMergeService()
    {
        mergeService.flush();
        
        return OK;
    }
}

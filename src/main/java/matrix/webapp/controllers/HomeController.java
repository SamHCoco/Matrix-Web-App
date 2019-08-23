package matrix.webapp.controllers;

import matrix.webapp.models.MatrixSizeModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping("")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public String executeCalculation(@RequestBody MatrixSizeModel size){
        // calculation controller
        return "index";
    }
}

package matrix.webapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class HomeController {

    @RequestMapping("")
    public String index(){
        return "index";
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public String getMatrixValues(@RequestParam String matrix1e11){
        System.out.println(matrix1e11);
        return "index";
    }

}


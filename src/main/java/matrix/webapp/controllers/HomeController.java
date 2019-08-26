package matrix.webapp.controllers;

import matrix.webapp.models.MatrixModel;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.Map;

@Controller
public class HomeController {

    @RequestMapping("")
    public String home(){
        return "index";
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public String executeCalculation(@RequestBody Map<String, String> data){
        System.out.println("\n\n" + "RECEIVED DATA:" + data.toString()); // todo-REMOVE
        ArrayList<Double[][]> matrices =  MatrixModel.extractMatrices(data);
        return "index";
    }
}

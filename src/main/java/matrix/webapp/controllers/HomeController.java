package matrix.webapp.controllers;

import matrix.webapp.Constant;
import matrix.webapp.models.MatrixModel;
import matrix.webapp.models.MatrixSizeModel;
import matrix.webapp.services.MatrixService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
public class HomeController {

    private MatrixService matrix1;
    private MatrixService matrix2;

    @RequestMapping("")
    public String home(){
        return "index";
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, String> executeCalculation(@RequestBody Map<String, String> data){

        System.out.println("\n\n" + "RECEIVED DATA:" + data.toString()); // todo-REMOVE

        ArrayList<Double[][]> matrices =  MatrixModel.extractMatrices(data);
        HashMap<String, Integer> size = MatrixSizeModel.getDimensions(data);
        String operator = data.get("operator");

        if(operator.equals("+") || operator.equals("-") || operator.equals("x")){
            matrix1 = new MatrixService("MATRIX 1", size.get(Constant.MATRIX_1_ROWS),
                   size.get(Constant.MATRIX_1_COLUMNS));
            matrix1.setMatrix(MatrixService.doubleArrayUnboxer(matrices.get(0)));

            matrix2 = new MatrixService("MATRIX 2", size.get(Constant.MATRIX_2_ROWS),
                    size.get(Constant.MATRIX_2_COLUMNS));
            matrix2.setMatrix(MatrixService.doubleArrayUnboxer(matrices.get(1)));
        }

        if(operator.equals("det")){
            matrix1 = new MatrixService("MATRIX 1", size.get(Constant.MATRIX_1_ROWS),
                    size.get(Constant.MATRIX_1_COLUMNS));
            matrix1.setMatrix(MatrixService.doubleArrayUnboxer(matrices.get(0)));
        }

        if(operator.equals("+")){
            matrix1.addMatrix(matrix2);
        } else if(operator.equals("-")){
            matrix1.subtractMatrix(matrix2);
        } else if(operator.equals("x")){
            matrix1.multiply(matrix2);
        } else if(operator.equals("det")){
            matrix1.calculateDeterminant();
        }
        if(operator.equals("+") || operator.equals("-") || operator.equals("x")){
            return MatrixModel.convertArrayToMap(matrix1);
        }
        if(operator.equals("det")){
            return MatrixModel.convertDetToMap(matrix1);
        }
        return null;
    }
}

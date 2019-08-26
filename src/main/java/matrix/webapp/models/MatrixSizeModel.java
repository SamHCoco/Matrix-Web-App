package matrix.webapp.models;

import matrix.webapp.Constant;

import java.util.HashMap;
import java.util.InputMismatchException;
import java.util.Map;

public class MatrixSizeModel {

    public static HashMap<String, Integer> getDimensions(Map<String, String> data){
        HashMap<String, Integer> dimensions = new HashMap<>();
        if(!data.containsKey(Constant.MATRIX_2_ROWS) && !data.containsKey(Constant.MATRIX_2_COLUMNS)){
            dimensions.put(Constant.MATRIX_1_ROWS, convertInt(data.get(Constant.MATRIX_1_ROWS)));
            dimensions.put(Constant.MATRIX_1_COLUMNS, convertInt(data.get(Constant.MATRIX_1_COLUMNS)));
        } else {
            dimensions.put(Constant.MATRIX_1_ROWS, convertInt(data.get(Constant.MATRIX_1_ROWS)));
            dimensions.put(Constant.MATRIX_1_COLUMNS, convertInt(data.get(Constant.MATRIX_1_COLUMNS)));
            dimensions.put(Constant.MATRIX_2_ROWS, convertInt(data.get(Constant.MATRIX_2_ROWS)));
            dimensions.put(Constant.MATRIX_2_COLUMNS, convertInt(data.get(Constant.MATRIX_2_COLUMNS)));
        }
        return dimensions;
    }

    private static int convertInt(String value){
        int result = 0;
        try{
            result = Integer.valueOf(value);
        }catch(InputMismatchException e){
            System.out.println("convertToInt() ERROR: " + value + " is not an integer");
        }
        return result;
    }

}

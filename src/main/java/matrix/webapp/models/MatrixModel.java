package matrix.webapp.models;

import matrix.webapp.Constant;

import java.util.ArrayList;
import java.util.Map;

public class MatrixModel {

    public static ArrayList<Double[][]> extractMatrices(Map<String, String> data){
        ArrayList<Double[][]> result = new ArrayList<>();

        Double[][] matrix1 = null;
        Double[][] matrix2 = null;
        Integer matrix1Rows = null;
        Integer matrix1Columns = null;
        Integer matrix2Rows = null;
        Integer matrix2Columns = null;
        String operator = data.get("operator");

        if(operator.equals("+") || operator.equals("-")){
            matrix1Rows = Integer.valueOf(data.get(Constant.MATRIX_1_ROWS));
            matrix1Columns = Integer.valueOf(data.get(Constant.MATRIX_1_COLUMNS));
            matrix2Rows = matrix1Rows;
            matrix2Columns = matrix1Rows;
            matrix1 = new Double[matrix1Rows][matrix1Columns];
            matrix2 = new Double[matrix1Rows][matrix1Columns];

        } else if(operator.equals("det")){
            matrix1Rows = Integer.valueOf(data.get(Constant.MATRIX_1_ROWS));
            matrix1Columns = Integer.valueOf(data.get(Constant.MATRIX_1_COLUMNS));
            matrix1 = new Double[matrix1Rows][matrix1Columns];

        } else if(operator.equals("x")){
            matrix1Rows = Integer.valueOf(data.get(Constant.MATRIX_1_ROWS));
            matrix1Columns = Integer.valueOf(data.get(Constant.MATRIX_1_COLUMNS));
            matrix1 = new Double[matrix1Rows][matrix1Columns];

            matrix2Rows = Integer.valueOf(data.get(Constant.MATRIX_2_ROWS));
            matrix2Columns = Integer.valueOf(data.get(Constant.MATRIX_2_COLUMNS));
            matrix2 = new Double[matrix2Rows][matrix2Columns];
        }

        int counter = 0;
        if(matrix1 != null && matrix2 != null){
            counter = 2;
            result.add(matrix1);
            result.add(matrix2);
        } else if(matrix1 != null && matrix2 == null){
            counter = 1;
            result.add(matrix1);
        }
        Integer[] matrixDimensions = {matrix1Rows, matrix1Columns, matrix2Rows, matrix2Columns};
        int i = 1;
        while(i <= counter){
            for(int j = 0; j < matrixDimensions[2 * i - 2]; j++){
                for(int k = 0; k < matrixDimensions[2 * i - 1]; k++){
                    // assigns values to the empty Double[][] array(s) in 'result' variable
                    String value = "matrix" + i + "e" + (j + 1) + (k + 1);
                    result.get(i - 1)[j][k] =  Double.valueOf(data.get(value));
                }
            }
            i++;
        }
        System.out.println("\n\nDATA SERVICE COMPLETE! \n\n"); // todo-REMOVE
        return result;
    }
}

package matrix.webapp.models;

import matrix.webapp.Constant;
import matrix.webapp.services.MatrixService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class MatrixModel {

    /**
     * Extracts matrices from Map, inserts them into a multi-dimensional array and
     * adds the result to an ArrayList which is returned.
     * @param data Map data from client containing matrix values
     * @return An ArrayList of matrices in the form of multi-dimensional Double arrays
     */
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
            matrix2Columns = matrix1Columns;
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
        return result;
    }

    /**
     * Maps matrix values to a HashMap.
     * @param matrix The matrix whose values are to be mapped to a HashMap
     * @return HashMap of matrix values
     */
    public static Map<String, String> convertArrayToMap(MatrixService matrix){
        Map<String, String> result = new HashMap<>();
        double[][] matrixElements = matrix.getMatrix();
        result.put("resultRows", String.valueOf(matrix.getRows()));
        result.put("resultColumns", String.valueOf(matrix.getColumns()));
        for(int i = 0; i < matrix.getRows(); i++){
            for(int j = 0; j < matrix.getColumns(); j++){
                result.put("resulte" + (i + 1 )+ (j + 1), String.valueOf(matrixElements[i][j]));
            }
        }
        return result;
    }

    /**
     * Puts the determinant of a matrix into a HashMap, as a single matrix element (1st row, 1st columns),
     * and returns the HashMap as a Map<String, String>. This method prepares the determinant to be sent to the client
     * as part of the HTTP response body.
     * @param matrix The matrix whose determinant is to be returned.
     * @return A Map containing the matrix determinant.
     */
    public static Map<String, String> convertDetToMap(MatrixService matrix){
        Map<String, String> result = new HashMap<>();
        result.put("resulte11", String.valueOf(matrix.getDeterminant()));
        result.put("resultRows", "1");
        result.put("resultColumns", "1");
        return result;
    }

}

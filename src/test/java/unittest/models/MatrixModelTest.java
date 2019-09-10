package unittest.models;

import matrix.webapp.services.MatrixService;
import matrix.webapp.models.MatrixModel;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class MatrixModelTest {
    private MatrixService testMatrix1;
    private MatrixService testMatrix2;

    @Before
    public void setup(){
        testMatrix1 = new MatrixService("Matrix Model Test Matrix 1 (3x3)", 3, 3);
        testMatrix2 = new MatrixService("Matrix Model Test Matrix 2 (2x2)", 2, 2);
        double[][] matrixOneValues = {{1.0, 0.0, 0.0},
                                      {0.0, 1.0, 0.0},
                                      {0.0, 0.0, 1.0}};
        double[][] matrixTwoValues = {{1.0, 0.0},
                                      {0.0, 1.0}};
        testMatrix1.setMatrix(matrixOneValues);
        System.out.println("======================================================================================");
        testMatrix2.setMatrix(matrixTwoValues);
        System.out.println("======================================================================================");
    }

    @Test
    public void convertArrayToMap(){
        Map<String, String> matrix1Expected = new HashMap<>();
        matrix1Expected.put("resultRows", "3");
        matrix1Expected.put("resultColumns", "3");
        for(int i = 1; i <= 3; i++){
            for(int j = 1; j <= 3; j++ ){
                if(i == j){
                    matrix1Expected.put("resulte" + i + j ,"1.0");
                } else {
                    matrix1Expected.put("resulte" + i + j, "0.0");
                }
            }
        }
        assertEquals(MatrixModel.convertArrayToMap(testMatrix1), matrix1Expected);
    }

    @Test
    public void convertDetToMap(){
        Map<String, String> matrix1Expected = new HashMap<>();
        matrix1Expected.put("resultRows", "1");
        matrix1Expected.put("resultColumns", "1");
        matrix1Expected.put("resulte11", "1.0");
        testMatrix1.calculateDeterminant();
        assertEquals(MatrixModel.convertDetToMap(testMatrix1), matrix1Expected);
    }

}

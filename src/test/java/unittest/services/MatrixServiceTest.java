package unittest.services;

import matrix.webapp.services.MatrixService;
import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

public class MatrixServiceTest {
    private MatrixService testMatrix3x3;
    private MatrixService testMatrix2x2;
    private MatrixService identityMatrix3x3;

    @Before
    public void setup(){
        testMatrix3x3 = new MatrixService("TM3 (3x3 testing matrix)", 3, 3);
        testMatrix2x2 = new MatrixService("TM2 (2x2 testing matrix)", 2, 2);
        identityMatrix3x3 = new MatrixService("Testing Identity Matrix (3x3)", 3, 3);
        double[][] values3x3 = {{1.11, 2.22,  -3.338},
                {4.44, 5.55,  -6},
                {0,    7.77,  -8.88}};
        double[][] values2x2 = {{1.1111, 2.2222},
                {3.3333, -4.4444}};
        double[][] identityMatrixValues3x3 = {{1.0, 0.0, 0.0},
                                              {0.0, 1.0, 0.0},
                                              {0.0, 0.0, 1.0}};
        testMatrix3x3.setMatrix(values3x3);
        System.out.println("======================================================================================");
        testMatrix2x2.setMatrix(values2x2);
        System.out.println("======================================================================================");
        identityMatrix3x3.setMatrix(identityMatrixValues3x3);
        System.out.println("======================================================================================");
    }

    @Test
    public void addMatrices() {
        double[][] expectedResult = {{2.220, 4.440, -6.676},
                                     {8.880, 11.100, -12.000},
                                     {0.000, 15.540, -17.760}};
        assertArrayEquals(testMatrix3x3.addMatrix(testMatrix3x3), expectedResult);
    }

    @Test
    public void subtractMatrices() {
        double[][] expectedResult = {{0.000, 0.000, 0.000},
                                     {0.000, 0.000, 0.000},
                                     {0.000, 0.000, 0.000}};
        assertArrayEquals(testMatrix3x3.subtractMatrix(testMatrix3x3), expectedResult);
    }

    @Test
    public void scalarMultiply() {
        double[][] expectedResult = {{2.220, 4.440, -6.676},
                                     {8.880, 11.100, -12.000},
                                     {0.000, 15.540, -17.760}};
        assertArrayEquals(testMatrix3x3.scalarMultiply(2), expectedResult);
    }

    @Test
    public void dotProduct(){
        double[] vector = {1.1111, 2.2222, 3.3333};
        assertEquals(MatrixService.dotProduct(vector, vector), 17.284, 0);
    }

    @Test
    public void calculateDeterminant() {
        assertEquals(testMatrix3x3.calculateDeterminant(), -30.586, 0);
        assertEquals(identityMatrix3x3.calculateDeterminant(), 1.0, 0);
    }

    @Test
    public void calculate2x2Det() {
        assertEquals(testMatrix2x2.calculate2x2Det(true), -12.345, 0);
    }

    @Test
    public void calculate3x3Det() {
        assertEquals(testMatrix3x3.calculate3x3Det(true), -30.586, 0);
    }

    @Test
    public void extract2x2Matrix() {
        Double[][] minorMatrix1 = {{5.55, -6.0},
                                   {7.77, -8.88}};
        Double[][] minorMatrix2 = {{4.44, -6.0},
                                   {0.0, -8.88}};
        Double[][] minorMatrix3 = {{4.44, 5.55},
                                   {0.0, 7.77}};
        ArrayList<Double[][]> expectedResult = new ArrayList<Double[][]>();
        expectedResult.add(minorMatrix1);
        expectedResult.add(minorMatrix2);
        expectedResult.add(minorMatrix3);
        assertArrayEquals(testMatrix3x3.extract2x2Matrix().toArray(), expectedResult.toArray());
    }

    @Test
    public void findMatrixSize(){
        assertEquals(testMatrix3x3.findMatrixSize(), 3);
    }

    @Test
    public void extractRows(){
        ArrayList<double[]> expectedResult = new ArrayList<double[]>();
        double[] row1 = {1.11, 2.22, -3.338};
        double[] row2 = {4.44, 5.55, -6.0};
        double[] row3 = {0.0, 7.77, -8.88};
        expectedResult.add(row1);
        expectedResult.add(row2);
        expectedResult.add(row3);
        assertArrayEquals(testMatrix3x3.extractRows().toArray(), expectedResult.toArray());
    }

    @Test
    public void extractColumns(){
        ArrayList<double[]> expectedResult = new ArrayList<double[]>();
        double[] column1 = {1.11, 4.44, 0.0};
        double[] column2 = {2.22, 5.55, 7.77};
        double[] column3 = {-3.338, -6.0, -8.88};
        expectedResult.add(column1);
        expectedResult.add(column2);
        expectedResult.add(column3);
        assertArrayEquals(testMatrix3x3.extractColumns().toArray(), expectedResult.toArray());
    }

    @Test
    public void multiply(){
        double[][] expectedResult = {{11.089, -11.151, 12.616},
                                     {29.570, -5.961, 5.159},
                                     {34.499, -25.874, 32.234}};
        assertArrayEquals(testMatrix3x3.multiply(testMatrix3x3), expectedResult);
    }
}

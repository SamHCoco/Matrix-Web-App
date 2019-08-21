package matrix.webapp.services;

import java.text.DecimalFormat;
import java.util.ArrayList;

public final class MatrixService {

    private int rows; // user input for number of rows
    private int columns; // user input for number of columns
    private double[][] matrix; // user created matrix
    private String name; // name of user created matrix instance
    private double determinant; // determinant of user matrix


    /**
     * Constructor for performing unit tests.
     * @param name Name of the matrix
     * @param rows Rows of the matrix
     * @param columns Columns of the matrix
     * @param unitTesting True if unit testing is being carried out, false otherwise
     */
    public MatrixService(String name, int rows, int columns, boolean unitTesting){
        this.name = name;
        this.rows = rows;
        this.columns = columns;
    }


    /**
     * Constructor for user to work with.
     * @param name The name of the matrix
     * @param rows The number of rows in matrix
     * @param columns The number of columns in matrix
     */
    public MatrixService(String name, int rows, int columns){
        this(name, rows, columns, false);
    }


    /**
     * This overloaded method for use in the unit testing class only.
     * Sets up a matrix for unit testing so matrix values don't have to be typed in with scanner.
     * @param m the matrix that will be tested
     */
    public void setMatrix(double[][] m){
        matrix = m;
        System.out.println("MATRIX " + name + ":");
        printMatrix();
    }

    /**
     * Prints the user inputted matrix, with every element rounded to 3 d.p.
     */
    public void printMatrix(){
        for(int i = 0; i < matrix.length; i++){
            for(int j = 0; j < matrix[rows - 1].length; j++){ // [rows - 1] since index starts at 0
                System.out.printf("%8.3f",matrix[i][j]);
            }
            System.out.println();
        }
    }

    /**
     * Adds two matrices and prints the result to the console.
     * @param x NxN (N >= 1) matrix to be added to matrix (NxN)
     */
    public double[][] addMatrix(MatrixService x){
        double[][] addedMatrix; // final result
        if(x.rows == rows && x.columns == columns){
            addedMatrix = new double[matrix.length][matrix.length];

            for(int i = 0; i < matrix.length; i++){
                for(int j = 0; j < matrix.length; j++){
                    addedMatrix[i][j] = formatTo3DP(x.matrix[i][j] + matrix[i][j]);
                }
            }
            System.out.println("ADDED MATRIX: " + name + " + " + x.name);
            matrix = addedMatrix;
            printMatrix();
            return matrix;
        } else {
            System.out.println("ADDITION ERROR: Matrix " + name + " and " + x.name + " must be " + rows + "x" + columns);
            return null;
        }
    }

    /**
     * Subtracts two matrices and prints the result to the console.
     * @param x NxN (N >= 1) matrix to be subtracted from matrix (NxN)
     */
    public double[][] subtractMatrix(MatrixService x){
        if(x.rows == rows && x.columns == columns){
            double[][] subtractedMatrix  = new double[matrix.length][matrix.length];

            for(int i = 0; i < x.matrix.length; i++){
                for(int j = 0; j < x.matrix.length; j++){
                    subtractedMatrix[i][j] = formatTo3DP(x.matrix[i][j] - matrix[i][j]);
                }
            }
            System.out.println("SUBTRACTION RESULT: " + x.name + " - " + name);
            matrix = subtractedMatrix;
            return matrix;
        } else {
            System.out.println("SUBTRACTION ERROR: Matrix " + name + " and " + x.name + " must be the same size.");
            return null;
        }
    }

    /**
     * Scalar multiply matrix.
     * @param scalar Multiplies every element in matrix
     */
    public double[][] scalarMultiply(double scalar){
        for(int i = 0; i < rows; i++){
            for(int j = 0; j < columns; j++){
                matrix[i][j] = formatTo3DP(scalar * matrix[i][j]);
            }
        }
        System.out.println("SCALAR MULTIPLICATION RESULT: " + scalar + " * " + name);
        printMatrix();
        return matrix;
    }

    /**
     * Multiplies matrix by another matrix, x.
     * @param x The matrix to multiply by
     * @return The resultant matrix of multiplying matrix by x.
     */
    public Double[][] multiply(MatrixService x){
        // Checks matrices have correct dimensions for multiplying
        if(columns == x.rows){
            Double[][] result = new Double[rows][x.columns];
            ArrayList<double[]> matrixRows = extractRows();
            ArrayList<double[]> xMatrixColumns = x.extractColumns();
            // calculates final solution
            for(int i = 0; i < matrixRows.size(); i++){
                for(int j = 0; j < xMatrixColumns.size(); j++){
                    result[i][j] = dotProduct(matrixRows.get(i), xMatrixColumns.get(j));
                }
            }
            // displays result to user
            System.out.println("MULTIPLICATION RESULT: " + name + " * " + x.name);
            double[][] originalMatrix = matrix;
            matrix = doubleArrayUnboxer(result);
            printMatrix();
            matrix = originalMatrix;
            return result;
        }
        return null;
    }

    /**
     * Calls determinant calculation method and prints result.
     */
    public double calculateDeterminant(){
        int size = findMatrixSize();
        switch(size){
            case 2:
                determinant = calculate2x2Det(false);
                System.out.println("\nMatrix " + name + " Determinant = " + determinant);
                break;
            case 3:
                determinant = calculate3x3Det(false);
                System.out.println("\nMatrix " + name + " Determinant = " + determinant);
                break;
        }
        return formatTo3DP(determinant);
    }

    /**
     * Calculates the determinant of a 2x2 matrix
     * @param unitTesting For conducting unit testing (getting result to 3 d.p). Set to true if unit testing, or
     * false otherwise. Method used for calculating 3x3 determinants, so result should not be rounded in those cases.
     * @return Determinant of a 2x2 matrix (not rounded) for unitTesting = false, determinant rounded to 3 dp if
     * unitTesting = true.
     */
    public double calculate2x2Det(boolean unitTesting){
        if(unitTesting){
            return formatTo3DP(matrix[1][1] * matrix[0][0] - matrix[1][0] * matrix[0][1]);
        } else {
            return matrix[1][1] * matrix[0][0] - matrix[1][0] * matrix[0][1];
        }
    }

    /**
     * Calculates the determinant of a 3x3 matrix and returns the result
     * @return -- Determinant of a 3x3 matrix
     */
    public double calculate3x3Det(boolean unitTesting){
        double determinant = 0;
        ArrayList<Double[][]> minorMatrices = extract2x2Matrix();
        int element = 0;
        double[][] minorMatrix = new double[2][2];
        double[][] userMatrix = matrix;
        while(element < 3){
            for(int i = 0; i < 2; i++){
                for(int j = 0; j < 2; j++){
                    minorMatrix[i][j] = minorMatrices.get(element)[i][j];
                }
            }
            matrix = minorMatrix;
            determinant +=  Math.pow(-1, element + 2) * userMatrix[0][element] * calculate2x2Det(false);
            element++;
        }
        matrix = userMatrix;
        if(!unitTesting){
            return determinant;
        } else {
            return formatTo3DP(determinant);
        }
    }

    /**
     * Determines whether a matrix is of size 2x2 or 3x3.
     * @return 2 if matrix is 2x2, 3 if matrix 3x3 or -1 if the matrix is neither.
     */
    public int findMatrixSize(){
        if(rows == 2 && columns == 2){
            return 2;
        } else if(rows == 3 && columns == 3){
            return 3;
        }
        else {
            return -1;
        }
    }

    /**
     * Extracts the minor matrices for the top row of a 3x3 matrix.
     * @return 3 minor matrices
     */
    public ArrayList<Double[][]> extract2x2Matrix(){
        int iteration = 1;
        ArrayList<Double[][]> cofactorMatrices = new ArrayList<Double[][]>();
        do{
            Double[][] extractedMatrix = new Double[2][2];
            for(int i = 0; i < matrix.length - 1; i++ ){
                for(int j = 0; j < matrix.length - 1; j++){
                    if(iteration == 1){
                       extractedMatrix[i][j] = matrix[i+1][j+1];
                    }else if(iteration == 2){
                        if(j == 1){
                            extractedMatrix[i][j] = matrix[i+1][j+1];
                        } else {
                            extractedMatrix[i][j] = matrix[i+1][j];
                        }
                    } else if(iteration == 3){
                        extractedMatrix[i][j] = matrix[i+1][j];
                    }
                }
            }
            cofactorMatrices.add(extractedMatrix);
            iteration++;
        } while(iteration <= 3 );
    return cofactorMatrices;
    }

    /**
     * Converts 2D Double array to double primitive type
     * @param array Double array (2D) to be converted
     * @return primitive type 2D double array
     */
    public static double[][] doubleArrayUnboxer(Double[][] array){
        double[][] unBoxedArray = new double[array.length][array[0].length];
        for(int i = 0; i < array.length; i++){
            for(int j = 0; j <array[0].length; j++){
                unBoxedArray[i][j] = array[i][j];
            }
        }
        return unBoxedArray;
    }

    /**
     * Formats given number to 3 d.p
     * @param value The value to be formatted to 3 d.p.
     * @return Value formatted to 3 d.p.
     */
    public static double formatTo3DP(double value){
        DecimalFormat df = new DecimalFormat(".000");
        return Double.valueOf(df.format(value));
    }

    /**
     * Extracts all the rows of matrix
     * @return the rows of matrix
     */
    public ArrayList<double[]> extractRows(){
        ArrayList<double[]> allRows = new ArrayList<double[]>();
        for(int i = 0; i < rows; i++){
            double[] row = new double[columns];
            for(int j = 0; j < columns; j++){
                row[j] = matrix[i][j];
            }
            // adds row to allRows variable
            allRows.add(row);
        }
        return allRows;
    }

    /**
     * Extracts all the columns of matrix.
     * @return the columns of matrix
     */
    public ArrayList<double[]> extractColumns(){
        ArrayList<double[]> allColumns = new ArrayList<double[]>();
        for(int j = 0; j < columns; j++){
            double[] column = new double[rows];
            for(int i = 0; i < rows; i++){
                column[i] = matrix[i][j];
            }
            // adds column to allColumns variable
            allColumns.add(column);
        }
        return allColumns;
    }

    /**
     * Calculates the dot product of two vectors.
     * @param rowVector the row vector
     * @param columnVector the column vector
     * @return dot product, or null if the input vectors are unequal in size
     */
    public static Double dotProduct(double[] rowVector, double[] columnVector){
        if(rowVector.length == columnVector.length){
            double dotProduct = 0;
            for(int i = 0; i < rowVector.length; i++){
                dotProduct += rowVector[i] * columnVector[i];
            }
            return formatTo3DP(dotProduct);
        } else {
            System.out.println("DOT PRODUCT ERROR: Vectors must be equal size");
            return null;
        }
    }
}

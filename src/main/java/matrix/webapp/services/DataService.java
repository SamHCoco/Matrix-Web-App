package matrix.webapp.services;

import matrix.webapp.models.MatrixSizeModel;

import java.util.HashMap;

public final class DataService {

    private HashMap<String, Double> matrixElements;
    private HashMap<String, Double[][]> data;
    private MatrixSizeModel matrixSize;

    public DataService(HashMap<String, Double> matrixElements, MatrixSizeModel matrixSize){
        this.matrixElements = matrixElements;
        this.matrixSize = matrixSize;
    }

    public HashMap<String, Double[][]> getMatrices(){
        if(matrixSize.getMatrix2Columns() == 0 && matrixSize.getMatrix2Rows() == 0){
            System.out.println("stuff");
        }
        return null;
    }

}

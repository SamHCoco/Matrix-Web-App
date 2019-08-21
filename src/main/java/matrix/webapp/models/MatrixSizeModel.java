package matrix.webapp.models;

public class MatrixSizeModel {

    private int matrix1Rows;
    private int matrix1Columns;
    private int matrix2Rows;
    private int matrix2Columns;

    public void setMatrix1Rows(int matrix1Rows){
        this.matrix1Rows = matrix1Rows;
    }

    public void setMatrix2Rows(int matrix2Rows){
        this.matrix2Rows = matrix2Rows;
    }

    public void setMatrix1Columns(int matrix1Columns){
        this.matrix1Columns = matrix1Columns;
    }

    public void setMatrix2Columns(int matrix2Columns){
        this.matrix2Columns = matrix2Columns;
    }

    public int getMatrix1Rows(){
        return matrix1Rows;
    }

    public int getMatrix2Rows(){
        return matrix2Rows;
    }

    public int getMatrix1Columns(){
        return matrix1Columns;
    }

    public int getMatrix2Columns(){
        return matrix2Columns;
    }
}

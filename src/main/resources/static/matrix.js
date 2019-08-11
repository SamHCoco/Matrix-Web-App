var oldMatrix = []; // the size of the previous inputted matrix to be deleted
var isMatrix1Created = false; // whether matrix 1 has been initialized or not
var isMatrix2Created = false; // whether matrix 2 has been initialized or not
var isOperatorSet = false; // whether an operator has been selected or not
var styleValue;
var allButtonIds = ["addBtn", "subtractBtn", "multiplyBtn", "DeterminantBtn"];

// Function for user to submit dimensions of matrix on clicking 'Enter' button
function submitDimensions() {
    rows = document.getElementById('rows').value;
    columns = document.getElementById('columns').value;
    oldMatrix.push(rows);
    oldMatrix.push(columns);
    // creates matrix input prompt display
    var matrix;
    if(!isMatrix1Created){
        matrix = "matrix1";
    } else if(!isMatrix2Created){
        if(isOperatorSet){
            matrix = "matrix2";
//            var matrix2Display = document.getElementById("matrix2Display");
//            styleValue =  oldMatrix[1] * 120 + "px";
//            matrix2Display.style.left = styleValue;
        } else {
            console.log("ERROR: A MATRIX OPERATOR MUST BE SELECTED");
        }
    }
    if(!isMatrix1Created || !isMatrix2Created && isOperatorSet){
        console.log(matrix + " BEING GENERATED"); // todo- remove this line
        var displayDiv = document.getElementById(matrix + "Display");
        for(var i = 1; i <= rows; i++){
            for(var j = 1; j <= columns; j++){
               var elementInput = document.createElement('input');
               elementInput.setAttribute('type', 'number');
               elementInput.setAttribute('id', matrix + "e" + i + j);
               elementInput.setAttribute('class', 'elementInput');
               elementInput.setAttribute('min', '1');
               displayDiv.appendChild(elementInput);
            }
            var nextLine = document.createElement('br');
            nextLine.setAttribute('id', 'br' + i);
            displayDiv.appendChild(nextLine);
        }
        if(!isMatrix1Created){
            isMatrix1Created = true;
        } else if(!isMatrix2Created && isOperatorSet){
            isMatrix2Created = true;
        }
    }
}

// todo- fix null bug in line 83 of setOperator
// displays and sets operator when user clicks operator buttons
function setOperator(clickedOperatorId){
    console.log("clicked id: " + clickedOperatorId); //  todo-remove this line
    var operatorDisplay = null;
    if(clickedOperatorId == "addBtn"){
        if(isMatrix1Created && !isMatrix2Created){
            operatorDisplay = document.createTextNode("+");
        }
    } else if(clickedOperatorId == "subtractBtn"){
        if(isMatrix1Created && !isMatrix2Created){
            operatorDisplay = document.createTextNode("-");
        }
    } else if(clickedOperatorId == "multiplyBtn"){
        if(isMatrix1Created){
            operatorDisplay = document.createTextNode("x");
        }
    } else if(clickedOperatorId == "determinantBtn"){
        if(!isMatrix1Created && !isMatrix2Created){
            operatorDisplay = document.createTextNode("DET");
            var matrix1Display = document.getElementById("matrix1Display");
            styleValue =  "115px";
            matrix1Display.style.left = styleValue;
        }
    }
    isOperatorSet = true;
    // creates 2nd matrix of same size as 1st, for add and subtract calculations
    if(clickedOperatorId == "addBtn" || clickedOperatorId == "subtractBtn"){
        submitDimensions();
    }
    if(operatorDisplay != null){
        document.getElementById("operatorDisplay").appendChild(operatorDisplay);
        disableButtons(true, allButtonIds);
    } else {
        console.log("setOperator() ERROR: operatorDisplay is null"); //todo-remove this line
    }
}

// Disables or enables buttons using an array of button IDs passed as an argument and a boolean
// argument of true (to disable) or false (to enable)
function disableButtons(boolean, buttonIds){
    var i = 0;
    while(i < buttonIds.length){
        var button = document.getElementById(buttonIds[i]);
        if(boolean == true){
            button.disabled = true;
        } else if(boolean == false){
            button.disabled = false;
        }
        i++;
    }
}

function clearScreen(){
    deleteMatrix();
    deleteMatrix();
    document.getElementById("rows").value = "";
    document.getElementById("columns").value = "";
}

function deleteMatrix(){
    var matrix;
    var rows;
    var columns;
    var display;

    if(isMatrix1Created || isMatrix2Created){
        if(isMatrix2Created){
            matrix = "matrix2";
        } else if(isMatrix1Created){
            matrix = "matrix1";
        }
        display = document.getElementById(matrix + "Display");
        if(display.id == "matrix2Display"){
          rows = oldMatrix[2];
          columns = oldMatrix[3];
        } else if(display.id == "matrix1Display"){
          rows = oldMatrix[0];
          columns = oldMatrix[1];
        }
        oldMatrix.pop();
        oldMatrix.pop();
        for(var i = 1; i <= rows; i++){
            for(var j = 1; j <= columns; j++){
                console.log("deleteMatrix(" + matrix + ") - DELETING: " + matrix + "e" + i + j); //todo-remove this line
                var child = document.getElementById(matrix + "e" + i + j);
                display.removeChild(child);
            }
        }
        if(matrix == "matrix2"){
            isMatrix2Created = false;
        } else if(matrix == "matrix1"){
            isMatrix1Created = false;
        }
    }
}
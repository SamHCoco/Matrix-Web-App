var oldMatrix = []; // the size of the previous inputted matrix to be deleted
var isMatrix1Created = false; // whether matrix 1 has been initialized or not
var isMatrix2Created = false; // whether matrix 2 has been initialized or not
var isOperatorSet = false; // whether an operator has been selected or not
var allButtonIds = ["addBtn", "subtractBtn", "multiplyBtn", "determinantBtn"];

function createMatrix(){
    var matrix;
    var rows = document.getElementById('rows').value;
    var columns = document.getElementById('columns').value;

    if(rows == "" || columns == ""){
        console.log("ERROR: createMatrix() INPUT CANNOT BE EMPTY");
        return null;
    }
    try{
        rows = parseInt(rows);
        columns = parseInt(columns);
        if(rows <= 0 || columns <= 0){
            console.log("ERROR: createMatrix() MATRIX SIZE INPUT MUST BE POSITIVE");
            return null;
        }else if(rows > 0 && columns > 0){
            console.log("createMatrix(): ROWS AND COLUMNS SUCCESSFULLY PARSED AS INT");
        }
    } catch(err){
        console.log("ERROR: createMatrix() COULD NOT PARSE INPUT AS INT");
    }
    if(!isMatrix1Created){
        matrix = "matrix1";
    } else if(!isMatrix2Created){
        if(isOperatorSet){
            matrix = "matrix2";
        } else {
            console.log("ERROR: A MATRIX OPERATOR MUST BE SELECTED");
        }
    }
    if(!isMatrix1Created || !isMatrix2Created && isOperatorSet){
        console.log(matrix + " BEING GENERATED"); // todo- remove this line
        oldMatrix.push(rows);
        oldMatrix.push(columns);
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
            nextLine.setAttribute('id', matrix + 'br' + i);
            displayDiv.appendChild(nextLine);
        }
        if(!isMatrix1Created){
            isMatrix1Created = true;
        } else if(!isMatrix2Created && isOperatorSet){
            isMatrix2Created = true;
        }
    }
}

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
        }
    }
    try{
        if(operatorDisplay != null){
            document.getElementById("operatorDisplay").appendChild(operatorDisplay);
            isOperatorSet = true;
            var operatorBtnIds = [];
            for(var i = 0; i < allButtonIds.length; i++ ){
                if(allButtonIds[i] != clickedOperatorId){
                    operatorBtnIds.push(allButtonIds[i]);
                }
            }
            var clickedBtn = document.getElementById(clickedOperatorId);
            clickedBtn.style.backgroundColor = "green";
            disableButtons(true, operatorBtnIds);
        } else {
            console.log("setOperator() ERROR: operatorDisplay is null"); //todo-remove this line
        }
    } catch {
        console.log("ERROR: setOperator() error");
    }
    if(clickedOperatorId == "addBtn" || clickedOperatorId == "subtractBtn"){
            createMatrix();
    }
}

function disableButtons(boolean, buttonIds){
    console.log("disableButtons() - EXECUTING"); // todo-remove
    var i = 0;
    while(i < buttonIds.length){
        var button = document.getElementById(buttonIds[i]);
        if(boolean == true){
            button.disabled = true;
            button.style.backgroundColor = "silver";
            console.log(buttonIds[i] + " DISABLED"); // todo-remove
        } else if(boolean == false){
            button.disabled = false;
            button.style.borderColor = "white";
            console.log(buttonIds[i] + " ENABLED"); // todo-remove
        }
        i++;
    }
}

function clearScreen(){
    deleteOperator();
    deleteMatrix();
    deleteMatrix();
    document.getElementById("rows").value = "";
    document.getElementById("columns").value = "";
    disableButtons(false, allButtonIds);
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
            var brElement = document.getElementById(matrix + "br" + i);
            display.removeChild(brElement);
        }
        if(matrix == "matrix2"){
            isMatrix2Created = false;
        } else if(matrix == "matrix1"){
            isMatrix1Created = false;
        }
    }
}

function deleteOperator(){
    try{
        if(isOperatorSet && isMatrix1Created && !isMatrix2Created){
            var operatorDisplay = document.getElementById("operatorDisplay");
            operatorDisplay.innerHTML = "";
            isOperatorSet = false;
            return true;
        } else {
            return false;
        }
    } catch(err){
        console.log("ERROR: deleteOperator() error");
    }
}

function deleteButton(){
    if(!deleteOperator()){
        deleteMatrix();
    } else {
        disableButtons(false, allButtonIds);
    }
}

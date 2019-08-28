var oldMatrix = []; // the size of the previous inputted matrix to be deleted
var isMatrix1Created = false; // whether matrix 1 has been initialized or not
var isMatrix2Created = false; // whether matrix 2 has been initialized or not
var isMatrix3Created = false; // whether matrix 3 (the result matrix) has been initialised
var isOperatorSet = false; // whether an operator has been selected or not
var allButtonIds = ["addBtn", "subtractBtn", "multiplyBtn", "determinantBtn"];
var largestRows = null; // largest row of the 2 matrices inputted by user, to be used to optimize matrix display
var operator = null; // stores operator

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
        optimizeDisplayRegion(rows);
        oldMatrix.push(rows);
        oldMatrix.push(columns);
        var displayDiv = document.getElementById(matrix + "Display");
        for(var i = 1; i <= rows; i++){
            for(var j = 1; j <= columns; j++){
               var elementInput = document.createElement('input');
               elementInput.setAttribute('type', 'number');
               elementInput.setAttribute('id', matrix + 'e' + i + j);
               elementInput.setAttribute('name', matrix + 'e' + i + j);
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
            operator = "+";
        }
    } else if(clickedOperatorId == "subtractBtn"){
        if(isMatrix1Created && !isMatrix2Created){
            operatorDisplay = document.createTextNode("-");
            operator = "-";
        }
    } else if(clickedOperatorId == "multiplyBtn"){
        if(isMatrix1Created){
            operatorDisplay = document.createTextNode("x");
            operator = "x";
        }
    } else if(clickedOperatorId == "determinantBtn"){
        if(!isMatrix1Created && !isMatrix2Created){
            operatorDisplay = document.createTextNode("DET");
            operator = "det";
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
        if(isMatrix1Created){
            createMatrix();
        }
    }
}

function optimizeDisplayRegion(matrixRows){
    var displayRegion = document.getElementById("matrixDisplay");
    if(largestRows == null){
        largestRows = matrixRows;
    } else {
        if(matrixRows > largestRows){
            largestRows = matrixRows;
        }
    }
    displayRegion.style.height = (80 * largestRows) + "px";
}

function disableButtons(boolean, buttonIds){
    var i = 0;
    while(i < buttonIds.length){
        var button = document.getElementById(buttonIds[i]);
        if(boolean == true){
            button.disabled = true;
            button.style.backgroundColor = "silver";
        } else if(boolean == false){
            button.disabled = false;
            button.style.backgroundColor = "DodgerBlue";
        }
        i++;
    }
}

function clearScreen(){
    deleteButton();
    deleteButton();
    deleteButton();
    deleteButton();
    document.getElementById("rows").value = "";
    document.getElementById("columns").value = "";
    largestRows = null;
}

function deleteMatrix(){
    var matrix;
    var rows;
    var columns;
    var display;

    if(isMatrix1Created || isMatrix2Created || isMatrix3Created){
        if(isMatrix3Created){
            matrix = "matrix3";
        } else if(isMatrix2Created){
            matrix = "matrix2";
        } else if(isMatrix1Created){
            matrix = "matrix1";
        }
        display = document.getElementById(matrix + "Display");
        if(display.id == "matrix3Display"){
            rows = oldMatrix[4];
            columns = oldMatrix[5];
        } else if(display.id == "matrix2Display"){
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
        // sets variable back to default value
        if(matrix == "matrix3"){
            isMatrix3Created = false;
            document.getElementById("equalsDisplay").innerHTML = "";
        } else if(matrix == "matrix2"){
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
            operator = null;
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
    resetDisplay();
}

function resetDisplay(){
    if(!isMatrix1Created && !isMatrix2Created){
        var displayRegion = document.getElementById("matrixDisplay");
        displayRegion.style.height = "150px";
    }
}

// Displays results from server to the screen
function displayResult(result){
    var matrix3Display = document.getElementById("matrix3Display");
    document.getElementById("equalsDisplay").innerHTML = "=";
    var rows = result["resultRows"];
    var columns = result["resultColumns"];
    oldMatrix.push(rows);
    oldMatrix.push(columns);
    for(var i = 1; i <= rows; i++){
        for(var j = 1; j <= columns; j++){
            var resultElement = document.createElement('input');
            resultElement.setAttribute('class', 'result-input');
            resultElement.setAttribute('value', result["resulte" + i + j]);
            resultElement.setAttribute('id', "matrix3e" + i + j);
            resultElement.setAttribute('disabled', true);
            matrix3Display.appendChild(resultElement);
        }
        var nextLine = document.createElement('br');
        nextLine.setAttribute('id', 'matrix3' + 'br' + i);
        matrix3Display.appendChild(nextLine);
    }
    isMatrix3Created = true;
}

$(function (){
    $("#goBtn").on("click", function(event){
        if(isMatrix1Created && isMatrix2Created && isOperatorSet || isMatrix1Created && operator == "det"){
            event.preventDefault();
            console.log("Ajax() EXECUTED"); // todo - REMOVE
            var data = {
              operator : operator,
              matrix1Rows : oldMatrix[0],
              matrix1Columns: oldMatrix[1],
              matrix2Rows: oldMatrix[2],
              matrix2Columns: oldMatrix[3]
            };
            var counter = 0;
            if(isMatrix2Created && isMatrix1Created){
                counter = 2;
            } else if(isMatrix1Created && !isMatrix2Created){
                counter = 1;
            }
            var i = 1;
            while(i <= counter){
                for(var j = 1; j <= oldMatrix[2*i-2]; j++){
                    for(var k = 1; k <= oldMatrix[2*i-1]; k++){
                        data["matrix" + i + "e" + j + k] = $("#matrix" + i + "e" + j + k).val();
                        console.log("matrix" + i + "e" + j + k + " = " +  data["matrix" + i + "e" + j + k]); // todo-REMOVE
                    }
                }
                i++;
            }
            $.ajax({
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
              type: "POST",
              url: "",
              dataType: "json",
              data: JSON.stringify(data) ,
              success: function(resultData){
                console.log("AJAX SUCCESS"); //todo - REMOVE
                var receivedData = JSON.parse(JSON.stringify(resultData));
                console.log("RESULT: " + receivedData); // todo - REMOVE
                displayResult(receivedData);
              },
              error: function(){
                console.log("AJAX error!");
              }
            });
        } else {
            console.log("GO! ERROR: NO CALCULATION VALUES GIVEN!"); // todo - REMOVE
        }
    });
});

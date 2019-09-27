var oldMatrix = []; // the size of the previous inputted matrix to be deleted
var isMatrix1Created = false; // whether matrix 1 has been initialized or not
var isMatrix2Created = false; // whether matrix 2 has been initialized or not
var isMatrix3Created = false; // whether matrix 3 (the result matrix) has been initialised
var isOperatorSet = false; // whether an operator has been selected or not
var allButtonIds = ["addBtn", "subtractBtn", "multiplyBtn", "determinantBtn"];
var largestRows = null; // largest row of the 2 matrices inputted by user, to be used to optimize matrix display
var operator = null; // stores operator
var m1BiggestCharCount = -1; // stores the largest amount of characters possessed by any input field in matrix 1 display
var m2BiggestCharCount = -1; // stores the largest amount of characters possessed by any input field in matrix 2 display
var m3BiggestCharCount = -1; // stores the largest amount of characters possessed by any input field in matrix 2 display

/** Generates and displays empty matrices*/
function createMatrix(){
    var matrix;
    var rows;
    var columns;

    if(isMatrix1Created && !isMatrix2Created){
        if(operator == "+" || operator == "-"){
           rows = oldMatrix[0];
           columns = oldMatrix[1];
        }
    } else {
        var row = document.getElementById("rows");
        var column = document.getElementById("columns");
        rows = row.value;
        columns = column.value;
        row.value = "";
        column.value = "";
    }

    if(rows == "" || columns == ""){
        console.log("ERROR: createMatrix() rows/columns INPUT CANNOT BE EMPTY"); // todo - REMOVE
        return null;
    }

    try{
        rows = parseInt(rows);
        columns = parseInt(columns);
        if(rows <= 0 || columns <= 0){
            console.log("ERROR: createMatrix() MATRIX SIZE INPUT MUST BE POSITIVE"); // todo - REMOVE
            return null;
        }
        if(rows > 6){
            console.log("Matrix rows must be less than or equal to 6"); // todo - REMOVE
            return;
        }
        if(columns > 6){
            console.log("Matrix columns must be less than or equal to 6"); // todo - REMOVE
            return;
        }
    } catch(error){
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
        if(!detIsSizeValid()){
            return;
        }
        optimizeDisplayRegion(rows);
        var displayDiv = document.getElementById(matrix + "Display");
        for(var i = 1; i <= rows; i++){
            for(var j = 1; j <= columns; j++){
               var elementInput = document.createElement("input");
               elementInput.setAttribute("type", "number");
               elementInput.setAttribute("id", matrix + "e" + i + j);
               elementInput.setAttribute("name", matrix + "e" + i + j);
               elementInput.setAttribute("min", "0.00000001");
               elementInput.setAttribute("max", "9999999");
               elementInput.setAttribute("oninput", "resizeInputFields(this.id)");
               elementInput.setAttribute("onkeydown", "isInputInValidRange(this.id, event)");
               if(matrix == "matrix1"){
                 elementInput.setAttribute('class', 'element-input1');
               } else if(matrix == "matrix2"){
                 elementInput.setAttribute('class', 'element-input2');
               }
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

/** Changes border colour of matrix size input fields when they're focus */
function onSizeInputFocus(id){
    document.getElementById(id).style.borderColor = "SpringGreen";
}

/** Changes border colour of matrix size input fields when they're out of focus */
function onSizeInputBlur(id){
    document.getElementById(id).style.borderColor = "white";
}

/** Handles 'Enter' and 'del' keyboard buttons being pressed.
 */
addEventListener("keyup", function(event){
    if(event.key ==  "Delete"){
        deleteButton();
    } else if(event.key == "Enter"){
        var rowsInput = document.getElementById("rows");
        var columnsInput = document.getElementById("columns");
        if(rowsInput.value == ""){
            rowsInput.focus();
        } else if(columnsInput.value == ""){
            columnsInput.focus();
        }
        if(rowsInput.value != "" && columnsInput.value != ""){
            document.getElementById("enterBtn").click();
            rowsInput.focus();
        }
    }
});

/** Restricts numerical size of user's input into matrix to a valid range */
function isInputInValidRange(id, event){
    var value = document.getElementById(id).value;
    if(value == ""){
        return;
    }
    if(value < -9_999_99 || value > 9_999_999){
        console.log("INPUT WAS TO SMALL OR TOO BIG"); // todo - REMOVE
        event.preventDefault();
        var length = value.length;
        document.getElementById(id).value = value.slice(0, length - 1);
    }
}

/** Resizes input fields as user types values */
function resizeInputFields(id){
    var inputElement = document.getElementById(id);
    var inputValue = inputElement.value;
    var length = inputValue.length;
    var inputClass;
    var biggestCharLength;

    if(id.slice(0, 7) == "matrix1"){
        inputClass = "element-input1";
        if(length > m1BiggestCharCount){
            m1BiggestCharCount = length;
        }
        biggestCharLength = m1BiggestCharCount;
        console.log("element-input1 SELECTED"); // todo - REMOVE
    } else if(id.slice(0, 7) == "matrix2"){
        inputClass = "element-input2";
        if(length > m2BiggestCharCount){
            m2BiggestCharCount = length;
        }
        biggestCharLength = m2BiggestCharCount;
        console.log("element-input2 SELECTED"); // todo - REMOVE
    } else if(id.slice(0, 7) == "matrix3"){
        inputClass = "element-input3";
        if(length > m3BiggestCharCount){
            m3BiggestCharCount = length;
        }
        biggestCharLength = m3BiggestCharCount;
        console.log("element-input3 SELECTED"); // todo - REMOVE
    }
    if(length >= biggestCharLength){
        if(length > 3 && length <= 9){
            var matrixDisplay = document.getElementById("matrixDisplay");
            var elementInputs = matrixDisplay.getElementsByClassName(inputClass);
            for (var i = 0; i < elementInputs.length; i++) {
                elementInputs[i].style.width = (length * 20 - (length * 20 * 0.15)) + "px";
            }
            biggestCharLength = length;
        }
    }
}

/**
* Handles user selecting operator.
*  @param {string} clickedOperatorId The ID of the operator user clicked on.
*/
function setOperator(clickedOperatorId){
    var operatorDisplay = null;
    if(clickedOperatorId == "addBtn"){
        if(isMatrix1Created && !isMatrix2Created && !isOperatorSet){
            operatorDisplay = document.createTextNode("+");
            operator = "+";
        }
    } else if(clickedOperatorId == "subtractBtn"){
        if(isMatrix1Created && !isMatrix2Created && !isOperatorSet){
            operatorDisplay = document.createTextNode("-");
            operator = "-";
        }
    } else if(clickedOperatorId == "multiplyBtn"){
        if(isMatrix1Created && !isOperatorSet){
            operatorDisplay = document.createTextNode("x");
            operator = "x";
        }
    } else if(clickedOperatorId == "determinantBtn"){
        if(!isMatrix1Created && !isMatrix2Created && !isOperatorSet){
            operatorDisplay = document.createTextNode("DET");
            operator = "det";
        }
    }

    try{
        if(operatorDisplay != null){
            if(operator == "det"){
                document.getElementById("detOperatorDisplay").appendChild(operatorDisplay);
            } else {
                document.getElementById("operatorDisplay").appendChild(operatorDisplay);
            }
            isOperatorSet = true;
            var operatorBtnIds = [];
            for(var i = 0; i < allButtonIds.length; i++ ){
                if(allButtonIds[i] != clickedOperatorId){
                    operatorBtnIds.push(allButtonIds[i]);
                }
            }
            var clickedBtn = document.getElementById(clickedOperatorId);
            clickedBtn.style.color = "SpringGreen";
            clickedBtn.style.borderColor = "SpringGreen";
            disableButtons(true, operatorBtnIds);
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

/**
* Sizes matrix display region to fit matrix being created.
*  @param {number} matrixRows The rows of the matrix that is created.
*/
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

/**
* Disables/enables buttons specified
*  @param {boolean} boolean True to disable buttons, false to enable.
*  @param {String[]} buttonIds The IDs of buttons to be enabled/disabled.
*/
function disableButtons(boolean, buttonIds){
    var i = 0;
    while(i < buttonIds.length){
        var button = document.getElementById(buttonIds[i]);
        if(boolean == true){
            button.disabled = true;
            button.style.color = "gold"; // silver shade #b3b3b3
            button.style.borderColor = "gold" // silver shade
        } else if(boolean == false){
            button.disabled = false;
            button.style.backgroundColor = "DodgerBlue";
            button.style.borderColor = "white";
            button.style.color = "white";
        }
        i++;
    }
}

/** Resets application to its default, ready for new calculation */
function clearScreen(){
    deleteButton();
    deleteButton();
    deleteButton();
    deleteButton();
    document.getElementById("rows").value = "";
    document.getElementById("columns").value = "";
    document.getElementById("warningDisplay").innerHTML = "";
    largestRows = null;
    oldMatrix = [];
    disableButtons(false, allButtonIds);
}

/** Handles removal of matrices from client-side display and memory */
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
                var child = document.getElementById(matrix + "e" + i + j);
                display.removeChild(child);
            }
            var brElement = document.getElementById(matrix + "br" + i);
            display.removeChild(brElement);
        }
        if(matrix == "matrix3"){
            isMatrix3Created = false;
            document.getElementById("equalsDisplay").innerHTML = "";
            disableButtons(false, ["goBtn"]);
        } else if(matrix == "matrix2"){
            isMatrix2Created = false;
        } else if(matrix == "matrix1"){
            oldMatrix = [];
            isMatrix1Created = false;
        }
    }
}

/**
* Handles the deletion of operator from client-side display and memory.
* @returns {boolean} True if operator deleted, false otherwise.
*/
function deleteOperator(){
    try{
        if(operator == "det" && isMatrix1Created){
            return false;
        }
        if(operator == "det" && !isMatrix1Created){
            var detOperatorDisplay = document.getElementById("detOperatorDisplay");
            detOperatorDisplay.innerHTML = "";
            operator = null;
            isOperatorSet = false;
            return true;
        }
        if(isOperatorSet && isMatrix1Created && !isMatrix2Created){
            var operatorDisplay = document.getElementById("operatorDisplay");
            operatorDisplay.innerHTML = "";
            operator = null;
            isOperatorSet = false;
            return true;
        } else {
            return false;
        }
    } catch(error){
        console.log("ERROR: deleteOperator() error");
    }
}

/** Handles user clicking 'DEL' button. Deletes matrix/operator from client side.*/
function deleteButton(){
    if(!deleteOperator()){
        deleteMatrix();
    } else {
        disableButtons(false, allButtonIds);
    }
    resetDisplay();
}

/** Resets matrix display region back to default width and height. */
function resetDisplay(){
    if(!isMatrix1Created && !isMatrix2Created){
        var displayRegion = document.getElementById("matrixDisplay");
        displayRegion.style.height = "150px";
    }
}

function formatDetResultDisplay(){
    if(operator == "det"){
        var resultInput = document.getElementById("matrix3e11");
        resultInput.style.width = "130px";
        resultInput.style.height = "130px";
        resultInput.style.fontSize = "50px";
        resultInput.style.borderStyle = "hidden";
        resultInput.style.textAlign = "center";
    }
}

/**
* Displays the result of server-side calculation in client.
* @param {Object} result The JSON data received from server, converted to JS object.
*/
function displayResult(result){
    var matrix3Display = document.getElementById("matrix3Display");
    document.getElementById("equalsDisplay").innerHTML = "=";
    var rows = result["resultRows"];
    var columns = result["resultColumns"];
    oldMatrix[4] = rows;
    oldMatrix[5] = columns;
    var totalRows = Number(largestRows) + Number(rows);
    optimizeDisplayRegion(totalRows); // todo - Add conditions for resizing display region
    var longestCharsId = [];
    for(var i = 1; i <= rows; i++){
        for(var j = 1; j <= columns; j++){
            var value = result["resulte" + i + j];
            var resultElement = document.createElement('input');
            resultElement.setAttribute('class', 'element-input3');
            resultElement.setAttribute('value', value);
            resultElement.setAttribute('id', "matrix3e" + i + j);
            resultElement.setAttribute('disabled', true);
            matrix3Display.appendChild(resultElement);
            if(value.length > m3BiggestCharCount){
                longestCharsId["id"] = "matrix3e" + i + j;
                m3BiggestCharCount = value.length;
            }
        }
        var nextLine = document.createElement('br');
        nextLine.setAttribute('id', 'matrix3' + 'br' + i);
        matrix3Display.appendChild(nextLine);
    }
    formatDetResultDisplay();
    resizeInputFields(longestCharsId["id"]);
    isMatrix3Created = true;
}

/** Validates matrix size for determinant (DET) calculations */
function detIsSizeValid(){
    if(operator == "det"){
        if(oldMatrix[0] != oldMatrix[1]){
            deleteOperator();
            var warningDisplay = document.getElementById("warningDisplay");
            warningDisplay.innerHTML = "DETERMINANT CALCULATION ERROR: Matrix must be of size NxN";
            return false;
        }
        if(oldMatrix[0] == 2 || oldMatrix[0] == 3){
            return true;
        } else {
            deleteOperator();
            var warningDisplay = document.getElementById("warningDisplay");
            warningDisplay.innerHTML = "DETERMINANT CALCULATION ERROR: Matrix must be of size 2x2 or 3x3!";
            return false;
        }
    } else {
        return true;
    }
}

/** Handles POST request when user clicks 'GO' button in client */
$(function (){
    $("#goBtn").on("click", function(event){
        // DEBUGGING
        console.log("GO! BUTTON CLICKED"); // todo - REMOVE
        disableButtons(true, ["goBtn"]);
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
                        var value = $("#matrix" + i + "e" + j + k).val();
                        if(isNaN(parseInt(value))){
                            console.log("ERROR: '" + value + "' is not a number"); // todo - DELETE
                            return;
                        } else {
                            data["matrix" + i + "e" + j + k] = value;
                        }
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

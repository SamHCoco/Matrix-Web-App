var OldMatrix = [] // the size of the previous inputted matrix to be deleted

// Function for user to submit dimensions of matrix on clicking 'Enter' button
function submitDimensions(){
    clearDisplay();
    rows = document.getElementById('rows').value;
    columns = document.getElementById('columns').value;
    oldMatrix = [rows, columns];

    var displayDiv = document.getElementById('matrixDisplay');
    for(var i = 1; i <= rows; i++){
        for(var j = 1; j <= columns; j++){
        var elementInput = document.createElement('input');
              elementInput.setAttribute('type', 'number');
              elementInput.setAttribute('id', 'element' + i + j);
              displayDiv.appendChild(elementInput);
        }
        var nextLine = document.createElement('br');
        nextLine.setAttribute('id', 'br' + i);
        displayDiv.appendChild(nextLine);
    }
}

// clears display window of matrix during user prompt to input values
function clearDisplay(){
    try {
        var parent = document.getElementById('matrixDisplay');
        for(var i = 1; i <= oldMatrix[0]; i++){
            for(var j = 1; j <= oldMatrix[1]; j++){
            console.log('PROCESSING: element' + i + j);
                var child = document.getElementById('element' + i + j);
                parent.removeChild(child);
            }
            var child = document.getElementById('br' + i);
            parent.removeChild(child);
        }
        oldMatrix.shift();
        oldMatrix.shift();
    } catch(err){
        console.log("ERROR in clearDisplay()");
    }
}



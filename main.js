var row = 1;
var seat = 0;
var result = 1;

$(document).ready(function() {
    onSubmit();
});

function onSubmit() {
    // empty result
    row = 1;
    seat = 0;
    result = 1;
    $('.result').empty();

    var matrixSize = $('input[name=matrix_size]').val();

    //alert(matrixSize);
    if (matrixSize % 2 == 0 || matrixSize < 0 || matrixSize > 25) {
        alert('Inserted number need to be less than 25 | greater 0 | odd!');
    }
    else {
        createMatrix(matrixSize);
    }

}

function createMatrix(matrixSize) {
    var matrix = '<table>';
    for (var i = 0; i < matrixSize; i++) {
        matrix += '<tr>';
        for (var j = 0; j < matrixSize; j++) {
            matrix += '<td></td>';
        }
        matrix += '</tr>';
    }

    matrix += '</table>';

    $('.result').append(matrix);

    // count numbers
    countResult(matrixSize);
}

function countResult(matrixSize) {
    var totalSize = Math.floor(matrixSize * matrixSize);

    // get first row middle seat
    seat = Math.floor(matrixSize / 2) + 1;

    for (var i = 0; i < totalSize; i++) {
        setTimeout(function(){
            appendResult(row, seat, result);

            // check row
            row--;
            if (row < 1) {
                row = matrixSize;
            }

            // check seat
            seat++;
            if (seat > matrixSize) {
                seat = 1;
            }

            // check seat availability
            var seatInfo = $("table tr:nth-child("+ row +")").find("td:nth-child("+ seat +")").html();
            if (seatInfo !== '') {
                row = row + 2;
                seat = seat - 1;

                if (row > matrixSize) {
                    row = 2;
                    seat = matrixSize;
                }
            }

            result++;

        }, 50 * (i + 2));
    }


    //showResult(matrixSize);
}

function appendResult(row, seat, result) {
    $("table tr:nth-child("+ row +")").find("td:nth-child("+ seat +")").append( result ).show('slow');;
}
/*
function showResult(matrixSize) {
    var k = 1;

    for (var i = 0; i < matrixSize; i++) {
        k = 1;

        setTimeout(function() {
            console.log(k);
            $("table tr:nth-child(" + k + ")").show("slow");
            k++;
        }, 500 * (i * 2));


    }
}*/


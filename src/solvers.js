/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n){
  var solution = undefined; //fixme
  var newBoard = makeNewBoard(n);

  var placeRook = function(){
    for(i=0; i < n; i++){
      for (var j = 0; j < n; j++) {
        newBoard.get(i)[j] = 1;
        if (newBoard.hasAnyRooksConflicts()) {
          newBoard.get(i)[j] = 0;
        }
      };
    }
  };

  placeRook();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return newBoard._currentAttributes[0];
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionsCount = 0;
  var solutions = [];
  var options = [];

  for (var i = 0; i < n; i++) {
    options.push(i);
  }

  var innerFunction = function(history, count, choices){
    if (count++ < n){
      for (var i = 0; i < choices.length; i++) {
        var limitedChoices = choices.slice();
        var choice = limitedChoices.splice(i,1);
        var newHistory = history.concat(choice);
        innerFunction(newHistory, count, limitedChoices);
      };
    }
    else {
      solutionsCount++;
      solutions.push(history);
    }
  }

  innerFunction([],0,options);
  return solutionsCount;
};

window.makeNewBoard = function(n){
  //make new board
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix[i] = [];
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j<n; j++) {
      matrix[i].push(0);
    }
  }
  return new Board(matrix);
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
  var solution = undefined; //fixme
  var newBoard = makeNewBoard(n);

  var placeRook = function(){
    for(i=0; i < n; i++){
      for (var j = 0; j < n; j++) {
        newBoard.get(i)[j] = 1;
        if (newBoard.hasAnyQueensConflicts()) {
          newBoard.get(i)[j] = 0;
        }
      };
    }
  };

  placeRook();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return newBoard._currentAttributes[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var start = new Date();

  var solutionsCount = 0;
  //var board = new Board({n:n});
  var board = new Int8Array(n*n);

  var innerFunction = function(row){
    if (row < n){
      var choiceRow = board.subarray(row * n, (row+1) * n) //rows()[row];
      for (var i = 0; i < choiceRow.length; i++) {
        choiceRow[i] = 1; //board.togglePiece(row, i);
        if ( !queensConflict(board, row*n+i, n, row) ) {  //.hasColConflictAt(i) && !board.hasMajorDiagonalConflictAt(i-row) && !board.hasMinorDiagonalConflictAt(i+row)) {
          innerFunction(row + 1);
        }
        choiceRow[i] = 0;//board.togglePiece(row, i);
      }
    } else {//if (count === n) {
      solutionsCount++;
      // console.log(solutionsCount);
    }
  };

  var queensConflict = function(buffer, i, n, row) {

    var indexToCheck = i - n;
    var count = 1;
    var row = row - 1;
    while (indexToCheck > -1){
      if ((indexToCheck-count) >= (n * row) && buffer[indexToCheck-count]) {
        return true;
      }
      if ((indexToCheck+count) < ((row+1)*n) && buffer[indexToCheck+count] ) {
        return true;
      }
      if (buffer[indexToCheck]) {
        return true;
      }
      indexToCheck = indexToCheck - n;
      count = count + 1;
      row = row - 1;
    }
    return false;
  };




  innerFunction(0);
  var finish = new Date();
  console.log(finish - start);
  return solutionsCount;
};
// window.queensConflict = function(buffer, i, n) {
//   var indexToCheck = i - n;
//   var count = 1;
//   while (indexToCheck > -1){
//     if (buffer[indexToCheck-count] || buffer[indexToCheck+count] || buffer[indexToCheck]) {
//       return true;
//     }
//     indexToCheck = indexToCheck - n;
//     count = count + 1;
//   }
//   return false;
// };

// window.unmarkAvailability = function(board, row, index){
//   var size = board.get('n');

//   var markColumns = function(){

//     for (var i = row; i < size; i++) {
//       var newRow = board.get(i).slice(); 
//       newRow[index]--;
//       board.set(i, newRow);
//     };
//   };
//   var markDiagonals = function(){
//     var majorIndex = index;
//     var minorIndex = index;

//     for (var i = row; i < size; i++) {
//       majorIndex++;
//       minorIndex--;
//       var newRow = board.get(i).slice(); 
//       if(minorIndex >= 0){
//        newRow[minorIndex]--;
//       }
//       if(majorIndex < size){
//         newRow[majorIndex]--;
//       }
//       board.set(i, newRow);
//     }
//   };

//   markColumns();
//   markDiagonals();
//   return board;
// };

// window.markAvailability = function(board, row, index){
//   var size = board.get('n');

//   var markColumns = function(){

//     for (var i = row; i < size; i++) {
//       var newRow = board.get(i).slice(); 
//       newRow[index]++;
//       board.set(i, newRow);
//     };
//   };
//   var markDiagonals = function(){
//     var majorIndex = index;
//     var minorIndex = index;

//     for (var i = row; i < size; i++) {
//       majorIndex++;
//       minorIndex--;
//       var newRow = board.get(i).slice(); 
//       if(minorIndex >= 0){
//        newRow[minorIndex]++;
//       }
//       if(majorIndex < size){
//         newRow[majorIndex]++;
//       }
//       board.set(i, newRow);
//     }
//   };

//   markColumns();
//   markDiagonals();
//   return board;
// };


// window.findChoiceRowIndices = function(choiceBoard, count) {
//   var array = [];
//   for (var i = 0; i < choiceBoard.get('n'); i++) {
//     if (choiceBoard.get(count)[i] === 0) {
//       array.push(i);
//     }
//   }
//   return array;
// };
//   // var solutionCount = undefined; //fixme
//   // var solutions = [];
//   // var newBoard = makeNewBoard(n);
//   // if (n === 0) return 0;
//   // var countNQueensSolutionsHelper = function(board, counter, rowIndex){
//   //   debugger;
//   //   var i = rowIndex;

//   //   // for (var i = 0; i < n; i++) {
//   //     for (var j = 0; j < n; j++) {
//   //       //place rook
//   //       if (board.get(i)[j] === 0) {
//   //         board.get(i)[j] = 1;
//   //         //if check failed
//   //         if (board.hasAnyQueensConflicts(j)) {
//   //           board.get(i)[j] = 0;
//   //         } else { //successfully added roook
//   //           counter++;
//   //           if(counter === n){ //if this is the last rook to add
//   //             solutions.push(JSON.stringify(board._currentAttributes));
//   //             board.get(i)[j] = 0;
//   //             counter--;
//   //           } else { //more rooks to add
//   //             countNQueensSolutionsHelper(board, counter, rowIndex +1);
//   //             board.get(i)[j] = 0;
//   //             counter--;
//   //           }
//   //         }
//   //       } else {
//   //         j = n; //go to next row
//   //       }
//   //     }
//   //   // }
//   // };

//   // countNQueensSolutionsHelper(newBoard, 0, 0);
//   // //   newBoard.get(0)[i] = 0;
//   // // }
//   // //countNRooksSolutionsHelper(newBoard, 0);
//   // solutionCount = _.unique(solutions).length;
//   // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   // return solutionCount;
// // };














//   // var solutionCount = undefined; //fixme
//   // var solutions = [];
//   // var newBoard = makeNewBoard(n);

//   // var countNRooksSolutionsHelper = function(board, counter, rowIndex){
//   //   debugger;
//   //   var i = rowIndex;

//   //   // for (var i = 0; i < n; i++) {
//   //     for (var j = 0; j < n; j++) {
//   //       //place rook
//   //       if (board.get(i)[j] === 0) {
//   //         board.get(i)[j] = 1;
//   //         //if check failed
//   //         if (board.hasAnyColConflicts(j)) {
//   //           board.get(i)[j] = 0;
//   //         } else { //successfully added roook
//   //           counter++;
//   //           if(counter === n){ //if this is the last rook to add
//   //             solutions.push(JSON.stringify(board._currentAttributes));
//   //             board.get(i)[j] = 0;
//   //             counter--;
//   //           } else { //more rooks to add
//   //             countNRooksSolutionsHelper(board, counter, rowIndex +1);
//   //             board.get(i)[j] = 0;
//   //             counter--;
//   //           }
//   //         }
//   //       } else {
//   //         j = n; //go to next row
//   //       }
//   //     }
//   //   // }
//   // };
//   // // if (n === 1) {return 1;};
//   // // if (n===2) {return 2;};

//   // // for (var i = 0; i < n; i++) {
//   // //   newBoard.get(0)[i] = 1;
//   // countNRooksSolutionsHelper(newBoard, 0, 0);
//   // //   newBoard.get(0)[i] = 0;
//   // // }
//   // //countNRooksSolutionsHelper(newBoard, 0);
//   // solutionCount = _.unique(solutions).length;
//   // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   // return solutionCount;

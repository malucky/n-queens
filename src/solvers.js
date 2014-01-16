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
}



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
  var solutionCount = undefined; //fixme
  var solutions = [];
  var newBoard = makeNewBoard(n);
  if (n === 0) return 0;
  var countNQueensSolutionsHelper = function(board, counter, rowIndex){
    debugger;
    var i = rowIndex;

    // for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        //place rook
        if (board.get(i)[j] === 0) {
          board.get(i)[j] = 1;
          //if check failed
          if (board.hasAnyQueensConflicts(j)) {
            board.get(i)[j] = 0;
          } else { //successfully added roook
            counter++;
            if(counter === n){ //if this is the last rook to add
              solutions.push(JSON.stringify(board._currentAttributes));
              board.get(i)[j] = 0;
              counter--;
            } else { //more rooks to add
              countNQueensSolutionsHelper(board, counter, rowIndex +1);
              board.get(i)[j] = 0;
              counter--;
            }
          }
        } else {
          j = n; //go to next row
        }
      }
    // }
  };

  countNQueensSolutionsHelper(newBoard, 0, 0);
  //   newBoard.get(0)[i] = 0;
  // }
  //countNRooksSolutionsHelper(newBoard, 0);
  solutionCount = _.unique(solutions).length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};














  // var solutionCount = undefined; //fixme
  // var solutions = [];
  // var newBoard = makeNewBoard(n);

  // var countNRooksSolutionsHelper = function(board, counter, rowIndex){
  //   debugger;
  //   var i = rowIndex;

  //   // for (var i = 0; i < n; i++) {
  //     for (var j = 0; j < n; j++) {
  //       //place rook
  //       if (board.get(i)[j] === 0) {
  //         board.get(i)[j] = 1;
  //         //if check failed
  //         if (board.hasAnyColConflicts(j)) {
  //           board.get(i)[j] = 0;
  //         } else { //successfully added roook
  //           counter++;
  //           if(counter === n){ //if this is the last rook to add
  //             solutions.push(JSON.stringify(board._currentAttributes));
  //             board.get(i)[j] = 0;
  //             counter--;
  //           } else { //more rooks to add
  //             countNRooksSolutionsHelper(board, counter, rowIndex +1);
  //             board.get(i)[j] = 0;
  //             counter--;
  //           }
  //         }
  //       } else {
  //         j = n; //go to next row
  //       }
  //     }
  //   // }
  // };
  // // if (n === 1) {return 1;};
  // // if (n===2) {return 2;};

  // // for (var i = 0; i < n; i++) {
  // //   newBoard.get(0)[i] = 1;
  // countNRooksSolutionsHelper(newBoard, 0, 0);
  // //   newBoard.get(0)[i] = 0;
  // // }
  // //countNRooksSolutionsHelper(newBoard, 0);
  // solutionCount = _.unique(solutions).length;
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;

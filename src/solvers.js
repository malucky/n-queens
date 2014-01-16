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
window.count = 0;
window.combos = {};

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
  // if (!board) {
  //   var counter = counter || 0;
  //   window.count = 0;
  //   window.combos = {};
  //   var matrix = [];
  //   for (var i = 0; i < n; i++) {
  //     matrix[i] = [];
  //   }
  //   for (var i = 0; i < n; i++) {
  //     for (var j = 0; j<n; j++) {
  //       matrix[i].push(0);
  //     }
  //   }
  //   var newBoard = new Board(matrix);
  // } else {
  //   var newBoard = board;
  // }

  // var placeRook = function(){
  //   //debugger;
  //   for (var i = 0; i < n; i++) {
  //     for (var j = 0; j < n; j++) {
  //       if(!newBoard.get(i)[j]){ //if no rook exist at position j
  //         newBoard.get(i)[j] = 1;
  //         if (newBoard.hasAnyRooksConflicts()) {
  //           newBoard.get(i)[j] = 0;
  //         } else { //we've placed a rook
  //           if (counter+1 === n) { //we've placed last rook
  //             if(!window.combos.hasOwnProperty(JSON.stringify(newBoard._currentAttributes))){
  //               window.count++;
  //               window.combos[JSON.stringify(newBoard._currentAttributes)] = true;
  //             }// return;
  //           } else { //we need to place more rooks
  //             findNRooksSolution(n, newBoard, counter+1);
  //             newBoard.get(i)[j] = 0;
  //           }
  //         }
  //       }
  //     };
  //   };
  // };
  // placeRook();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return newBoard._currentAttributes[0];
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme
  var solutions = [];
  var newBoard = makeNewBoard(n);

  var countNRooksSolutionsHelper = function(board, counter){
    debugger;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        //place rook
        if (board.get(i)[j] === 0) {
          board.get(i)[j] = 1;
          //if check failed
          if (board.hasAnyRooksConflicts()) {
            board.get(i)[j] = 0;
          } else { //successfully added roook
            counter++;
            if(counter === n){ //if this is the last rook to add
              solutions.push(JSON.stringify(board._currentAttributes));
              board.get(i)[j] = 0;
              counter--;
            } else { //more rooks to add
              countNRooksSolutionsHelper(board, counter);
              board.get(i)[j] = 0;
              counter--;
            }
          }
        }
      }
    }
  };
  countNRooksSolutionsHelper(newBoard, 0);

  solutionCount = _.unique(solutions).length;
  debugger;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
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

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

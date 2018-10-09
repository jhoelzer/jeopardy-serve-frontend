const grid = new JeopardyGrid ({
    numberOfRows: 5,
    numberOfColumns: 6,
    targetElement: document.querySelector("main"),
    cellClasses: ["green-border"],
    categoryIDs: [21, 67, 680, 309, 582, 267]
});

function randNum(max) {
    return Math.floor(Math.random() * max);
}

// function reload () {
//     window.location.reload(false);
//     // document.getElementById("board").reset();
// }

function reload () {
    const mainBoard = document.getElementById("main");
    mainBoard.innerHTML = "";
    jeopardyGrid = new JeopardyGrid ({
        numberOfRows: 5,
        numberOfColumns: 6,
        targetElement: document.querySelector("main"),
        cellClasses: ["green-border"],
        categoryIDs: [21, 67, 680, 309, 582, 267]
    });
    let totalScore = document.getElementById("totalScore");
    totalScore.innerHTML = ""
    let scoreDivs = document.querySelectorAll(".test");  
    for (var scoreDiv of scoreDivs) {
        scoreDiv.remove();
    }
}
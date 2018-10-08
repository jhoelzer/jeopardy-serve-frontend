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
class Cell {
    constructor (rowIndex, colIndex, cellClasses) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.cellClasses = cellClasses || [];
        this.element = this.createElement();
    }

    createElement() {
        const element = document.createElement("div");
        element.classList.add("cell", ...this.cellClasses);
        element.cellInstance = this;
        element.dataset.rowIndex = this.rowIndex;
        element.dataset.colIndex = this.colIndex;
        let divText = document.createTextNode("points");
        element.appendChild(divText);
        return element;
    }
}

class JeopardyCell {
    constructor (rowIndex, colIndex, cellClasses) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.cellClasses = cellClasses || [];
        this.element = this.createElement();
    }
}
let score = 0;

class Grid {
    constructor (options) {
        this.numberOfRows = options.numberOfRows;
        this.numberOfColumns = options.numberOfColumns;
        this.targetElement = options.targetElement || document.body;
        this.cellClasses = options.cellClasses || [];
        this.gridElement = this.createGridElement();
        this.rows = [];
        this.createRows();
        this.gridElement.addEventListener("click", this.clickEvent.bind(this));
        this.gridElement.removeEventListener("click", this.clickEvent.bind(this));
        console.log(this);
    }

    clickEvent(event) {
        let clickedCell = event.target;
        if(!clickedCell.classList.contains("cell")) return;
        let rowIndex = Number(clickedCell.dataset.rowIndex);
        let colIndex = Number(clickedCell.dataset.colIndex);
        clickedCell.classList.add("clickedCell");
        clickedCell = this.findCell(rowIndex, colIndex);
        this.onClick(clickedCell);
    }

    createGridElement() {
        const element = document.createElement("div");
        element.classList.add("grid");
        this.targetElement.appendChild(element);
        document.addEventListener("click", (event) => {
            if (!event.target.classList.contains("cell")) return;
            const clicked = event.target;
            clicked.classList.add("clicked");
        });
        return element;
    }

    createRowElement(rowIndex) {
        const element = document.createElement("div");
        element.classList.add("row");
        element.dataset.rowIndex = rowIndex;
        this.gridElement.appendChild(element);
        return element;
    }

    createRows() {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.rows[rowIndex] = [];
            const rowElement = this.createRowElement(rowIndex);
            this.createCells(rowIndex, rowElement);
        }
    }

    createCells(rowIndex, rowElement) {
        for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
            const cell = new Cell (rowIndex, colIndex, this.cellClasses);
            this.rows[rowIndex][colIndex] = cell;
            rowElement.appendChild(cell.element);
        }
    }

    createJeopardyCells(rowIndex, rowElement) {
        for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
            const cell = new JeopardyCell (rowIndex, colIndex, this.cellClasses);
            this.rows[rowIndex][colIndex] = cell;
            rowElement.appendChild(cell.element);
        }
    }

    findCell(rowIndex, colIndex) {
        rowIndex = Number(rowIndex);
        colIndex = Number(colIndex);
        const row = this.rows[rowIndex];
        const cell = row ? row[colIndex] : null;
        return cell || null
    }
}

class JeopardyGrid extends Grid {
    constructor(options) {
        super(options)
        this.categoryIDs = options.categoryIDs;
        this.getCategories();
    }

    async getCategories () {
        const promisedObj = this.categoryIDs.map(async categoryID => {
            const res = await fetch("http://localhost:3000/api/category/" + categoryID);
            const hydrated = await res.json();
            return hydrated;
        })

        const categories = await Promise.all(promisedObj);
        console.log(categories);
        this.assignClues(categories);
    }

    assignClues (categories) {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
                const cell = this.rows[rowIndex][colIndex];
                const clue = categories[colIndex].clues[rowIndex];
                cell.element.innerText = clue.value || 100;
                cell.pointValue = clue.value || 100;
                cell.question = clue.question || "N/A";
                cell.element.dataset.question = clue.question;
                cell.answer = clue.answer;
            }
        }
    }

    onClick (cell) {
        console.log(cell);
        console.log(cell.answer)

        let finalAnswer = cell.answer.toLowerCase().replace(/[^\w\s]/gi, "");
        let userInput = prompt(cell.question)
        let userAnswer = userInput.toLowerCase().replace(/[^\w\s]/gi, "");

        userInput = userInput.replace(" & ", "").replace("a ","").replace("an ","").replace("the ","").replace("is ","").replace(" ","").replace("s","").replace("es","").replace("its ","");
        userAnswer = userAnswer.replace(" & ", "").replace("a ","").replace("an ","").replace("the ","").replace("is ","").replace(" ","").replace("s","").replace("es","").replace("its ","");
        finalAnswer = finalAnswer.replace(" & ", "").replace("a ","").replace("an ","").replace("the ","").replace("is ","").replace(" ","").replace("s","").replace("es","").replace("its ","");
        
        if (userAnswer == finalAnswer) {
            console.log("correct");
            let correctAnswer = "You Are Correct";
            score += cell.pointValue;
            this.scoreTotal();

            let element = document.createElement("div");
            let divText = document.createTextNode(`Your Answer: ${userAnswer} | Correct Answer: ${cell.answer} | ${correctAnswer}`);
            element.appendChild(divText);
            element.classList.add("test")
            let place = document.getElementById("answers");
            place.appendChild(element);
            
        } else {
            console.log("wrong");
            let correctAnswer = "You Guessed Wrong";
            score += 0;
            this.scoreTotal();

            let element = document.createElement("div");
            let divText = document.createTextNode(`Your Answer: ${userAnswer} | Correct Answer: ${cell.answer} | ${correctAnswer}`);
            element.appendChild(divText);
            element.classList.add("test")
            let place = document.getElementById("answers");
            place.appendChild(element);
        }
    }
    
    scoreTotal () {
        let scoreElement = document.createElement("div");
        let scoreDivText = document.createTextNode(`${score}`);
        scoreElement.classList.add("test")
        scoreElement.appendChild(scoreDivText);
        let scorePlace = document.getElementById("totalScore");
        scorePlace.appendChild(scoreElement);
            console.log(score)
    }
}
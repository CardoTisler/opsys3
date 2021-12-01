export const firstFit = (parsedInput) => {
    console.log(parsedInput);
    const result = [];
    let rowData = [];
    const colorMap = createColorScheme(parsedInput);
    let memory = "-".repeat(48);
    let i = 1;
    for(const task of parsedInput){
        console.log(task)
        if(task.memorySlots === "-"){
            //remove task.letter from memory
            memory = removeFileAlloc(memory, task.letter);
        } else {
            memory = insertFileAlloc(memory, task.letter, parseInt(task.memorySlots));
        }
        rowData = stringToArrayOfTasks(memory, colorMap);
        result.push({etapiIndex: i, rowData});
        i++
        console.log(memory);
    }

    const calculations = makeCalculations(memory);
    return {result, calculations};
}
const makeCalculations = (memory) => {
    //letter: {fragmented: false, cells: 0}
    const map = new Map();
    let previousCell = null;
    for (let i = 0; i < memory.length; i++) {
        const currentCell = memory.charAt(i);
        if(currentCell === "-"){ continue; } //skip this character, irrelevant info
        if(currentCell === previousCell){
            //same cell as last, continue increasing task cell count
            const {fragmented, cells} = map.get(currentCell);
            map.set(currentCell, {fragmented, cells: cells + 1})
        } else {
            previousCell = currentCell;
            //check if new file
            if(!map.has(currentCell)){
                //new file - add it to map
                map.set(currentCell, {fragmented: false, cells: 1})
            } else {
                //otherwise set as fragmented and increase cellcount
                const {cells} = map.get(currentCell);
                map.set(currentCell, {fragmented: true, cells: cells + 1})
            }
        }
    }
    console.log(map);
    let fragmentedFiles = 0;
    let fragmentedCells = 0;
    let usedCells = 0;
    const totalFiles = map.size;
    for(const key of map.keys()){
        const file = map.get(key);
        usedCells += file.cells;
        if(file.fragmented){
            fragmentedCells += file.cells;
            fragmentedFiles++;
        }
    }
    return {filesRatio: fragmentedFiles/totalFiles, cellsRatio: fragmentedCells/usedCells}
}
const createColorScheme = (parsedInput) => {
    const map = new Map();
    parsedInput.forEach((file) => {
        const {letter, color} = file;
        if(!map.get(letter)){
            map.set(letter, color);
        }
    })
    return map;
}
const removeFileAlloc = (memory, letter) => {
    for(var i = 0; i < memory.length; i++){
        if(memory.charAt(i) === letter){
            memory = memory.replaceAt(i, "-");
        }
    }
    return memory;
}

function insertFileAlloc(memory, letter, memorySlots) {
    let slotsToAdd = memorySlots;
    let i = 0;
    while(i < memory.length){
        if(memory.charAt(i) === "-"){
            memory = memory.replaceAt(i, letter);
            slotsToAdd--;
        }
        if(slotsToAdd === 0){ return memory; }
        i++;
    }
}
const stringToArrayOfTasks = (memory, colorMap) => {
    let result = [];
    for (let i = 0; i < memory.length; i++) {
        const letter = memory.charAt(i) === "-" ? "-" : memory.charAt(i);
        const color = letter === "-" ? "gray" : colorMap.get(letter);
        result.push({color, letter, memorySlots:1})
    }
    return result;
}

//https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

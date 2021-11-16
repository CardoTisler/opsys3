//result array koosneb 10st objektist, iga objekt kirjeldab result tabelis ühte rida.
// [{etapiIndex: int, lisatudProtsess: string, rowData: [ {}, {}, {} ]}]
export const randomFit = (parsedInput) => {
    const result = []

    let workingArray = []
    let memory = "-".repeat(50);

    for (let i = 0; i < 10; i++) {
        let rowData = [];

        if (!parsedInput[i] && workingArray.length === 0) {
            result.push({
                etapiIndex: i + 1, lisatudProtsess: "-", rowData: [{
                    letter: "-", memorySlots: 50,
                    ticksLeft: 10,
                    color: 'gray'
                }]
            })
        } else {
            const lisatudProtsess = parsedInput[i].memorySlots + "," + parsedInput[i].duration
            memory = allocTask(memory, parsedInput[i])
            if (!memory) {
                //passing null to rowData will trigger the UI to render info about memoryslots exceeding
                result.push({etapiIndex: i + 1, lisatudProtsess, rowData: null})
                return result;

            }
            workingArray.push(parsedInput[i]);
            for (let j = 0; j < workingArray.length; j++) {
                const task = workingArray[j]
                let duration = task.duration - 1;
                workingArray[j] = {...task, duration}
            }


            //make row data based on "memory"
            rowData = stringToArrayOfTasks(memory, parsedInput)
            result.push({etapiIndex: i + 1, lisatudProtsess, rowData});

            //cleanup after tick
            workingArray.forEach(task => {
                if (task.duration === 0) {
                    memory = removeTaskAlloc(memory, task)
                }
            })
            workingArray = workingArray.filter(task => task.duration > 0)
        }
    }
    return result;
}

const allocTask = (memory, task) => {
    // get necessary memoryslots for task
    const taskMemory = task.letter.repeat(task.memorySlots)
    //see if enough memory open for new task
    //find all available "holes" in memory
    //save holes as objects to array in format {startingIndex: int, endIndex: int, size: int}
    let holes = []
    let lastSlotWasOpen = false;
    for (let i = 0; i < memory.length; i++) {
        const ch = memory.charAt(i)
        if (ch === "-") {
            //if lastSlot was open, increase size of last saved hole in holes array
            if (lastSlotWasOpen) {
                const hole = holes[holes.length - 1];
                const size = hole.size + 1;
                holes[holes.length - 1] = {...hole, size}
            } else {
                //if last slot wasnt open, that means we have a new hole, reset the data for last hole
                //and push the new hole to holes array
                holes.push({startingIndex: i, endIndex: null, size: 1})
                lastSlotWasOpen = true
            }
        } else {
            if (lastSlotWasOpen) {
                //last slot was open but now its closed, "save" the endIndex to last hole saved to holes array
                const hole = holes[holes.length - 1];
                holes[holes.length - 1] = {...hole, endIndex: i - 1}
                lastSlotWasOpen = false
            }
        }
    }
    //if loop ended with lastSlowWasOpen, then final endIndex doesnt get saved

    holes[holes.length - 1] = {...holes[holes.length - 1], endIndex: 49}

    // filter out holes that wont fit our task
    holes = holes.filter((hole) => hole.size >= taskMemory.length);

    //pick a random hole from holes array and put our task in it
    //getRandomInt return int between 0 and argument excluded
    const randomHole = holes[getRandomInt(holes.length)]
    if(randomHole) {
        memory = replaceBetween(memory, randomHole.startingIndex, randomHole.startingIndex + taskMemory.length, taskMemory)
        return memory;
    } else {
        return null;
    }
}
const replaceBetween = (origin, startIndex, endIndex, insertion) =>{
    return origin.substring(0, startIndex) + insertion + origin.substring(endIndex);
}

const removeTaskAlloc = (memory, task) => {
    const taskToRemove = task.letter.repeat(task.memorySlots);
    memory = memory.replace(taskToRemove, "-".repeat(taskToRemove.length))
    return memory
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}
const stringToArrayOfTasks = (memory, parsedInput) => {
    let result = []
    let previousSlotWasGray = false;
    for (let i = 0; i < memory.length; i += 1) {
        //find character from memory string
        const ch = memory.charAt(i);
        //find task by using that memory char
        const task = parsedInput.filter(task => task.letter === ch)[0]
        if (task) {
            previousSlotWasGray = false;
            result.push(task)
            i += task.memorySlots - 1
        } else {
            if (previousSlotWasGray) {
                //increase memorySlots count for last object in results array
                let viimaneTask = result[result.length - 1];
                const viimaneSlotArv = viimaneTask.memorySlots + 1
                result[result.length - 1] = {...viimaneTask, memorySlots: viimaneSlotArv}
            } else {
                //append graySlot object to results array
                previousSlotWasGray = true;
                result.push({letter: "-", color: "gray", memorySlots: 1})
            }
        }
    }

    return result;
}



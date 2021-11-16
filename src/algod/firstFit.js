//result array koosneb 10st objektist, iga objekt kirjeldab result tabelis ühte rida.
// [{etapiIndex: int, lisatudProtsess: string, rowData: [ {}, {}, {} ]}]
export const firstFit = (parsedInput) => {
    const result = []

    let workingArray = []
    let memory = "-".repeat(50);

    for (let i = 0; i < 10; i++) {
        let rowData = [];

        if(!parsedInput[i]) { result.push({etapiIndex: i+1, lisatudProtsess: "-", rowData:[{letter: "-", memorySlots: 50,
                ticksLeft: 10,
                color: 'gray'}]})}
        else{
            const lisatudProtsess = parsedInput[i].memorySlots + "," + parsedInput[i].duration
            memory = allocTask(memory, parsedInput[i])
            if(!memory) {
                console.error("MEMORY EXCEEDED, ABORT PROGRAM")
                //passing null to rowData will trigger the UI to render info about memoryslots exceeding
                result.push({etapiIndex: i+1, lisatudProtsess, rowData: null})
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
    if(memory.search("-".repeat(taskMemory.length)) !== -1){
        memory = memory.replace("-".repeat(taskMemory.length), taskMemory);
        return memory;
    } else {
        //no room for new task, memory exceeded
        return null;
    }
}

const removeTaskAlloc = (memory, task) => {
    const taskToRemove = task.letter.repeat(task.memorySlots);
    memory = memory.replace(taskToRemove, "-".repeat(taskToRemove.length))
    return memory
}

const stringToArrayOfTasks = (memory, parsedInput) => {
    let result = []
    let previousSlotWasGray = false;
    for (let i = 0; i < memory.length; i += 1) {
        //find character from memory string
        const ch = memory.charAt(i);
        //find task by using that memory char
        const task = parsedInput.filter(task => task.letter === ch)[0]
        if(task){
            previousSlotWasGray = false;
            result.push(task)
            i += task.memorySlots - 1
        } else {
            if(previousSlotWasGray){
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

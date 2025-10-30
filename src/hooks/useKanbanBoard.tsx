// here is our main board loigc

import { useCallback, useState } from "react"
import type { KanbanColumn, KanbanTask } from "../types/kanban"
import { moveTaskBetweenColumns } from "../utils/task.util"


export const useKanbanBoard = (currentTasks: Record<string, KanbanTask>, currentColumns: KanbanColumn[]) => {

    // here we need to know our current column state in the board to perom crud operation
    const [columns, setColumns] = useState(currentColumns)

    // here also we need to know our current task that are available on our board
    const [tasks, setTasks] = useState(currentTasks)


    // here is the function to move our task from source column to destination column 
    const onMoveTask = useCallback((curresntTaskId: string, fromColumnId: string, toColumId: string, toIndex: number ) => {
        
        // here we need to find source column and destination column and update their task list and updating our whole columns list

        setColumns((prev) => {

            const sourceColumn = prev.find((col) => col.id == fromColumnId)!;
            const destColumn = prev.find((col) => col.id == toColumId)!;

            const { source, destination } = moveTaskBetweenColumns(sourceColumn.taskIds, destColumn.taskIds, sourceColumn.taskIds.indexOf(curresntTaskId), toIndex)

            return prev.map((col) =>  col.id === fromColumnId ? {...col, source} : col.id === toColumId ? {...col, destination} : col)


        })

        // now here update our taskStatus
        setTasks((prev) => ({
            ...prev,
            [curresntTaskId]: { ...prev[curresntTaskId], status: toColumId },
          }));

    },[])


    // here is our function to create new task in a column so we need a column id
    const onCreateTask = useCallback((columnId: string, newTask : KanbanTask  )=> {

        setTasks((prev) => ({...prev, [newTask.id]: newTask }));

        setColumns((prev) => prev.map((col) => col.id === columnId ? {...col, taskIds:[...col.taskIds, newTask.id]} : col))

    }, [])

    return { columns, tasks, onMoveTask, onCreateTask }
  
}

export default useKanbanBoard
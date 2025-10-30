
// Here is the pure column utils functions

import type { KanbanColumn } from "../types/kanban";


/* Add New Column To the board */

export const addNewColumn = (columns: KanbanColumn[], newColumn: KanbanColumn) : KanbanColumn[] => {
    return [...columns, newColumn]
}




/* Remove A column */


/* Rename A column */
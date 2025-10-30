// task.util.ts


/**
 * 
 * @param date 
 * @returns 
 */


export const formatDate = (date:Date) => {
    return date.toLocaleDateString('en-Us',{
        month:'short',
        day: 'numeric'
    })
}

/**
 * Check if a task is overdue
 * @param dueDate -Due date of the task
 * @returns Either true or false after checking if our current date is greater than the task date.
 */

export const isOverdue = (dueDate: Date) : boolean => {
    return new Date() > dueDate;
}



/**
 * Get initials from a name
 * @param name -Task name
 * @returns A string ,The initial name
 */
export const getInitials = (name: string): string => {
    return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0,2);
}




/**
 * Calculate priority color classes
 * @param priority -Priority type 'low' | 'medium' | 'high' | 'urgent'
 * @returns A string that contain the priority style . Default is medium priority string
 */
export const getPriorityColor = (priority: string): string => {
    const colors = {
        low: 'bg-blue-100 text-blue-700 border-l-4 border-blue-500',
        medium: 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500',
        high: 'bg-orange-100 text-orange-700 border-l-4 border-orange-500',
        urgent: 'bg-red-100 text-red-700 border-l-4 border-red-500'
    };
    return colors[priority as keyof typeof colors] || colors.medium
}



/**
 *  Reorders tasks after drag and drop
 * @param tasks -Array of tasks
 * @param startIndex -The original index of the dragged task
 * @param endIndex -The new index where the task is dropped
 * @returns A new array of task with the item moved to the new position
 */
export const reorderTasks = (
    tasks: string[],
    startIndex: number,
    endIndex: number

): string[] => {
    const result = Array.from(tasks);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0 , removed);
    return result;
};




export const moveTaskBetweenColumns = (
    sourceColumn: string[],
    destColumn: string[],
    sourceIndex: number,
    destIndex: number

): { source: string[]; destination: string[] } => {
    const sourceClone = Array.from(sourceColumn);
    const destClone = Array.from(destColumn);
    const [removed] = sourceClone.splice(sourceIndex,1);
    destClone.splice(destIndex, 0, removed);

    return {
        source: sourceClone,
        destination: destClone,
    };
}
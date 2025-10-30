

import type { KanbanTask } from "../../types/kanban";
import { getInitials, getPriorityColor, isOverdue, formatDate } from "../../utils/task.util";

import { useDragAndDrop } from "../../hooks/useDragAndDrop";


export default function KanbanCard({ task }: { task: KanbanTask }) {

    const { handelDragStart } = useDragAndDrop()





    return (
        <div
            draggable="true"
            onDragStart={(e) => {
                e.stopPropagation();
                handelDragStart(task.id)

                if (onDragStart) onDragStart(task.id);
            }}
            className="space-y-2 bg-white border border-neutral-200 rounded-lg p-3 shadow-sm 
                        hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">


            <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-sm text-neutral-900 line-clamp-2">
                    {task.title}
                </h4>
                {
                    task.priority && (
                        <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </span>
                    )
                }
            </div>

            {task.description && (
                <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
                    {task.description}
                </p>
            )}

            <div className="flex items-center justify-between">
                <div className="flex gap-1">
                    {task.tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {task.assignee && (
                <div className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex 
                items-center justify-center">
                    {getInitials(task.assignee)}
                </div>
            )}

            {task.dueDate && (
                <div className={`text-xs mt-2 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-neutral-500'}`}>
                    Due: {formatDate(task.dueDate)}
                </div>
            )}

        </div>
    );
}

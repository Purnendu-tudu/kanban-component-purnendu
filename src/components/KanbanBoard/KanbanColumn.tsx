
import { useState } from "react";
import type { KanbanColumn as Col, KanbanTask } from "../../types/kanban"




import KanbanCard from "./KanbanCard"

interface KanbanColumnProps {
    column: Col;
    tasks: KanbanTask[];
    dropTargetId: string | null;
    dragOverIndex: number | null;
    isDragging: boolean;
    handelDragOver: (targetId: string, index: number) => void;
    handelDragEnd: () => void;
    handelDragStart: (id: string) => void;
    onTaskMove: (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => void;


}



export default function KanbanColumn({ column, tasks, dropTargetId, dragOverIndex, isDragging, handelDragStart, handelDragOver, handelDragEnd, onTaskMove }: KanbanColumnProps) {

    const [adding, setAdding] = useState<boolean>(false)






    return (
        <section
            onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(column.id)
                handelDragOver(column.id, tasks.length)
            }}

            onDragLeave={(e) => {
                e.stopPropagation();

                handelDragEnd();
            }}

            onDrop={(e) => {
                console.log(dragOverIndex, dropTargetId)
                const taskId = e.dataTransfer.getData("taskId");
                const fromColumn = e.dataTransfer.getData("fromColumn");

                if (!taskId || !fromColumn) return;

                const toColumn = column.id;
                const newIndex = dragOverIndex ?? tasks.length;

                
                onTaskMove(taskId, fromColumn, toColumn, newIndex);

                handelDragEnd();
            }}

            onDragEnd={(e) => {
                e.preventDefault()

                handelDragEnd()

            }

            }

            className={`w-[300px] shrink-0 bg-gray-50 border ${dropTargetId === column.id ? 'border-blue-500' : 'border-gray-200 '} rounded-xl flex flex-col`}>
            <header className="sticky top-0 bg-gray-50 px-3 py-3 border-b border-gray-200 rounded-t-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{column.title}</h3>
                    <span className="text-xs text-gray-600">{tasks.length}</span>
                </div>
            </header>
            <div className="p-3 space-y-3 overflow-y-auto" style={{ maxHeight: '70vh' }}>
                {tasks.length === 0 && <div className="text-xs text-gray-500 italic">No tasks yet</div>}
                {tasks.map((t, i) => (
                    <div
                        key={t.id}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handelDragOver(column.id, i);
                        }}
                    >
                        <KanbanCard key={t.id} task={t} isDragging={isDragging} onDragStart={handelDragStart} onDragEnd={handelDragEnd} isDragover={dropTargetId === column.id && dragOverIndex === i} />
                    </div>

                ))
                }
            </div>

            {adding &&
                <div className="w-full flex flex-col gap-2 mb-2">
                    <textarea
                        className="mx-2 text-sm rounded-md p-2 border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                        placeholder="Add Task..."
                        rows={3}
                    ></textarea>

                    <div className="flex justify-end mx-2 gap-2">
                        <button onClick={() => setAdding(!adding)} className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-all duration-200">
                            Ok
                        </button>
                        <button onClick={() => setAdding(!adding)} className="text-sm bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-all duration-200">
                            Cancel
                        </button>
                    </div>
                </div>



            }

            {!adding && <div className="p-3">
                <button onClick={() => setAdding(!adding)} className=" w-full text-2xl text-center  bg-slate-200 hover:bg-slate-300 rounded p-2" >+</button>

            </div>}
        </section>
    )
}
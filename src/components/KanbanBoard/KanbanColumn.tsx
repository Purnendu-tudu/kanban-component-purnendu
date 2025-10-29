
import type { KanbanColumn as Col, KanbanTask } from "../../types/kanban"

import KanbanCard from "./KanbanCard"

export default function KanbanColumn({ column, tasks }: { column: Col; tasks: KanbanTask[] }) {
    return (
        <section className="w-[300px] shrink-0 bg-gray-50 border border-gray-200 rounded-xl flex flex-col">
            <header className="sticky top-0 bg-gray-50 px-3 py-3 border-b border-gray-200 rounded-t-xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{column.title}</h3>
                    <span className="text-xs text-gray-600">{tasks.length}</span>
                </div>
            </header>
            <div className="p-3 space-y-3 overflow-y-auto" style={{ maxHeight: '70vh' }}>
                {tasks.length === 0 && <div className="text-xs text-gray-500 italic">No tasks yet</div>}
                {tasks.map(t => <KanbanCard key={t.id} task={t} />)}
            </div>
        </section>
    )
}
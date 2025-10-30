import { useState, useCallback } from "react";

interface DragState {
    isDragging: boolean;
    draggedId: string | null;
    dropTargetId: string | null;
    dragOverIndex: number | null;
}

export const useDragAndDrop = () => {
    const [state, setState] = useState<DragState>({
        isDragging: false,
        draggedId: null,
        dropTargetId: null,
        dragOverIndex: null
    });

    const handelDragStart = useCallback((id:string) => {
        setState(prev => ({
            ...prev,
            isDragging: true,
            draggedId: id
        }));
    },[]);

    const handelDragOver = useCallback((targetId: string, index: number) => {
        setState(prev => ({
            ...prev,
            dropTargetId: targetId,
            dragOverIndex: index
        }));

    },[]);

    const handelDragEnd = useCallback(() => {
        setState({
            isDragging: false,
            draggedId: null,
            dropTargetId: null,
            dragOverIndex: null
        });
    },[]);

    return {
        ...state,
        handelDragStart,
        handelDragOver,
        handelDragEnd
    }

}
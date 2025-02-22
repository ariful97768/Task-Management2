import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const Task = ({ id, title, columnId }) => {

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id });
    const styles = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    if (isDragging) {
        return <h2 ref={setNodeRef} style={styles} className='h-[50px] w-[100px] bg-green-500 text-center opacity-50'> {title} columnId {columnId}</h2>
    }

    return (
        <div {...attributes} {...listeners} ref={setNodeRef} style={styles} className='h-[50px] w-[100px] bg-green-500 text-center'>
            {title} columnId {columnId}
        </div>
    );
};

export default Task;
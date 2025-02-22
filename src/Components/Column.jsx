import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import Task from './Task';
const Column = ({ column, createTasks, tasks }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: column.id });


    const styles = {
        transition,
        transform: CSS.Transform.toString(transform),
    }


    return (
        <>
            <div {...attributes} {...listeners} ref={setNodeRef} style={styles} className='h-[300px] w-[150px] bg-gray-500 text-center space-y-2 flex flex-col items-center'>
                <h2 className='bg-rose-300 rounded-2xl'>{column.title}</h2>
                {tasks.map(task => (
                    <Task key={task.id} title={task.title} columnId={task.columnId} />
                ))}
                <button onClick={() => createTasks(column.id)} className="btn">Add Task</button>
            </div >
        </>
    );
};

export default Column;
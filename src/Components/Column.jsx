import React, { useMemo, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import Task from './Task';
const Column = ({ column, createTasks, tasks }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: column.id });
    const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

    const styles = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    // {...attributes} {...listeners} ref={setNodeRef} style={styles}
    return (
        <>
            <div className='h-[300px] w-[150px] bg-gray-500 text-center space-y-2 flex flex-col items-center'>
                <h2 className='bg-rose-300 rounded-2xl'>{column.title}</h2>
                <SortableContext items={tasksId}>
                    {tasks.length > 0 ?
                        tasks.map(task => (
                            <Task key={task.id} id={task.id} title={task.title} columnId={task.columnId} />
                        ))
                        : <div className="h-full w-full flex items-center justify-center text-gray-400">
                        Drop here
                    </div>}
                </SortableContext>
                <button onClick={() => createTasks(column.id)} className="btn">Add Task</button>
            </div >
        </>
    );
};

export default Column;
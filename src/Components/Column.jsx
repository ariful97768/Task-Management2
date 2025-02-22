import React, { useMemo, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import Task from './Task';
const Column = ({ column,  tasks }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: `${column.id}-placeholder` });
    // const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);
    const sortableItems = useMemo(() => {
        const items = tasks.map(task => task.id);
        if (tasks.length === 0) {
            items.push(`${column.id}-placeholder`);
        }
        return items;
    }, [tasks, column.id]);

    const styles = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <>
            <div className='h-[300px] overflow-y-scroll w-[200px] bg-gray-500 text-center space-y-2 flex flex-col items-center'>
                <h2 className='bg-rose-300 px-5 py-2 rounded-full'>{column.title}</h2>
                <SortableContext items={sortableItems}>
                    {
                        tasks.map(task => (
                            <Task key={task.id} id={task.id} title={task.title} columnId={task.columnId} />
                        ))
                    }
                    {tasks.length === 0 && (
                        <div {...attributes} {...listeners} style={styles} ref={setNodeRef} id={`${column.id}-placeholder`}
                            className="h-[50px] w-full bg-gray-600/50 border-2 border-dashed border-gray-400 rounded-md m-2"
                            data-type="placeholder"
                        >
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                Drop here
                            </div>
                        </div>
                    )}
                </SortableContext>
            </div >
        </>
    );
};

export default Column;
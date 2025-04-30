import React, { useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import Task from './Task';
const Column = ({ column, tasks, handleDetails, handleSubmit, handleDelete }) => {
    const { setNodeRef, attributes, listeners, transform, transition } = useSortable({ id: `${column.id}-placeholder` });
    const sortableItems = useMemo(() => {
        const items = tasks.map(task => task._id);
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
            <div id={column.id} className='h-full max-h-[calc(100vh-64px)]  w-full min-w-[200px] bg-base-300 text-center space-y-2 flex flex-col items-center'>
                <h2 className='bg-red-400 text-white mt-5 px-5 py-2 rounded-full'>{column.title}</h2>
                <div className='overflow-y-auto h-full space-y-5'>
                    <SortableContext items={sortableItems}>
                        {
                            tasks.map(task => (
                                <Task key={task._id} handleDelete={handleDelete} handleSubmit={handleSubmit} handleDetails={handleDetails} id={task._id} title={task.title} dsc={task.dsc} postTime={task?.postTime}/>
                            ))
                        }
                        {tasks.length === 0 && (
                            <div {...attributes} {...listeners} style={styles} ref={setNodeRef} id={`${column.id}-placeholder`}
                                className="max-h-[500px] min-h-[500px] h-full w-96 bg-base-300 border-2 border-dashed border-gray-400 rounded-md m-2"
                                data-type="placeholder"
                            >
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                    Drop here
                                </div>
                            </div>
                        )}
                    </SortableContext>
                </div>
            </div >
        </>
    );
};

export default Column;
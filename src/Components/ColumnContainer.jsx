import React, { useMemo, useState } from 'react';
import Column from './Column';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';

const Columns = () => {
    const [columns, setColumns] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeColumns, setActiveColumns] = useState([]);

    const columnsId = useMemo(() => columns.map((column) => column.id), [columns]);

    const createColumns = () => {
        setColumns([...columns,
        { id: columns.length + 1, title: `Column ${columns.length + 1}` }]);
    }
    const createTasks = (id) => {
        const newTasks =
            setTasks([...tasks, { id: tasks.length + 1, title: `Task ${tasks.length + 1}`, columnId: id }]);
    }

    const removeColumns = () => {
        setColumns(columns.slice(0, columns.length - 1));
    }

    const onDragStart = (event) => {
        const { active, over } = event;
        const id = active.id;
        const index = columnsId.indexOf(id);
        if (index === -1) {
            return false;
        }
    }
    const onDragOver = (event) => {
        const { active, over } = event;

        const activeId = active?.id;
        const overId = over?.id;
        if (!over) return
 
        const isOverPlaceholder = typeof overId === 'string' && overId.includes('-placeholder');

        if (isOverPlaceholder) {
            const columnId = parseInt(over.id.split('-')[0]);
            setTasks(tasks => {
                const activeIdx = tasks.findIndex(task => task.id === activeId);
                // Create a new array instead of mutating the existing one
                return tasks.map((task, index) => {
                    if (index === activeIdx) {
                        return { ...task, columnId: columnId };
                    }
                    return task;
                });
            });
            return;
        }


        if (activeId === overId) return;
        setTasks(tasks => {
            const activeIdx = tasks.findIndex(task => task.id === activeId);
            const overIdx = tasks.findIndex(task => task.id === overId);
            tasks[activeIdx].columnId = tasks[overIdx].columnId;
            return arrayMove(tasks, activeIdx, overIdx);
        })


    }

    return (
        <DndContext onDragStart={onDragStart} onDragOver={onDragOver}>
            <section className='flex items-center gap-2 justify-center'>

                <div className='flex flex-col gap-2'>
                    <button onClick={() => createColumns()} className='btn bg-yellow-300'>Add  </button>
                    <button onClick={() => removeColumns()} className='btn bg-red-600 text-white'>Remove  </button>
                </div>
                <div className='flex gap-2 flex-row'>
                    <SortableContext items={columns}>
                        {columns.map((column) => (
                            <Column
                                key={column.id}
                                column={column}
                                // setTasks={setTasks}
                                createTasks={createTasks}
                                tasks={tasks.filter((task) => task.columnId === column.id)}
                            />
                        ))}
                    </SortableContext>
                </div>
            </section>
        </DndContext>
    );
};

export default Columns;
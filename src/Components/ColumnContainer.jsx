import React, { useMemo, useState } from 'react';
import Column from './Column';
import { DndContext } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';

const Columns = () => {
    const data = [
        { id: 1, userId: 5453, title: 'Task 1', columnId: 1 },
        { id: 2, userId: 5453, title: 'Task 2', columnId: 1 },
        { id: 3, userId: 5453, title: 'Task 3', columnId: 1 },
        { id: 4, userId: 5453, title: 'Task 4', columnId: 2 },
        { id: 5, userId: 5453, title: 'Task 5', columnId: 2 },
        { id: 6, userId: 5453, title: 'Task 6', columnId: 2 },
        { id: 7, userId: 5453, title: 'Task 7', columnId: 3 },
        { id: 8, userId: 5453, title: 'Task 8', columnId: 3 },
        { id: 9, userId: 5453, title: 'Task 9', columnId: 3 },
        { id: 10, userId: 5453, title: 'Task 10', columnId: 3 },
    ]

    const [tasks, setTasks] = useState(data);

    const columnsId = [1, 2, 3]

    const createTasks = (id) => {
        setTasks([...tasks, { id: tasks.length + 1, title: `Task ${tasks.length + 1}`, columnId: id }]);
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
                <div className='flex gap-2 flex-row'>
                    <SortableContext items={tasks}>
                        <Column
                            column={{ id: 1, title: 'To Do' }}
                            createTasks={createTasks}
                            tasks={tasks.filter((task) => task.columnId === 1)}
                        />
                        <Column
                            column={{ id: 2, title: 'In Progress' }}
                            createTasks={createTasks}
                            tasks={tasks.filter((task) => task.columnId === 2)}
                        />
                        <Column
                            column={{ id: 3, title: 'Task Done' }}
                            createTasks={createTasks}
                            tasks={tasks.filter((task) => task.columnId === 3)}
                        />
                    </SortableContext>
                </div>
            </section>
        </DndContext>
    );
};

export default Columns;
import React, { useContext, useEffect, useState } from 'react';
import Column from './Column';
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import Navbar from './Navbar';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';

const Columns = () => {
    const [refetch, setRefetch] = useState(false);
    const { user } = useContext(AuthContext)
    const [tasks, setData] = useState([]);

    useEffect(() => {
        fetch('https://to-do-server-blue.vercel.app?userId=' + user?.uid)
            .then(response => response.json())
            .then(data => {
                const allTasks = data.flatMap(d => d.tasks);
                setData(allTasks);
            })
            .catch(err => Swal.fire(
                'Oops!',
                'Data loading failed. Please check your internet and try again.',
                'error'
            ))
    }, [refetch, user])

    const columnsId = [1, 2, 3]

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
        if (activeId === '1-placeholder' || activeId === '2-placeholder' || activeId === '3-placeholder') return
        const isOverPlaceholder = typeof overId === 'string' && overId.includes('-placeholder');

        if (isOverPlaceholder) {
            const columnId = parseInt(over.id.split('-')[0]);
            setData(tasks => {
                const activeIdx = tasks.findIndex(task => task._id === activeId);
                (tasks, activeIdx, 'isOverPlaceholder');
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
        setData(tasks => {
            const activeIdx = tasks.findIndex(task => task._id === activeId);
            const overIdx = tasks.findIndex(task => task._id === overId);
            tasks[activeIdx].columnId = tasks[overIdx].columnId;
            return arrayMove(tasks, activeIdx, overIdx);
        })


    }

    const findData = (id) => {
        return tasks.find(task => task._id === id);
    }

    const onDragEnd = (event) => {
        const { active, over } = event;
        const activeData = findData(active.id);
        const overData = findData(over.id);
        fetch(`https://to-do-server-blue.vercel.app/update-column/${user?.uid}?taskId=${active.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ columnId: overData.columnId })
        }).then(res => res.json())
            .then(res => {
            })
            .catch(err => {
                Swal.fire(
                    'Oops!',
                    'Updating Failed. Please check your internet and try again.',
                    'error')
            })
    }

    const handleSubmit = (e, id) => {
        e.preventDefault()
        fetch(`https://to-do-server-blue.vercel.app/update-tasks/${user.uid}?taskId=${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: e.target.title.value,
                dsc: e.target.dsc.value,
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.modifiedCount) {
                    Swal.fire({
                        title: "Task Updated!",
                        icon: "success",
                    });
                    document.getElementById(id).checked = false
                }
                if (res.matchedCount && !res.modifiedCount) {
                    Swal.fire({
                        title: "No Changes Made!",
                        icon: "info",
                    });
                }
                setRefetch(prev => !prev)
            })
            .catch(err => console.log(err))
    }

    const handleDelete = id => {
        fetch(`https://to-do-server-blue.vercel.app/delete-tasks/${user.uid}?taskId=${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.modifiedCount && res.matchedCount) {
                    Swal.fire({
                        title: "Task Deleted!",
                        icon: "success",
                    });
                    document.getElementById(id).checked = false
                }
                setRefetch(prev => !prev)
            })
            .catch(err => Swal.fire({
                title: "Something Bad Happened. Please Check Your Internet",
                icon: "error",
            }))
    }

    const sensors = useSensors(useSensor(TouchSensor), useSensor(PointerSensor));

    return (
        <>
            <Navbar setRefetch={setRefetch} />
            <DndContext sensors={sensors} onDragEnd={onDragEnd} onDragStart={onDragStart} onDragOver={onDragOver}>
                <section className=''>
                    <div className='grid h-full  md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto'>
                        <SortableContext items={tasks}>
                            <Column
                                column={{ id: 1, title: 'To Do' }}
                                handleSubmit={handleSubmit}
                                handleDelete={handleDelete}
                                tasks={tasks.filter((task) => task.columnId === 1)}
                            />
                            <Column
                                column={{ id: 2, title: 'In Progress' }}
                                handleSubmit={handleSubmit}
                                handleDelete={handleDelete}
                                tasks={tasks.filter((task) => task.columnId === 2)}
                            />
                            <Column
                                column={{ id: 3, title: 'Task Done' }}
                                handleSubmit={handleSubmit}
                                handleDelete={handleDelete}
                                tasks={tasks.filter((task) => task.columnId === 3)}
                            />
                        </SortableContext>
                    </div>
                </section>
            </DndContext>


            {/* <Footer /> */}
        </>
    );
};

export default Columns;
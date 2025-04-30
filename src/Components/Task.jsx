import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

const Task = ({ id, title, dsc, handleDetails, handleDelete, handleSubmit, postTime }) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id });
    const styles = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    if (isDragging) {
        return <div ref={setNodeRef} style={styles} className="card card-border border-2 border-black bg-base-100 w-96 z-10">
            <div className="border-2 border-gray-300">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p className='text-start'>{dsc?.length > 120 ? dsc.slice(0, 120) + '...' : dsc}</p>

                </div>
                <div className='text-start text-sm ml-5 mb-2 flex items-center gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17px" height="17px"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />
                    </svg>
                    {new Date(postTime).toLocaleDateString()}
                </div>
            </div>
            <button onClick={() => handleDetails(id)} className='btn w-full'>View Details</button>
        </div>
    }

    return (
        <>
            <div>
                <div  {...attributes} {...listeners} ref={setNodeRef} style={styles} className="card card-border bg-base-100 w-96 border-2 border-gray-300">
                    <div className="card-body">
                        <h2 className="card-title">{title}</h2>
                        <p className='text-start'>{dsc?.length > 120 ? dsc.slice(0, 120) + '...' : dsc}</p>
                    </div>
                    <div className='text-start text-sm ml-5 mb-2 flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17px" height="17px"><path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 11 6 L 11 12.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13 11.585938 L 13 6 L 11 6 z" />
                        </svg>
                        {new Date(postTime).toLocaleDateString()}
                    </div>
                </div>
                <label style={styles} htmlFor={id} onClick={() => handleDetails(id)} className='btn w-full'>View Details</label>
            </div>

            {/* task details modal */}

            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal" role="dialog">
                <form onSubmit={e => handleSubmit(e, id)} className="modal-box max-w-3xl flex flex-col gap-4">
                    <div className='flex gap-5 justify-between'>
                        <input defaultValue={title} required placeholder='Title' type="text" className="font-bold text-lg w-full focus:outline-none border-none ring-0" name="title" id="" />
                        <label htmlFor={id} className="btn rounded-full border-gray-600 ">X</label>
                    </div>
                    <textarea defaultValue={dsc} required placeholder='Take a note' name="dsc" className="focus:outline-none h-80 border-none ring-0 resize-none" id=""></textarea>
                    <div className="flex w-full mt-5 max-w-80 mx-auto justify-between">
                        <button className="btn bg-green-400 ">Save!</button>
                        <label htmlFor={id} onClick={() => handleDelete(id)} className="btn bg-gradient-to-b bg-red-500 ">Delete!</label>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Task;
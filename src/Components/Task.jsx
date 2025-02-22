import React from 'react';

const Task = ({ title, columnId }) => {
    return (
        <div className='h-[50px] w-[100px] bg-green-500 text-center'>
            { title} columnId { columnId}
        </div>
    );
};

export default Task;
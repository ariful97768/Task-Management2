import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const Navbar = ({ setRefetch }) => {
    const { user, signOutUser } = useContext(AuthContext)
    const logOut = () => {
        signOutUser()
            .then(res = res.json())
            .then(res => toast.success('Logout Successful'))
            .catch(err => toast.error('Logout Failed'))
    }
    const handleSubmit = e => {
        e.preventDefault()
        document.getElementById('my_modal_6').checked = false
        fetch(`https://to-do-server-blue.vercel.app/add-task/${user.uid}?userName=${user.displayName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                columnId: 1,
                postTime: new Date(),
                title: e.target.title.value,
                dsc: e.target.dsc.value,
            })
        }).then(res => res.json())
            .then(res => {
                if (res.insertedId) {
                    Swal.fire({
                        title: "Task Added!",
                        icon: "success",
                        draggable: true
                    });
                }
                setRefetch(prev => !prev)
            })
        e.target.reset()
    }

    return (
        <div className="navbar bg-base-100 border-b-2 border-gray-300 shadow-sm">
            <div className="navbar-start">
                <label htmlFor="my_modal_6" className="btn bg-[#CF3520]/90 text-white">New Task</label>
            </div>
            <div className="navbar-center">
                <a className="text-xl">TodoSphere</a>
            </div>
            <div className="navbar-end">
                <div className="dropdown  dropdown-end ">
                    <button className="btn btn-ghost overflow-hidden btn-circle">
                        <img src={user.photoURL} alt="Profile" />
                    </button>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content border-2 border-gray-300 bg-base-100 rounded-box z-1 mt-3 w-50 p-4 shadow gap-2">
                        <h2>{user.displayName}</h2>
                        <h2>{user.email}</h2>
                        <button onClick={logOut} className='btn'>Log Out</button>
                    </ul>
                </div>
            </div>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <form onSubmit={handleSubmit} className="modal-box flex flex-col gap-4">
                    <input required placeholder='Title' type="text" className="font-bold text-lg  focus:outline-none border-none ring-0" name="title" id="" />
                    <textarea required placeholder='Take a note' name="dsc" className="focus:outline-none h-80 border-none ring-0 resize-none" id=""></textarea>
                    <div className="flex justify-between mx-10">
                        <button className="btn bg-green-400 ">Save!</button>
                        <label htmlFor='my_modal_6' className="btn bg-red-500">Close!</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

{/* <dialog id="my_modal_1" className="modal">
<form onSubmit={handleSubmit} className="modal-box max-w-max flex flex-col gap-4">
    <input placeholder='Title' type="text" className="font-bold text-lg  focus:outline-none border-none ring-0" name="title" id="" />
    <textarea placeholder='Description' name="dsc" className="focus:outline-none h-120 w-150 border-none ring-0 resize-none" id=""></textarea>
    <div className="modal-action mt-0">
        <div method="dialog">
            <button type='submit' id='close' className="btn">Close</button>
            <button type='submit' id='submit' className="btn">submit</button>
        </div>
    </div>
</form>
</dialog> */}

export default Navbar;
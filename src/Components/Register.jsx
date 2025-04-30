import { useContext, useEffect } from "react";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import googleImg from '../assets/googleLogo.png'
import { AuthContext } from "./AuthProvider";
// import useCreateUser from "../../Hooks/useCreateUser";
const Register = () => {
    const { setUser, user, register, signInWithGoogle } = useContext(AuthContext)
    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');
    const navigate = useNavigate()
    // const { createUser, data, error } = useCreateUser()
    // don't let the user come here if he's logged in
    // useEffect(() => {
    //     if (user) {
    //         navigate('/')
    //     }
    // }, [user])

    // email password signup
    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target);
        const { name, email, password } = Object.fromEntries(formData);

        register(email, password)
            .then(data => {
                updateProfile(auth.currentUser, {
                    displayName: name || 'User',
                })
                    .then(res => {
                       
                        toast.success('Registered successfully')
                    })
                setUser({ ...data.user, email, displayName: name })
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    toast.error('Email already in use');
                } else {
                    toast.error('Something went wrong');
                }
            })

    }

    // google signup
    const handleGoogleSignin = () => {
        signInWithGoogle()
            .then((userCredential) => {
                toast.success('User registered successfully');
                setUser(userCredential.user);
                createUser(auth.currentUser)
                navigate('/');
            })
            .catch(err => toast.error('Registration failed. Please try again'))
    }
    return (
        <div>
            <div className="flex py-10 justify-center items-center bg-base-200 ">
                <div className="p-16 card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                    <div className="text-center pb-6 space-y-2">
                        <h2 className='text-5xl '>Create new account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="card-body justify-center ice p-0 items-center">
                        <div className="form-control">
                            <input name='name' type="text" placeholder="Name" className=" input input-bordered min-w-xs" required />
                        </div>
                        <div className="form-control">
                            <input name='email' type="email" placeholder="Email" className=" input input-bordered min-w-xs" required />
                        </div>
                        <div className="form-control">
                            <input name='password' type="password" placeholder="Password" className="input input-bordered min-w-xs" required />
                        </div>
                        <div>
                            <h3 className="text-sm py-3">Already have and account? <Link className="hover:border-b border-black" to="/login">Login</Link></h3>
                        </div>
                        <div className="flex items-center justify-center ">
                            <p onClick={handleGoogleSignin} className=" btn bg-white border-none shadow-none hover:bg-white max-w-max">
                                <img className="w-8 " src={googleImg} alt="Google" />
                            </p>
                        </div>
                        <div className="form-control mt-5">
                            <button className="btn hover:bg-[#0c7d4a] bg-[#1a583c] text-white text-base">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import googleImg from '../assets/googleLogo.png'
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const { login, setUser, signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()

    // email password log in
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const { email, password } = Object.fromEntries(formData);
        login(email, password)
            .then(res => {
                setUser(res.user)
                toast.success('Log in success')
                navigate('/');
            })
            .catch(err => toast.error('Invalid credentials'))
    }

    // google log in
    const handleGoogleSignin = () => {
        signInWithGoogle()
            .then((userCredential) => {
                toast.success('User registered successfully');
                setUser(userCredential.user);
                navigate('/');
            })
            .catch(err => toast.error('Registration failed. Please try again'))
    }
    
    return (
        <div>
            <div className="flex py-20 justify-center items-center bg-base-200 ">
                <div className="p-16 card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl">
                    <div>
                        <h2 className='text-center text-5xl p-2'> Welcome Back </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="card-body items-center mt-5 p-0">
                        <div className="form-control">
                            <input name='email' type="email" placeholder="Email" className=" input input-bordered min-w-xs" required />
                        </div>
                        <div className="form-control">
                            <input name='password' type="password" placeholder="Password" className="input input-bordered min-w-xs" required />
                        </div>
                        <div>
                            <h3 className="text-sm py-3">New to this website? <Link className="hover:border-b border-black" to="/register">Register now</Link></h3>
                        </div>
                        <div className="flex items-center justify-center ">
                            <p onClick={handleGoogleSignin} className=" btn bg-white border-none shadow-none hover:bg-white max-w-max">
                                <img className="w-8 " src={googleImg} alt="Google" />
                            </p>
                        </div>
                        <div className="form-control mx-auto mt-6">
                            <button className="btn hover:bg-[#0c7d4a] bg-[#1a583c] text-white text-base">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
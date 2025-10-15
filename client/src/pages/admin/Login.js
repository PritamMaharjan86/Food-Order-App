import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import { BiHide, BiShowAlt } from "react-icons/bi";
import Loader from '../../components/Loader';
import axios from 'axios';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const PasswordVisible = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const getLogin = { ...login };
        getLogin[id] = value;
        setLogin(getLogin);
    };



    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { username, password } = login;

        try {
            const res = await axios.post('http://localhost:3001/api/admin/login', {
                username,
                password,
            });

            const { token } = res.data;
            toast.success(res.data.message);
            setTimeout(() => {
                localStorage.setItem('token', token);
                localStorage.setItem('loggedIn', username);
                navigate('/admin');
                setLoading(false);

            }, 1000);

        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);

            } else {
                toast.error('Something went wrong');

            }
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-sand p-4">
            {loading ? <Loader /> : ''}
            <div className="w-full max-w-md shadow-2xl shadow-black rounded-md p-6 sm:p-10">

                <form className="w-full" onSubmit={handleLogin}>
                    <h1 className="relative text-5xl font-extrabold text-primaryGreen mb-8 text-center sm:text-left">
                        Admin
                    </h1>
                    <div className="grid grid-cols-1 gap-6">
                        <ToastContainer />
                        <div className="relative w-full">
                            <FaRegUser
                                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                                size={17}
                            />
                            <input
                                className={`block w-full pl-8 border-b-4 p-2 rounded-md shadow-sm focus:outline-none focus:border-primaryGreen 
                                    }`}
                                type="name"
                                id="username"
                                placeholder="Username"
                                maxLength={10}
                                onChange={handleChange}
                                value={login.username}
                            />

                        </div>

                        <div className="relative w-full">
                            <TbLockPassword
                                className="absolute inset-y-3.5 left-2 flex items-center text-gray-400"
                                size={20}
                            />
                            <input
                                className="block w-full pl-10 border-b-4 p-3 rounded-md shadow-sm focus:outline-none  focus:border-primaryGreen text-base"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                onChange={handleChange}
                                maxLength={10}
                                required
                                autoComplete="current-password"
                            />
                            <button
                                type="button"
                                onClick={PasswordVisible}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <BiShowAlt size={20} /> : <BiHide size={20} />}
                            </button>
                        </div>


                        <div className="flex justify-center sm:justify-start ">
                            <button
                                type="submit"
                                className="bg-primaryGreen text-gray-100 font-normal px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 hover:from-yellow-500 hover:to-yellow-600 transition"
                            >
                                <span>Login</span>
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;
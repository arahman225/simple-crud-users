import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {

    const { loginUser } = useContext(AuthContext)
    const handleLogin = e => {
        e.preventDefault()

        const form = e.target;
        const email = form.email.value;
        const pass = form.password.value;

        console.log(email)
        loginUser(email, pass)
            .then(res => {
                console.log(res.user)
                const lastLoginTime = res?.user?.metadata?.lastSignInTime;
                const loginInfo = { email, lastLoginTime }

                fetch(`https://simple-crud-users.vercel.app/users/${email}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(loginInfo)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Good job!",
                                text: "You modified !",
                                icon: "success"
                            });
                        }
                    })
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div style={{ minHeight: 'calc(100vh - 200px)' }} className=' flex items-center'>
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center justify-center w-full relative border">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Register</h1>
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                        <input
                            type="email"
                            placeholder='email'
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                        <input
                            type="text"
                            placeholder='password'
                            id="password"
                            name="password"
                            required
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                        Login
                    </button>
                </form>

                {/* <div onClick={() => setShowPassword(!showPassword)} className='absolute bottom-[252px] right-10 cursor-pointer'>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div> */}

                <div className="mt-4 text-center cursor-pointer">
                    <p>Don't have an account? <Link to='/register' className="text-red-500">Register now</Link></p>
                </div>
                <div className="divider">OR</div>
                {/* <div onClick={handleSignInWithGoogle} className="flex gap-2 cursor-pointer border px-5 py-3 rounded-md hover:bg-base-200 transition duration-200">
                    <img className="w-7 h-7" src={googleImg} alt="" />
                    <h1 className="">Login With Google</h1>
                </div> */}
            </div>
        </div>
    );
};

export default Login;


/**
 * 1. Firebase globle instal (one time)
 * 2. Firebase login (one time)
 * 3. Proceed will be yes
 * 4. Firebase init each project for one time
 * 5. Select firebase hosting for using spacebar
 * 6. Select an existing project
 * 7. What will be your public (dist)
 * 8. Single page yes
 * 9. Npm run build for each time
 * 10. firebase deploy
 */
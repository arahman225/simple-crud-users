import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2'
const Register = () => {

    const { userRegister } = useContext(AuthContext)

    const handleRegister = e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photo = form.photoUrl.value;
        

        userRegister(email, password)
        .then(res => {
            console.log(res.user)
            const creationTime = res?.user?.metadata?.creationTime;
            const userInfor = {name, email, creationTime}
            fetch('https://simple-crud-users.vercel.app/users', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userInfor)
            })
            .then(res =>res.json())
            .then(data =>{
                console.log(data)
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                  });
            })
        })
        .then(error =>{console.log(error)})


    }
    return (
        <div style={{ minHeight: 'calc(100vh - 200px)' }} className=' flex items-center'>
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center justify-center w-full relative border">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Register</h1>
                <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="firstName" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
                        <input
                            type="text"
                            placeholder='name'
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="firstName" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Photo Url:</label>
                        <input
                            type="text"
                            placeholder='Photo url'
                            id="firstName"
                            name="photoUrl"
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>


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
                            type="password"
                            placeholder='password'
                            id="password"
                            name="password"
                            required
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                        Register
                    </button>
                </form>

                {/* <div onClick={() => setShowPassword(!showPassword)} className='absolute bottom-[252px] right-10 cursor-pointer'>
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div> */}

                <div className="mt-4 text-center cursor-pointer">
                    <p>Already have an account? <Link to='/login' className="text-red-500">Login now</Link></p>
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

export default Register;
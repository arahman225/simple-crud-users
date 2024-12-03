import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { createContext } from 'react';
import { auth } from './firebase.init';

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {


    const [loading, setLoading] = useState(true)

    // register 

    const userRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    // login

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userInfor = {
        name: 'omer',
        userRegister,
        loginUser,

    }
    return (
        <AuthContext.Provider value={userInfor}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
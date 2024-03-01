"use client";

import React, {useEffect} from 'react';

import { IoMoonSharp } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';


const Header = () => {

    const { darkMode, toggleDarkMode } = useDarkMode();
     // Actualizar el tema del body
     useEffect(() => {
        // Actualizar el tema del body solo en el navegador
        document.body.classList.toggle("dark", darkMode);
      }, [darkMode]); // Asegúrate de que el efecto se ejecute cuando darkMode cambie

    return (
        <motion.header className={`w-full h-auto py-5 z-20 drop-shadow-md ${darkMode ? 'dark' : 'light'}
        fixed dark:bg-darkBlue`}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: "0", opacity: 1 }}
        transition={{ delay:0 }}>
            <div className="flex justify-between items-center w-[90%] mx-auto max-w-[1300px] ">

                {/* Logo */}
                <h1 className="text-xl lg:text-2xl font-bold">Where in the world?</h1>

                {/* Dark-mode */}
                <button className="flex gap-2 items-center group transition"  onClick={toggleDarkMode}>
                    {/* <IoMoonOutline /> */}
                    <IoMoonSharp  className={`text-xl ${darkMode ? 'bg-transparent text-white' : 'bg-transparent text-darkBlue'}
                    group-hover:text-blue-500 transition`}/>
                    <p className="text-sm font-semibold transition
                    group-hover:text-blue-400">{darkMode ? 'Light Mode' : 'Dark Mode'}</p>
                </button>
            </div>
        </motion.header>
    )
}

export default Header
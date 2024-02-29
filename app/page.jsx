"use client";

import Contries from "@/components/Contries";
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import data from '../api/data.json';
import { useState } from "react";
import { motion } from 'framer-motion';
import { ThemeProvider } from "next-themes";
import { useDarkMode } from '../contexts/DarkModeContext';



export default function Home() {

  const { darkMode } = useDarkMode();


  const [selectedRegion, setSelectedRegion] = useState('');

  function handleRegionChange(e) {
    const region = e.target.value;
    setSelectedRegion(region);
  }

   // Filtrar los países según la región seleccionada
  const filteredCountries = selectedRegion ? data.filter(country => country.region === selectedRegion) : data;
  console.log(filteredCountries)
  
  return (
    <main className={`w-full h-auto py-4  ${darkMode ? 'dark' : 'light'}`}>

      <section className="w-[90%] max-w-[1300px] mx-auto py-20">
        {/* Buscadores */}
        <motion.section className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: "0", opacity: 1 }}
          transition={{ delay: 0.175 }}
          >
          <div className="flex gap-2 items-center shadow-sm px-4 py-2 w-full md:w-[400px]
            rounded-md">
            <span className="text-lg text-darkGray">
              <IoSearch />
            </span>

            <input
              type="search"
              placeholder="Search for a country..."
              aria-label="Search"
              className="h-full w-full py-2 pl-2 rounded-md bg-transparent"
              aria-describedby="button-addon2" />
          </div>

          <div className="flex gap-2 items-center bg-white shadow-sm dark:shadow-md dark:bg-veryDark dark:text-white
            rounded-md self-start cursor-pointer group hover:bg-veryDark px-2 relative dark:hover:bg-white
            dark:hover:text-veryDark
            hover:text-white transition">
            <select name="region" id="region" onChange={(e) => handleRegionChange(e)}
            className="bg-white dark:bg-veryDark group-hover:bg-veryDark cursor-pointer px-2 py-2
            transition  dark:hover:bg-white dark:hover:text-veryDark">
              <option value="" >Filter by Region</option>
              {Array.from(new Set(data.map((item) => item.region))).map((region, i) => (
                <option value={region} key={i} className="focus-visible:no-underline">
                  {region}
                </option>
              ))}
            </select>

          </div>
        </motion.section>

        {/* Pasar la lista filtrada de países al componente Contries */}
          <motion.div 
          initial={{ y: "-100", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          transition={{ delay: 0.195 }}>
            <Contries contries={filteredCountries} />
          </motion.div>
      </section>
    </main>
  );
}

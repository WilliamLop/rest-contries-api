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

  // Search input

  const [search, setSearch] = useState('');
  
  return (
    <main className={`w-full h-auto py-4`}>

      <section className="w-[90%] max-w-[1300px] mx-auto py-20">
        {/* Buscadores */}
        <motion.section className="flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          transition={{ delay: 0.145 }}
          >
          <div className="flex gap-3 items-center shadow-md px-6 py-2 w-full md:w-[450px] dark:bg-darkBlue
            rounded-md bg-white">
            <span className="text-lg text-darkGray">
              <IoSearch />
            </span>

            <input
              type="search"
              placeholder="Search for a country..."
              aria-label="Search"
              className="h-full w-full py-2 pl-2 rounded-md transition bg-transparent
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/[0.2]"
              onChange={(e) => setSearch(e.target.value)}
              />
          </div>

        <div className="rounded-md self-start cursor-pointer group hover:bg-veryDark relative dark:hover:bg-white bg-white
            dark:hover:text-veryDark dark:bg-darkBlue text-sm text-center  px-2 py-1 shadow-md
            hover:text-white transition">
            <select name="region" id="region" onChange={(e) => handleRegionChange(e)}
            className="bg-white dark:bg-darkBlue group-hover:bg-veryDark cursor-pointer w-[170px]  px-3 py-2
            transition  dark:hover:bg-white dark:hover:text-veryDark">
              <option value=""className="px-3" >Filter by Region</option>
              {Array.from(new Set(data.map((item) => item.region))).map((region, i) => (
                <option value={region} key={i} className="focus-visible:no-underline  px-3 py-2">
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
            <Contries contries={filteredCountries} search={search || ''}/>
          </motion.div>
      </section>
    </main>
  );
}

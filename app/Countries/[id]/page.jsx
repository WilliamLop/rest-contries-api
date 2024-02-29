"use client";

import React from 'react';
import data from '../../../api/data.json';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowLeft } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useDarkMode } from '@/contexts/DarkModeContext';


// Función para calcular la distancia de Levenshtein entre dos cadenas
function levenshteinDistance(a, b) {
    const matrix = Array.from(Array(b.length + 1), () => Array(a.length + 1).fill(0));

    for (let i = 0; i <= b.length; i++) {
        matrix[i][0] = i;
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

// Función para encontrar el país con el nombre más cercano
function findClosestCountryName(name, data) {
    let minDistance = Infinity;
    let closestCountry = null;

    // Buscar el país con el nombre más cercano
    data.forEach(country => {
        const distance = levenshteinDistance(name.toLowerCase(), country.name.toLowerCase());
        if (distance < minDistance) {
            minDistance = distance;
            closestCountry = country;
        }
    });

    // Retornar el país más cercano si la distancia es razonablemente baja
    if (minDistance <= 3) { // Puedes ajustar este valor según lo que consideres apropiado
        return closestCountry;
    } else {
        return null; // Si la distancia es demasiado alta, consideramos que no hay coincidencia cercana
    }
}

const Countrie = ({ params }) => {

  const { darkMode } = useDarkMode();


    const id = params.id;
    const formattedId = decodeURIComponent(id.replace(/\s+/g, '').toLowerCase());

    const country = findClosestCountryName(formattedId, data);

    if (!country) {
        return <div>País no encontrado</div>;
    }

    return (
    <section className={`w-full h-auto md:h-screen py-4 drop-shadow-md ${darkMode ? 'dark' : 'light'}`}>
        <article className="w-[90%] max-w-[1300px] mx-auto py-20">

        <>
            <motion.div className=""
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0", opacity: 1 }}
                transition={{ delay: 0.175 }}>
                <Link href="/" className="border border-black/[0.1] flex items-center gap-4 w-[100px]
                font-bold rounded-md shadow-md py-2 justify-center mb-10 hover:bg-veryDark hover:text-white
                transition"
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0", opacity: 1 }}
                    transition={{ delay: 0.175 }}>
                    <FaArrowLeft />
                    Back
                </Link>
            </motion.div>
            <section className="grid md:grid-cols-2 items-center justify-between gap-6
            w-full">
                <motion.div
                    initial={{ y: "100%", x: "0%", opacity: 0 }}
                    animate={{ y: "0", x: "0%", opacity: 1 }}
                    transition={{ delay: 0.2 }}>
                    <Image src={country.flags.svg} width={400} height={400} alt={country.name}
                        className="w-full drop-shadow-sm rounded-sm my-6" />
                </motion.div>
                {/*  Info */}
                <motion.div className="grid gap-10 w-full md:justify-end"
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0", opacity: 1 }}
                    transition={{ delay: 0.175 }}>
                    <h1 className="font-bold text-2xl">{country.name}</h1>
                    <div className="flex flex-col gap-8 sm:flex-row">
                        <div className="grid gap-2">
                            <p className="font-bold">Native name
                                <span className="font-normal">: {country.nativeName}</span>
                            </p>

                            <p className="font-bold">Population: <span className="font-normal">{typeof country.population === 'number' ? country.population.toLocaleString() : country.population}</span></p>

                            <p className="font-bold">Region
                                <span className="font-normal">: {country.region}</span>
                            </p>
                            <p className="font-bold">Sub region
                                <span className="font-normal">: {country.subregion}</span>
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <p className="font-bold">Top level Domain
                                <span className="font-normal">: {country.topLevelDomain}</span>
                            </p>

                            <p className="font-bold">Currencies
                                <span className="font-normal">: {
                                    country.currencies
                                        ? country.currencies.map((currencie, i) => (
                                            <React.Fragment key={i}>
                                                {currencie.name}
                                            </React.Fragment>
                                        ))
                                        : 'N/A' // Si no hay currencies, muestra 'N/A' o un mensaje de tu elección
                                }</span>
                            </p>

                            <p className="font-bold">Languages
                                <span className="font-normal">: {country.languages.map((language, i) => (
                                    <React.Fragment key={i}>
                                        {language.name + ", "}
                                    </React.Fragment>
                                ))}</span>
                            </p>
                        </div>
                    </div>

                    {country.borders && country.borders.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                            <h3 className="font-bold">Border Countries:</h3>
                            <p className="flex gap-2 flex-wrap">
                                {country.borders.map((border, i) => (
                                    <span className="border border-black/[0.1] px-4 py-1
                                    rounded-md shadow-sm" key={i}>
                                        {border + ' '}
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}

                </motion.div>
            </section>
        </>
        </article>
    </section>

    )
}

export default Countrie
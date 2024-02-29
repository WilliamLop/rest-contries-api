import React from 'react'
import data from '../api/data.json';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0,
    }
  }),
}



const Contries = ({ contries, search }) => {

  const searchQuery = typeof search === 'string' ? search.toLowerCase() : '';

  const searchFilteredCountries = searchQuery
    ? contries.filter(country => country.name.toLowerCase().includes(searchQuery))
    : contries;

  // Filtrar los países Alemania, Estados Unidos, Brasil e Islandia
  const firstFourCountries = ['Germany', 'United States of America', 'Brazil', 'Iceland']
    .map(name => searchFilteredCountries.find(country => country.name === name))
    .filter(country => country); // Filtrar aquellos países que no se encuentren en el arreglo de datos

  // Concatenar los países restantes después de los primeros cuatro países seleccionados
  const restOfCountries = searchFilteredCountries.filter(country => !firstFourCountries.includes(country));

  // Unir los primeros cuatro países con los restantes
  const sortedCountries = firstFourCountries.concat(restOfCountries);
  return (

    <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-x-20
    h-auto transition"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0 }}
    >
      {sortedCountries.map((item, i) => {
        return (
          <Link href={`/Countries/${item.name}`} key={i}>
            <>
              <ul className="group">
                <motion.li className="shadow-md mt-12 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800
                dark:bg-darkBlue hover:duration-200
                overflow-hidden"
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  custom={i}>
                  <Image src={item.flags.png} className="w-full h-[250px] md:h-[180px] rounded-ss-md rounded-tr-md 
                    group-hover:scale-[1.08] object-cover duration-200" width={400} height={400} />
                  <div className="info px-4 py-8">
                    <h2 className="group-hover:text-blue-800 font-bold text-lg h-[60px] text-veryDark dark:text-white
                    dark:group-hover:text-blue-400 hover:duration-200">{item.name}</h2>

                    <div className="font-semibold text-veryDark dark:text-white">
                      <p className="">Population: <span className="font-light dark:text-white/70">{typeof item.population === 'number' ? item.population.toLocaleString() : item.population}</span>
                      </p>
                      <p className="my-1">Region:
                        <span className="font-light dark:text-white/70"> {item.region}</span>
                      </p>
                      <p className="">Capital:
                        <span className="font-light dark:text-white/70"> {item.capital}</span>
                      </p>
                    </div>
                  </div>
                </motion.li>

              </ul>
            </>
          </Link>
        )
      })}
    </motion.div>

  )
}

export default Contries
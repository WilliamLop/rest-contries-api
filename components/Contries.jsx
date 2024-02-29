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
  animate: (index) => ({
      opacity: 1,
      y:0,
      transition: {
          delay: 0,
      }
  }),
}



const Contries = ({ contries }) => {

    return (

    <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8
    h-auto group"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.175 }}
    >
      {contries.map((item, i) => {
      return (
        <Link href={`/Countries/${item.name}`} key={i}>
          <section className="group cursor-pointer">
            <ul className="">
                <motion.li className="shadow-md mt-12 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800"
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{
                    once: true,
                }}
                custom={i}>
                  <Image src={item.flags.png}  className="w-full h-[250px] md:h-[200px] rounded-ss-md rounded-tr-md
                    hover:scale-[1.04] transition object-cover
                    hover:translate-y-3
                    hover:-rotate-0" width={400} height={400}/>
                  <div className="info px-4 py-8">
                    <h2 className="font-bold text-lg mb-3">{item.name}</h2>

                    <div className="font-semibold">
                      <p className="">Population: <span className="font-normal">{typeof item.population === 'number' ? item.population.toLocaleString() : item.population}</span>
                      </p>
                      <p className="my-1">Region:
                        <span className="font-normal"> {item.region}</span>
                      </p>
                      <p className="">Capital:
                        <span className="font-normal"> {item.capital}</span>
                      </p>
                    </div>
                  </div>
                </motion.li>
              
            </ul>
          </section>
        </Link>
      )
      })}
    </motion.div>

    )
}

export default Contries
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background.jsx";
import Navbar from "../components/ui/navbar.jsx";
import {Link,NavLink} from 'react-router-dom'

export default function Landing() {
  return (
    <AuroraBackground>
      {/* <motion.div
        initial={{ opacity: 0.0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col items-center justify-center w-full"
      >
        <Navbar />
      </motion.div> */}
      <div className="flex flex-col items-center justify-center h-screen pt-16">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Flashcards are cool, you know?
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Creating flashcards has never been easier. Just type or paste your text and we'll do the rest.
          </div>
          <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            <Link to='/Generate' >Try it now</Link>
          </button>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}

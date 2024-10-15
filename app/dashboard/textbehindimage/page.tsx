"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { HeroImages } from "@/components/hero-images";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HeroParallaxImages } from "@/components/hero-parallax-images";
import { AdditionalInfo } from "@/components/additional-info";
import Link from "next/link";

const TextBehindImage = () => {
  const handleOpenApp = () => {
    window.open("https://textbehindimage.rexanwong.xyz/app", "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen items-center w-full cover-fit">
      <HeroHighlight>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-bold text-black dark:text-white"
        >
          Create <Highlight className="text-white">text-behind-image</Highlight>{" "}
          designs easily
        </motion.h1>
      </HeroHighlight>
      <button
        onClick={handleOpenApp}
        className="mb-10 mt-8 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 rounded-full"
      >
        <HoverBorderGradient containerClassName="rounded-full">
          Open the app
        </HoverBorderGradient>
      </button>

      <div className="w-full h-full mt-2">
        <HeroImages />
        <HeroParallaxImages />
      </div>
      <div className="flex flex-col items-center justify-center my-10">
        <AdditionalInfo />
        <div className="text-2xl mt-10">
          Created by{" "}
          <Link
            href={"https://github.com/rohanrs09/"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:font-bold"
          >
            Rohan Shelke
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TextBehindImage;

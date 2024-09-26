"use client";

import Header from "@/components/Header";
import { HeroVideoDialogDemo } from "@/components/HeroVideoDialogDemo";
import GridPattern from "@/components/magicui/grid-pattern";
import { OrbitingCirclesDemo } from "@/components/OrbitingCirclesDemo";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const words = [
    {
      text: "AI",
      className: "mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl",
    },
    {
      text: "Content",
      className: "mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl",
    },

    {
      text: "Generator.",
      className:
        "mb-4 text-4xl font-extrabold md:text-5xl lg:text-6xl text-primary dark:text-blue-500",
    },
  ];

  return (
    <div>
      <Header />
      <div>
        <section className=" z-50">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <div className="flex justify-center items-center">
              <TypewriterEffectSmooth
                className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center"
                words={words}
              />
            </div>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Boost your content creation with our AI Platform , providing
              engaging and top-quality text instantly.
            </p>
            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Link href="/dashboard" legacyBehavior>
                <a className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                  Get Started
                  <svg
                    className="ml-2 -mr-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
            
          </div>
          <div className="flex flex-col items-center justify-center h-screen p-8">
            <div>
              <h1 className="mb-4 text-4xl pb-4 font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                DEMO <span className="text-primary">Video</span>{" "}
              </h1>
            </div>
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
              {/* HeroVideoDialogDemo will be centered within this box */}
              <HeroVideoDialogDemo />
            </div>
          </div>

          <GridPattern
            width={30}
            height={30}
            x={-1}
            y={-1}
            strokeDasharray={"4 2"}
            className={cn(
              "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
            )}
          />
        </section>
      </div>
    </div>
  );
}

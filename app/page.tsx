"use client";

// Import existing components
import Header from "@/components/Header";
import { HeroVideoDialogDemo } from "@/components/HeroVideoDialogDemo";
import GridPattern from "@/components/magicui/grid-pattern";
import { OrbitingCirclesDemo } from "@/components/OrbitingCirclesDemo";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/ui/shared/AppHeader";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// New imports for enhanced UI
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Sparkles,
  MessageSquare,
  Zap,
  PieChart,
  Users,
  ArrowRight,
  FileText,
  Share2,
  BarChart,
  Wand2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import { BackgroundBeams } from "@/components/background-beams";
import { BentoGrid, BentoGridItem } from "@/components/bento-grid";
import { HoverEffect } from "@/components/hover-effect";

export default function Home() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for hover effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    <ParallaxProvider>
      <div className="relative overflow-hidden">
        <AppHeader />

        {/* Hero Section - Enhanced */}
        <section className="relative z-10 overflow-hidden pt-24 pb-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/70 via-white to-white"></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute pointer-events-none inset-0 -z-10 overflow-hidden"
          >
            <svg
              className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)"></stop>
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)"></stop>
                  <stop
                    offset="100%"
                    stopColor="rgba(236, 72, 153, 0.4)"
                  ></stop>
                </linearGradient>
              </defs>
              <circle
                cx="16"
                cy="16"
                r="16"
                fill="url(#gradient)"
                fillOpacity="0.2"
                transform="scale(50)"
              ></circle>
            </svg>
          </motion.div>

          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center items-center"
            >
              <TypewriterEffectSmooth
                className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center"
                words={words}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48"
            >
              Boost your content creation with our AI Platform, providing
              engaging and top-quality text instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"
            >
              <Link href="/dashboard" legacyBehavior>
                <a className="group relative inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary transition-all hover:shadow-lg hover:shadow-primary/30 overflow-hidden">
                  <span className="z-10 relative flex items-center">
                    Get Started
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  </span>
                  <span className="absolute top-0 left-0 w-0 h-full bg-white/20 transform skew-x-12 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </Link>
            </motion.div>

            {/* Floating elements */}
            <div className="hidden md:block">
              <motion.div
                className="absolute top-10 right-20 w-12 h-12 bg-blue-100 rounded-full"
                animate={{ y: [0, -15, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-20 left-20 w-8 h-8 bg-purple-100 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute top-32 left-40 w-6 h-6 bg-pink-100 rounded-full"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </div>
          </div>
        </section>

        {/* Demo Video Section - Premium Design */}
        <section className="py-20 md:py-28 relative bg-gradient-to-b from-white to-gray-50/80">
          {/* Grid background with proper z-index and opacity */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                See It In Action
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                <span className="inline relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Demo Video
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="6"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C40 4 150 4 298 10"
                      stroke="url(#paint0_linear)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="2"
                        y1="10"
                        x2="298"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6366F1" stopOpacity="0.1" />
                        <stop
                          offset="0.5"
                          stopColor="#6366F1"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="1"
                          stopColor="#7C3AED"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                See how AI-Gen transforms your content creation workflow in
                minutes with our powerful and intuitive platform.
              </p>
            </div>

            {/* Video Showcase Card */}
            <div className="max-w-4xl mx-auto relative group">
              {/* Premium Card Design */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:border-primary/20 overflow-hidden">
                {/* Card Top Corner */}
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-primary to-purple-600 px-4 py-1 rounded-bl-lg text-white text-xs font-medium">
                    Platform Tutorial
                  </div>
                </div>

                {/* HeroVideoDialogDemo Component */}
                <div className="relative rounded-xl overflow-hidden mt-4 mb-6 shadow-md group-hover:shadow-lg transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-400/10 z-10 pointer-events-none rounded-xl" />
                  <HeroVideoDialogDemo />
                </div>

                {/* Video Info */}
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      How AI-Gen Works
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Learn how to use our platform in less than 4 minutes
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Download Resources Button */}
                    <button className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors">
                      <svg
                        className="w-4 h-4 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 11V17L11 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 17L7 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Resources
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Shadow Blur */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-primary/5 blur-xl rounded-full"></div>
            </div>

            {/* Video Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-center">
              {/* Feature cards - same as before */}
            </div>
          </div>
        </section>

        {/* Content Challenges Section - Premium Design */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/80">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_60%)]"></div>
            <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-[radial-gradient(circle,rgba(244,183,213,0.08),transparent_70%)]"></div>
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-50/90 to-transparent"></div>
            <div className="hidden md:block absolute top-24 right-24 w-72 h-72 rounded-full border border-primary/5"></div>
            <div className="hidden md:block absolute bottom-36 left-36 w-60 h-60 rounded-full border border-primary/5"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
              <div className="itext-center mb-4">
                <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
                  Content Solutions
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                <span className="inline relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Solve Real Content Challenges
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="6"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C40 4 150 4 298 10"
                      stroke="url(#paint0_linear)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="2"
                        y1="10"
                        x2="298"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6366F1" stopOpacity="0.1" />
                        <stop
                          offset="0.5"
                          stopColor="#6366F1"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="1"
                          stopColor="#7C3AED"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
                Our AI platform tackles your most complex content needs with
                industry-specific templates and customizable outputs.
              </p>
            </div>

            {/* Content Challenge Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Marketing Copy",
                  description:
                    "Convert more visitors into customers with persuasive messaging.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.5 19H8C4 19 2 18 2 13V8C2 4 4 2 8 2H16C20 2 22 4 22 8V13C22 17 20 19 16 19H15.5C15.19 19 14.89 19.15 14.7 19.4L13.2 21.4C12.54 22.28 11.46 22.28 10.8 21.4L9.3 19.4C9.14 19.18 8.77 19 8.5 19Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.9965 11H16.0054"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9955 11H12.0045"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.99451 11H8.00349"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-blue-500 to-sky-400",
                  stats: "30% more conversions",
                  color: "blue",
                },
                {
                  title: "Blog Articles",
                  description:
                    "Boost authority and organic traffic with engaging content.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 13H13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 17H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-emerald-500 to-green-400",
                  stats: "2x search visibility",
                  color: "emerald",
                },
                {
                  title: "Product Descriptions",
                  description:
                    "Drive sales with compelling benefit-focused descriptions.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.17004 7.44L12 12.55L20.77 7.47"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 21.61V12.54"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.93 2.48L4.59 5.45C3.38 6.12 2.39 7.80001 2.39 9.18001V14.83C2.39 16.21 3.38 17.89 4.59 18.56L9.93 21.53C11.07 22.16 12.94 22.16 14.08 21.53L19.42 18.56C20.63 17.89 21.62 16.21 21.62 14.83V9.18001C21.62 7.80001 20.63 6.12 19.42 5.45L14.08 2.48C12.93 1.84 11.07 1.84 9.93 2.48Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 13.24V9.58002L7.51001 4.09998"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-purple-500 to-violet-400",
                  stats: "40% conversion lift",
                  color: "purple",
                },
                {
                  title: "Social Media",
                  description:
                    "Create engaging posts that grow your audience consistently.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 18.43H13L8.55 20.96C7.89 21.35 7 20.89 7 20.12V18.43C4 18.43 2 16.43 2 13.43V7.42993C2 4.42993 4 2.42993 7 2.42993H17C20 2.42993 22 4.42993 22 7.42993V13.43C22 16.43 20 18.43 17 18.43Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82001C13.25 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.92 6.85999 12 6.85999C11.08 6.85999 10.34 7.60002 10.34 8.52002"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9945 13.75H12.0035"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-amber-500 to-orange-400",
                  stats: "3x more engagement",
                  color: "amber",
                },
              ].map((challenge, index) => (
                <div key={index} className="group relative">
                  <div className="h-full bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden border border-gray-100 group-hover:border-primary/20">
                    {/* Tag Badge in top corner */}
                    <div className={`absolute top-0 right-0`}>
                      <div
                        className={`bg-gradient-to-r ${challenge.gradient} px-4 py-1 rounded-bl-lg text-white text-xs font-medium`}
                      >
                        {challenge.color === "blue"
                          ? "Marketing"
                          : challenge.color === "emerald"
                          ? "Content"
                          : challenge.color === "purple"
                          ? "E-commerce"
                          : "Social"}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${challenge.gradient} text-white mb-6`}
                    >
                      {challenge.icon("h-6 w-6")}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-600">{challenge.description}</p>

                    {/* Stats with highlight effect */}
                    <div className="flex items-center mt-5 pt-4 border-t border-gray-100">
                      <div
                        className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${challenge.gradient} mr-2`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {challenge.stats}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How AI-Gen Works - Clean Modern Design */}
        <section className="py-20 md:py-28 relative bg-gradient-to-b from-white to-gray-50/80">
          {/* Subtle background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="inline relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Simple 3-Step Process
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="6"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C40 4 150 4 298 10"
                      stroke="url(#paint0_linear)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="2"
                        y1="10"
                        x2="298"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6366F1" stopOpacity="0.1" />
                        <stop
                          offset="0.5"
                          stopColor="#6366F1"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="1"
                          stopColor="#7C3AED"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Transform your content creation workflow with our AI-powered
                platform in three easy steps.
              </p>
            </div>

            {/* Process steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  number: "1",
                  title: "Choose Template",
                  description:
                    "Select from our library of specialized templates designed for different content needs.",
                  icon: (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 2V5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16 2V5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M3.5 9.08984H20.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8.5 14.5H7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16.5 14.5H15.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12.5 14.5H11.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8.5 18.5H7.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M16.5 18.5H15.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12.5 18.5H11.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ),
                },
                {
                  number: "2",
                  title: "Fill Details",
                  description:
                    "Provide key information and preferences to guide the AI in creating your perfect content.",
                  icon: (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.91 4.15002C15.58 6.54002 17.45 8.41002 19.85 9.09002"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  number: "3",
                  title: "Generate & Use",
                  description:
                    "Instantly receive high-quality content you can download, copy, or refine further.",
                  icon: (
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.67 18.95L7.6 15.64C8.39 15.11 9.53 15.17 10.24 15.78L10.57 16.07C11.35 16.74 12.61 16.74 13.39 16.07L17.55 12.5C18.33 11.83 19.59 11.83 20.37 12.5L22 13.9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((step, index) => (
                <div key={index} className="relative group">
                  {/* Connection line (desktop only) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gray-200 z-0"></div>
                  )}

                  <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 h-full relative z-10 transition-all duration-300 hover:shadow-xl group-hover:-translate-y-1">
                    {/* Step number */}
                    <div className="absolute -top-3 -right-3">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-6 text-primary">{step.icon}</div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
              {[
                {
                  title: "Easy to Use",
                  description: "No technical skills required.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.75 12L10.58 14.83L16.25 9.17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Fast Results",
                  description: "Generate content in seconds.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6V12L15 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: "100% Editable",
                  description: "Customize to match your needs.",
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.02 5.82999L15.12 7.92999L7.72 15.33H5.62V13.23L13.02 5.82999Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9201 16.83H19.9201"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9201 3.5C5.33008 3.5 2.51008 6.93 2.51008 12C2.51008 17.07 5.33008 20.5 11.9201 20.5C18.5101 20.5 21.3301 17.07 21.3301 12C21.3301 10.22 21.0101 8.73 20.4101 7.53"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates Section - Premium Design */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50/80 to-white">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(120,119,198,0.05),transparent_60%)]"></div>
            <div className="absolute bottom-1/3 left-0 w-1/3 h-1/3 bg-[radial-gradient(circle,rgba(183,213,244,0.08),transparent_70%)]"></div>
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-50/90 to-transparent"></div>
            <div className="hidden md:block absolute bottom-24 right-24 w-72 h-72 rounded-full border border-primary/5"></div>
            <div className="hidden md:block absolute top-36 left-36 w-60 h-60 rounded-full border border-primary/5"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
              <div className="text-center mb-4">
                <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
                  Template Library
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                <span className="inline relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Templates For Every Need
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="6"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C40 4 150 4 298 10"
                      stroke="url(#paint0_linear)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="2"
                        y1="10"
                        x2="298"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6366F1" stopOpacity="0.1" />
                        <stop
                          offset="0.5"
                          stopColor="#6366F1"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="1"
                          stopColor="#7C3AED"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
                Browse our extensive template library designed to help you
                create any type of content with ease and efficiency.
              </p>
            </div>

            {/* Templates Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Blog Post",
                  description:
                    "Create engaging articles on any topic with proper structure and SEO optimization.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 10H18C15 10 14 9 14 6V2L22 10Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 13H13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 17H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-blue-500 to-sky-400",
                  stats: "10 min average save",
                  color: "blue",
                },
                {
                  title: "Product Description",
                  description:
                    "Highlight features and benefits that drive sales with compelling product narratives.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.17004 7.44L12 12.55L20.77 7.47"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 21.61V12.54"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.93 2.48L4.59 5.45C3.38 6.12 2.39 7.80001 2.39 9.18001V14.83C2.39 16.21 3.38 17.89 4.59 18.56L9.93 21.53C11.07 22.16 12.94 22.16 14.08 21.53L19.42 18.56C20.63 17.89 21.62 16.21 21.62 14.83V9.18001C21.62 7.80001 20.63 6.12 19.42 5.45L14.08 2.48C12.93 1.84 11.07 1.84 9.93 2.48Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 13.24V9.58002L7.51001 4.09998"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-emerald-500 to-green-400",
                  stats: "50+ variants included",
                  color: "emerald",
                },
                {
                  title: "Email Campaign",
                  description:
                    "Create emails that get opened, read and clicked with attention-grabbing templates.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-purple-500 to-violet-400",
                  stats: "35% higher open rate",
                  color: "purple",
                },
                {
                  title: "Social Media Posts",
                  description:
                    "Generate engaging content optimized for any social platform that drives engagement.",
                  icon: (className: string) => (
                    <svg
                      className={className}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 18.43H13L8.55 20.96C7.89 21.35 7 20.89 7 20.12V18.43C4 18.43 2 16.43 2 13.43V7.42993C2 4.42993 4 2.42993 7 2.42993H17C20 2.42993 22 4.42993 22 7.42993V13.43C22 16.43 20 18.43 17 18.43Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11.36V11.15C12 10.47 12.42 10.11 12.84 9.82001C13.25 9.54001 13.66 9.18002 13.66 8.52002C13.66 7.60002 12.92 6.85999 12 6.85999C11.08 6.85999 10.34 7.60002 10.34 8.52002"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.9945 13.75H12.0035"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                  gradient: "from-amber-500 to-orange-400",
                  stats: "10 formats per platform",
                  color: "amber",
                },
              ].map((template, index) => (
                <div key={index} className="group relative">
                  <div className="h-full bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden border border-gray-100 group-hover:border-primary/20">
                    {/* Tag Badge in top corner */}
                    <div className={`absolute top-0 right-0`}>
                      <div
                        className={`bg-gradient-to-r ${template.gradient} px-4 py-1 rounded-bl-lg text-white text-xs font-medium`}
                      >
                        {template.color === "blue"
                          ? "Article"
                          : template.color === "emerald"
                          ? "E-commerce"
                          : template.color === "purple"
                          ? "Marketing"
                          : "Social"}
                      </div>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${template.gradient} text-white mb-6`}
                    >
                      {template.icon("h-6 w-6")}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {template.title}
                    </h3>
                    <p className="text-gray-600">{template.description}</p>

                    {/* Stats with highlight effect */}
                    <div className="flex items-center mt-5 pt-4 border-t border-gray-100">
                      <div
                        className={`w-8 h-1.5 rounded-full bg-gradient-to-r ${template.gradient} mr-2`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700">
                        {template.stats}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials - Enhanced with Grid Background */}
        <section className="py-20 md:py-28 relative bg-gradient-to-b from-white to-gray-50/80">
          {/* Grid background from How AI-Gen Works section */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="inline relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    What Our Users Say
                  </span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="6"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C40 4 150 4 298 10"
                      stroke="url(#paint0_linear)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="2"
                        y1="10"
                        x2="298"
                        y2="10"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#6366F1" stopOpacity="0.1" />
                        <stop
                          offset="0.5"
                          stopColor="#6366F1"
                          stopOpacity="0.7"
                        />
                        <stop
                          offset="1"
                          stopColor="#7C3AED"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Discover why thousands of content creators trust AI-Gen for
                their professional content needs.
              </p>
            </div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  quote:
                    "AI-Gen has transformed our content strategy. We produce twice the content in half the time, with consistent quality our audience loves.",
                  name: "Jane Doe",
                  role: "Marketing Director",
                  company: "TechGrowth Inc.",
                  avatar: "JD",
                  rating: 5,
                  gradient: "from-blue-500 to-sky-400",
                  color: "blue",
                },
                {
                  quote:
                    "AI-Gen's templates are incredible! Never facing a blank page again. Reached 60K video views in just 10 days using this platform.",
                  name: "Rohan Shelke",
                  role: "Content Creator",
                  company: "Shodhak Pravasi",
                  avatar: "SP",
                  rating:5,
                  gradient: "from-purple-500 to-violet-400",
                  color: "purple",
                },
                {
                  quote:
                    "Our product descriptions used to be our bottleneck. With AI-Gen, we can create compelling descriptions for our entire catalog in record time.",
                  name: "Emily Johnson",
                  role: "E-commerce Manager",
                  company: "StyleMart",
                  avatar: "EJ",
                  rating: 5,
                  gradient: "from-emerald-500 to-green-400",
                  color: "emerald",
                },
              ].map((testimonial, index) => (
                <div key={index} className="group relative">
                  <div className="h-full bg-white rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden border border-gray-100 group-hover:border-primary/20">
                    {/* Quote icon in top corner */}
                    <div className="absolute top-0 right-0">
                      <div
                        className={`bg-gradient-to-r ${testimonial.gradient} px-4 py-1 rounded-bl-lg text-white text-xs font-medium`}
                      >
                        {testimonial.color === "blue"
                          ? "Marketing"
                          : testimonial.color === "emerald"
                          ? "E-commerce"
                          : "Content Creator"}
                      </div>
                    </div>

                    {/* Testimonial content */}
                    <div className="mb-6 pt-4">
                      {/* Quote marks */}
                      <div className={`text-4xl font-serif text-gray-200 mb-2`}>
                        "
                      </div>
                      <p className="text-gray-600 relative z-10">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* User info and rating */}
                    <div className="flex items-center mt-5 pt-4 border-t border-gray-100">
                      {/* Avatar */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${testimonial.gradient} text-white mr-3 flex-shrink-0`}
                      >
                        <span className="font-bold text-sm">
                          {testimonial.avatar}
                        </span>
                      </div>

                      {/* Name and role */}
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>

                      {/* Star rating */}
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    {/* Bottom gradient line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16 text-gray-400">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-700">
                  1k+
                </div>
                <div className="text-sm mt-1">Active Users</div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-700">
                  4.9/5
                </div>
                <div className="text-sm mt-1">Average Rating</div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-700">
                  99%
                </div>
                <div className="text-sm mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Final Last Section - Streamlined Design */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50/80 to-white">
          {/* Simple background with blur effects - grid removed */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Two column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left column - CTA messaging */}
              <div>
                <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  Get Started Today
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Transform Your Content Creation
                  </span>
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-xl">
                  Join thousands of content creators, marketers, and businesses
                  who have revolutionized their workflow with AI-Gen.
                </p>

                <div className="space-y-5 mb-8">
                  {[
                    "Generate high-quality content in seconds",
                    "Access 25+ specialized templates",
                    "Custom outputs for any industry or purpose",
                    "Free plan available, no credit card required",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="mt-1 mr-3 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2.5 6L5 8.5L9.5 4"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <Link
                    href="/dashboard"
                    className="inline-flex justify-center items-center py-3 px-8 text-base font-medium text-white rounded-lg bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Get Started for Free
                  </Link>
                </div>

                {/* Direct email contact */}
                <div className="mt-8 flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    Contact us:{" "}
                    <a
                      href="mailto:aigen@gmail.com"
                      className="font-medium text-primary hover:underline"
                    >
                      aigen@gmail.com
                    </a>
                  </span>
                </div>
              </div>

              {/* Right column - Newsletter signup with working email functionality */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold mb-2">
                  Join Our AI Content Community
                </h3>
                <p className="text-gray-600 mb-6">
                  Get AI content tips, exclusive templates, and early access to
                  new features.
                </p>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();

                    // Get form elements
                    const form = e.currentTarget;
                    const email = form.email.value;
                    const interest = form.interests.value;
                    const wantsUpdates = form.updates.checked;
                    const loadingEl = document.getElementById("form-loading") as HTMLElement;
                    const successMsg = document.getElementById("form-success") as HTMLElement;
                    const errorMsg = document.getElementById("form-error") as HTMLElement;

                    // Show loading state
                    if (loadingEl) {
                      loadingEl.classList.remove("hidden");
                      loadingEl.classList.add("flex", "items-center");
                    }
                    if (successMsg) successMsg.classList.add("hidden");
                    if (errorMsg) errorMsg.classList.add("hidden");

                    // Create the email content
                    const subject = "New AI-Gen Community Signup";
                    const body = `
New signup for AI-Gen:
Email: ${email}
Content interest: ${interest || "Not specified"}
Wants updates: ${wantsUpdates ? "Yes" : "No"}
`;

                    // Encode email parameters
                    const mailtoLink = `mailto:shelkerohan7309@gmail.com?subject=${encodeURIComponent(
                      subject
                    )}&body=${encodeURIComponent(body)}`;

                    // Create and click a hidden link to open email client
                    const link = document.createElement("a");
                    link.href = mailtoLink;
                    link.target = "_blank";

                    // Use Fetch API to simulate sending without leaving the page
                    fetch(
                      "https://formsubmit.co/ajax/shelkerohan7309@gmail.com",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                        },
                        body: JSON.stringify({
                          email: email,
                          interest: interest || "Not specified",
                          wantsUpdates: wantsUpdates ? "Yes" : "No",
                          _subject: subject,
                        })
                      })
                      .then((response) => {
                        // Hide loading
                        if (loadingEl) loadingEl.classList.add("hidden");

                        // Show success and reset form
                        if (successMsg) successMsg.classList.remove("hidden");
                        form.reset();

                        // Also open the email client as backup
                        link.click();

                        setTimeout(() => {
                          if (successMsg) successMsg.classList.add("hidden");
                        }, 5000);
                      })
                        .catch((error) => {
                          // Hide loading
                          if (loadingEl) loadingEl.classList.add("hidden");
                          
                          // Show error message
                          if (errorMsg) errorMsg.classList.remove("hidden");
                          
                          // Fallback to opening email client directly
                          console.error("Form submission error:", error);
                          link.click();
  
                          setTimeout(() => {
                            if (errorMsg) errorMsg.classList.add("hidden");
                          }, 5000);
                          });
                    }}>
                        
                      <div>
                        <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="your@email.com"
                      />
                  </div>

                  <div>
                    <label
                      htmlFor="interests"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      What content do you create most?
                    </label>
                    <select
                      id="interests"
                      name="interests"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all bg-white"
                    >
                      <option value="">Select your primary content</option>
                      <option value="blog">Blog Articles & Long Form</option>
                      <option value="marketing">Marketing & Ad Copy</option>
                      <option value="product">Product Descriptions</option>
                      <option value="social">Social Media Content</option>
                      <option value="email">Email Campaigns</option>
                      <option value="other">Other Content Types</option>
                    </select>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="updates"
                        name="updates"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary/50"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="updates" className="text-gray-600">
                        Send me AI content tips and product updates (no more than
                        once a week)
                      </label>
                    </div>
                  </div>

                  <div
                    id="form-loading"
                    className="hidden p-3 bg-blue-50 text-blue-700 rounded-lg text-sm"
                  >
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-blue-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending your information...
                  </div>

                  <div
                    id="form-success"
                    className="hidden p-3 bg-green-50 text-green-700 rounded-lg text-sm"
                  >
                    Thank you! You've been added to our newsletter.
                  </div>

                  <div
                    id="form-error"
                    className="hidden p-3 bg-red-50 text-red-700 rounded-lg text-sm"
                  >
                    There was an error sending your information. Please try
                    again or email us directly.
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 px-6 text-white bg-gradient-to-r from-primary to-purple-600 rounded-lg font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1"
                    >
                      Subscribe
                    </button>
                  </div>

                  <p className="text-xs text-gray-500 mt-4">
                    We respect your privacy. You can unsubscribe at any time.
                  </p>
                </form>
              </div>
            </div>

            {/* Simple copyright */}
            <div className="mt-16 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} AI-Gen. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </div>
    </ParallaxProvider>
  );
}

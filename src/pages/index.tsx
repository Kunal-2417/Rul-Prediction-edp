import Image from 'next/image'
import Link from 'next/link';
import React,{useContext} from "react";
import { Carousel } from "antd";
import { UserContext } from "@/context/UserContext";
import RotatingCubes from "../components/ui/rotating-cube";
import { TypewriterEffect } from '../components/ui/typewriter-effect';
import { SparklesCore } from '@/components/ui/sparkles';

export default function Home() {
  const words = [
    {
      text: "Want",
      className:"text-black dark:text-black text-10 z-0"
    },
    {
      text: "to",
      className: "text-black dark:text-black z-0"
    },
    {
      text: "Predict",
      className: "text-black dark:text-black z-0"
    },
    {
      text: "Tool",
      className: "text-blue-500 dark:text-blue-500 z-0",

    },
    {
      text: "Life?",
      className: "text-blue-500 dark:text-blue-500 z-0",
    },
  ];

  return (
    <>
       
      <main className="flex  item-center justify-center">

        <div className="flex justify-between mt-8">

          <div className="flex flex-col items-center ">
            <div className="text-black Z-0">
              <TypewriterEffect words={words} />
              <p className="text-gray-600 dark:text-gray-800 text-base  mb-10">
                We've Got You Covered!
              </p>
            </div>
            <Link href="/dashboard">
              <button className="mt-0 primary">Go to Dashboard</button>
            </Link>
          </div>
          <div className="index-z bg-green-400 mt-[-50px]">
            <RotatingCubes />
          </div>
        </div>
      </main>
    </>
  );
}

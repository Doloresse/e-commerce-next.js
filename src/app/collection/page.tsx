"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const images = [
  "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp",
  "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
  "https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp",
  "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
  "https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp",
  "https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp",
  "https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp",
];

export default function Collection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ left: currentIndex * container.offsetWidth, behavior: 'smooth' });
    }
  }, [currentIndex]);

  return (
    // <div className="flex flex-col h-screen w-full bg-gray-950">
    //   <Navbar />
    <div className="flex bg-gray-950 w-full h-screen">
        <div className="text-center ml-10">
            <h1 className=" tracking-tight text-center font-bold text-white sm:text-5xl md:text-6xl">
                <span className="text-4xl block mt-60">Bienvenue chez</span>
                <span className="block text-6xl font-bold text-indigo-600 mt-6">EASY SHOP</span>
            </h1>
            <p className="text-center text-xl mt-6 text-gray-200  mx-auto">
                Découvrez notre collection exclusive de produits de luxe, conçus pour les amateurs de raffinement et d'élégance.
            </p>
        </div>
        <div className="flex-grow relative overflow-hidden">
            <div 
                ref={containerRef}
                className="flex h-full transition-transform duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                {images.map((src, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full flex items-center justify-center">
                    <img
                        src={src}
                        className="w-[350px] h-auto object-cover"
                        alt={`Carousel image ${index + 1}`}
                    />
            </div>
            ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
        >
          <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none"
        >
          <ChevronRightIcon className="h-6 w-6 text-gray-800" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
    </div>
    // </div>
  );
}
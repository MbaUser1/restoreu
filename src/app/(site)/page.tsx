import React from "react";
import Image from "next/image";

export default function Acceuil() {
  return (
    <section className="bg-gray-50 pt-12 sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-gray-600 font-inter px-6 text-lg">
            Smart email campaign builder, made for Developers
          </h1>
          <p className="text-gray-900 font-pj mt-5 text-4xl font-bold leading-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight">
            Turn your visitors into profitable
            <span className="relative inline-flex sm:inline">
              <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] opacity-30 blur-lg filter"></span>
              <span className="relative"> business </span>
            </span>
          </p>

          <div className="mt-9 px-8 sm:flex sm:items-center sm:justify-center sm:space-x-5 sm:px-0">
            <a
              href="#"
              title=""
              className="bg-gray-900 font-pj hover:bg-gray-600 focus:ring-gray-900 inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent px-8 py-3 text-lg font-bold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:w-auto"
              role="button"
            >
              Get more customers
            </a>

            <a
              href="#"
              title=""
              className="text-gray-900 border-gray-400 font-pj focus:ring-gray-900 hover:bg-gray-900 focus:bg-gray-900 hover:border-gray-900 focus:border-gray-900 mt-4 inline-flex w-full items-center justify-center rounded-xl border-2 px-6 py-3 text-lg font-bold transition-all duration-200 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:w-auto"
              role="button"
            >
              <svg
                className="mr-2 h-5 w-5"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.18003 13.4261C6.8586 14.3918 5 13.448 5 11.8113V5.43865C5 3.80198 6.8586 2.85821 8.18003 3.82387L12.5403 7.01022C13.6336 7.80916 13.6336 9.44084 12.5403 10.2398L8.18003 13.4261Z"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Watch free demo
            </a>
          </div>

          <p className="text-gray-500 font-inter mt-8 text-base">
            60 Days free trial · No credit card required
          </p>
        </div>
      </div>

      <div className="pb-12 ">
        <div className="relative">
          <div className="bg-gray-50 absolute inset-0 h-2/3"></div>
          <div className="relative mx-auto">
            <div className="lg:mx-auto lg:max-w-6xl">
              <Image
                src="https://cdn.rareblocks.xyz/collection/clarity/images/hero/2/illustration.png"
                className="scale-110 transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

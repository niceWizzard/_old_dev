import React from "react";

const Hero = () => {
  return (
    <section className="my-16 container">
      <h1 className="text-4xl font-bold text-center">
        Find your next dream job
      </h1>
      <form className="flex gap-2 mt-4 max-w-xl mx-auto">
        <input
          type="search"
          className="border w-full py-2 px-3 rounded-md border-gray-400"
          placeholder="Search jobs..."
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
          Search
        </button>
      </form>
    </section>
  );
};

export default Hero;

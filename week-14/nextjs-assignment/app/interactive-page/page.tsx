"use client";

import { useState } from "react";

export default function Interactive() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-[40%] mx-auto mt-28 flex flex-col">
      <h1 className="text-3xl font-bold">Welcome to Interactive Page</h1>
      <p className="text-lg mt-7">
        Welcome to Interactive Page This route features a count button that
        demonstrates the power of client-side interactivity in Next.js. Click
        the button and see the count go up! This interactive feature is powered
        by the `use client`` directive in Next.js, which allows this component
        to be rendered on the client-side.
      </p>
      <button
        className="mt-5 p-2 px-4 text-lg border-2 border-black rounded-lg w-max"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Count is {count}
      </button>
    </div>
  );
}

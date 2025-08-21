"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-5xl font-bold text-center">
        welcome to{" "}
        <span className="cursor-pointer text-white hover:text-blue-400">#campus-hub</span>
      </h1>
      <div className="mt-8 flex gap-6">
        <Link
          href="/login"
          className="rounded-full border border-white bg-white text-black px-6 py-3 font-semibold transition-colors hover:bg-black hover:text-white"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-full border border-white bg-white text-black px-6 py-3 font-semibold transition-colors hover:bg-black hover:text-white"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

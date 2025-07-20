import React from "react";
import { FizzLogo } from "./FizzLogo";


type Props = {};

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#FEE832] text-[#FE6334]">
      <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10">
        <FizzLogo />
      </div>
    </footer>
  );
}
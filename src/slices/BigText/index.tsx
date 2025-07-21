import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { JSX } from "react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ slice }: BigTextProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-screen overflow-hidden bg-[#FE6334] text-[#FEE832]"
    >
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[30vw]">Fizz</div>
        <div className="grid gap-[3vw] text-[30vw] md:flex md:text-[11vw] md:items-center md:justify-center">
          <span className="inline-block">full </span>
          <span className="inline-block max-md:text-[27vw]">of </span>
          <span className="inline-block max-md:text-[28vw]">happy </span>
        </div>
        <div className="text-[25vw]">vibes</div>
      </h2>
    </section>
  );
};

export default BigText;
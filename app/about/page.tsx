import TransitionLink from "@/components/TransitionLink";
import Link from "next/link";

export default function About() {
  return (
    <main className="bg-neutral-100 text-black w-screen h-screen flex flex-col items-center justify-center gap-[50px]">
      <h1 className="text-5xl">ABOUT PAGE</h1>
      <Link href="/">{"Home ->"}</Link>
    </main>
  );
}

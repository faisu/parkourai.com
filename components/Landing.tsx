'use client'
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TransitionLink from './TransitionLink';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// components/Hero.js
function Hero() {
    const main = useRef<HTMLElement | any>();

    useGSAP(() => {
        gsap.timeline({
            scrollTrigger: {
                trigger: main.current,
                start: "top 80px",
                end: "+=800", // pin for 800 pixels worth of scroll
                scrub: true,
                pin: true
            }
        }).from(".box", {
            visibility: "hidden",
            duration: 0.01, // just a tiny amount of duration so it's like a toggle since visibility isn't really animatable. 
            stagger: 0.5 // stagger the starting time of each subsequent reveal
        })
        .fromTo('.title',
            { fontSize: "80px", ease: "power4.inOut" },
            { fontSize: "60px", ease: "power4.inOut" },
            'start'
        );
    }, { scope: main });

    return (
        <section className="mb-40">

            {/* // SVG Background */}
            <span className="[&>svg]:absolute [&>svg]:-z-10 [&>svg]:hidden [&>svg]:h-[560px] [&>svg]:w-full [&>svg]:lg:block">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"
                    className="absolute top-[60px] hidden h-[580px] w-full transition-opacity duration-300 lg:block">
                    <defs>
                        <linearGradient id="sw-gradient-light" x1="0" x2="0" y1="1" y2="0">
                            <stop stopColor="hsl(209, 92.2%, 92.1%)" offset="0%"></stop>
                            <stop stopColor="hsl(209, 92.2%, 99.1%)" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#sw-gradient-light)"
                        d="M -0.664 3.46 C -0.664 3.46 405.288 15.475 461.728 21.285 C 601.037 35.625 672.268 76.086 701.056 97.646 C 756.056 138.838 797.267 216.257 857.745 245.156 C 885.704 258.516 980.334 280.547 1048.511 268.826 C 1121.622 256.256 1199.864 226.267 1214.176 220.176 C 1241.273 208.643 1280.201 191.509 1343.494 179.436 C 1434.325 162.111 1439.504 196.099 1439.503 183.204 C 1439.502 161.288 1440 0 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L -0.664 3.46 Z">
                    </path>
                </svg>
                <svg data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none"
                    className="absolute top-[60px] hidden h-[580px] w-full opacity-0 transition-opacity duration-300 lg:block">
                    <defs>
                        <linearGradient id="sw-gradient-dark" x1="0" x2="0" y1="1" y2="0">
                            <stop stopColor="hsl(240, 4%, 28%)" offset="0%"></stop>
                            <stop stopColor="hsl(0, 0%, 15%)" offset="100%"></stop>
                        </linearGradient>
                    </defs>
                    <path fill="url(#sw-gradient-dark)"
                        d="M -0.664 3.46 C -0.664 3.46 405.288 15.475 461.728 21.285 C 601.037 35.625 672.268 76.086 701.056 97.646 C 756.056 138.838 797.267 216.257 857.745 245.156 C 885.704 258.516 980.334 280.547 1048.511 268.826 C 1121.622 256.256 1199.864 226.267 1214.176 220.176 C 1241.273 208.643 1280.201 191.509 1343.494 179.436 C 1434.325 162.111 1439.504 196.099 1439.503 183.204 C 1439.502 161.288 1440 0 1440 0 L 1360 0 C 1280 0 1120 0 960 0 C 800 0 640 0 480 0 C 320 0 160 0 80 0 L 0 0 L -0.664 3.46 Z">
                    </path>
                </svg>
            </span>
            {/* // SVG Background */}

            {/* // Jumbotron */}
            <div className="px-6 py-12 text-center md:px-12 lg:my-12" ref={main}>
                <div className="mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
                    <h1 className="mb-12 font-bold">
                        <span className="box text-neutral-800 text-4xl">BRIDGE IT</span>
                    </h1>
                    <div className=" mt-12 lg:mt-0">
                        <h3 className="text-2xl mb-2">
                            <span className="box">We create experiences</span>
                        </h3>
                        <h3 className="text-2xl mb-8">
                            <span className="box">and the engineering behind it</span>
                        </h3>
                        <div className="box">
                            <TransitionLink href="/about">Learn more</TransitionLink>
                        </div>
                    </div>
                </div>
            </div>
            {/* // Jumbotron */}
        </section>
        // Section: Design Block
    );
}
// components/Services.js
function Services() {
    const main = useRef<HTMLElement | any>();

    useGSAP(() => {
        const verticalContainer = document.getElementById("verticalContainer");
        const leftSection = verticalContainer.querySelector(".left-section");
        const rightSection = verticalContainer.querySelector(".right-section");
        const containers = gsap.utils.toArray(".left-section > div");
        const snapPoints = containers.map((_, i) => {
            return i / (containers.length - 1);
        });
        gsap.set(rightSection, {
            y: -(leftSection.clientHeight - window.innerHeight)
        });
        gsap
            .timeline({
                defaults: {
                    ease: "none"
                },
                scrollTrigger: {
                    trigger: verticalContainer,
                    start: "top top",
                    end: "+=3000",
                    pin: true,
                    invalidateOnRefresh: true,
                    scrub: true,
                    snap: snapPoints
                }
            })
            .to(leftSection, {
                y: -(leftSection.clientHeight - window.innerHeight)
            })
            .to(
                rightSection,
                {
                    y: 0
                },
                0
            );

    }, { scope: main });

    return (
        <section className="bg-gray-100">
            <div className="mx-auto" ref={main}>
                <h2 className="text-2xl font-bold text-gray-800 mb-32 text-center">Our Services</h2>
                <div className="h-screen overflow-hidden flex" id="verticalContainer">
                    <div className="w-1/2 h-[400vh] left-section ml-8">
                        <div className="h-screen flex items-center justify-center text-3xl md:text-6xl font-semibold">Software Development</div>
                        <div className="h-screen flex items-center justify-center text-3xl md:text-6xl font-semibold">Managed IT Solutions</div>
                        <div className="h-screen flex items-center justify-center text-3xl md:text-6xl font-semibold">Cloud Services</div>
                        <div className="h-screen flex items-center justify-center text-3xl md:text-6xl font-semibold">Cybersecurity</div>
                    </div>
                    <div className="w-1/2 h-[400vh] right-section mr-8">
                        <div className="h-screen flex items-center justify-center font-semibold">
                            <ul>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Advanced threat protection to safeguard your digital assets</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Regular security assessments to identify and mitigate risks</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Compliance consulting to ensure your business meets industry standards</li>
                            </ul>
                        </div>
                        <div className="h-screen flex items-center justify-center font-semibold">
                            <ul>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Cloud migration and management for scalability and flexibility</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Secure data storage solutions to protect your valuable information</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Collaboration tools to enhance productivity and remote work capabilities</li>
                            </ul>
                        </div>
                        <div className="h-screen flex items-center justify-center font-semibold">
                            <ul>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Proactive monitoring and management of your IT infrastructure</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Customized support plans to fit your business needs</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">24/7 helpdesk support for uninterrupted business operations</li>
                            </ul>
                        </div>
                        <div className="h-screen flex items-center justify-center font-semibold">
                            <ul>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Custom software solutions tailored to your unique business processes</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Distribution specific development to engage customers on the go</li>
                                <li className="w-full border-b-2 border-neutral-400 border-opacity-100 py-4">Integration services to create a seamless technology ecosystem</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <section className="w-full h-screen flex justify-center items-center bg-gray-800 text-white px-4 py-2">
                    <h1 className="text-4xl text-center font-semibold mb-12">Enjoy!!!</h1>
                </section>
            </div>
        </section>
    );
}
// components/About.js
function About() {
    return (
        <section className="bg-white">
            <div className="container mx-auto px-6 py-12">
                <h2 className="text-2xl font-bold text-gray-800">Why Choose BridgeIT?</h2>
                {/* Add about content here */}
            </div>
        </section>
    );
}
// components/ContactCTA.js
function ContactCTA() {
    return (
        <section className="bg-blue-600">
            <div className="container mx-auto px-6 py-12 text-center">
                <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                <p className="mt-2 text-white">Ready to transform your business with cutting-edge IT services?</p>
                <button className="mt-4 px-4 py-2 bg-white text-blue-600 font-bold rounded hover:bg-gray-100">
                    Contact Us
                </button>
            </div>
        </section>
    );
}
// pages/index.js


export default function Home() {
    return (
        <div className="w-full">
            <Hero />
            <Services />
            <About />
            <ContactCTA />
            {/* Add more sections as needed */}
        </div>
    );
}
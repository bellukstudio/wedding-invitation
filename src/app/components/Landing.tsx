'use client';

import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
interface LandingProps {
    onFinish: () => void;
}

export default function Landing({ onFinish }: Readonly<LandingProps>) {
    const [isClicked, setIsClicked] = useState(false);
    const [recipient, setRecipient] = useState("Teman teman semua");

    const searchParams = useSearchParams();

    useEffect(() => {
        const to = searchParams.get('to');
        if (to) {
            // Decode untuk handle URL encoding seperti spasi jadi %20
            setRecipient(decodeURIComponent(to));
        }
    }, [searchParams]);
    const handleClick = () => {
        setIsClicked(true);
    };

    useEffect(() => {
        if (isClicked) {
            const timeout = setTimeout(() => {
                onFinish();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [isClicked, onFinish]);

    return (
        <AnimatePresence>
            {!isClicked && (
                <motion.div
                    key="landing"
                    initial={{ y: 0 }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100vh', opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="min-h-screen bg-white flex items-center justify-center text-center px-4"
                >
                    <div className="text-center max-w-md space-y-6">
                        <h2 className="text-2xl md:text-4xl font-playfair text-gray-800 mb-10">The Wedding Of</h2>

                        <div className="w-60 h-60 mx-auto rounded-full overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&auto=format&fit=crop&q=60"
                                alt="Foto Mempelai"
                                width={180}
                                height={180}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        <h1 className="text-3xl font-playfair text-gray-900">
                            Muh. Lukman Akbar Prihandoyo <br /> & <br /> Masih Mencari - Cari
                        </h1>

                        <div>
                            <p className="text-md text-gray-600">Kepada Yth Bapak/Ibu/Saudara/i :</p>
                            <p className="text-xl font-semibold text-gray-800 mt-5 font-mono">{recipient}</p>
                        </div>

                        <button
                            onClick={handleClick}
                            className="inline-flex items-center gap-2 px-6 py-2 bg-gray-300  rounded-full shadow-lg text-sm font-medium font-mono text-gray-800 hover:shadow-xl transition"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            Open Invitation
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

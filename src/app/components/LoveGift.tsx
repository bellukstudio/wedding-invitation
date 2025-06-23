import { useState } from "react";

export default function LoveGift() {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text: any) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const dataRekening = [
        {
            nama: "Muh. Lukman Akbar",
            norek: "1234567890",
            bank: "Bank BCA"
        },
        {
            nama: "Masih Mencari",
            norek: "9876543210",
            bank: "Bank Mandiri"
        }
    ];
    return (
        <div className="w-full relative bg-cover bg-center  bg-blue-900">

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                <div className="w-full mt-16 text-center">
                    <h1 className="text-5xl font-playfair">Love Gift</h1>
                </div>
                <h2 className="text-md font-mono mt-15">Dengan hormat, bagi Anda yang ingin memberikan tanda kasih kepada kami, dapat melalui:</h2>
                <div className="space-y-6 max-w-md mx-auto mt-10">
                    {dataRekening.map((data, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-6 border border-gray-200"
                        >
                            <p className="text-lg font-semibold text-gray-800 mb-1">
                                {data.nama}
                            </p>
                            <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 mb-2">
                                <span className="text-sm font-mono text-black">{data.norek}</span>
                                <button
                                    onClick={() => copyToClipboard(data.norek)}
                                    className="text-xs font-mono text-blue-500 hover:underline"
                                >
                                    {copied ? "Tersalin!" : "Salin"}
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 font-mono">{data.bank}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}
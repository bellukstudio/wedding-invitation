'use client';

import { useState, useEffect } from 'react';

type Message = {
    nama: string;
    presensi: string;
    ucapan: string;
};

export default function WishForm() {
    const [formData, setFormData] = useState({ nama: '', presensi: '', ucapan: '' });
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const messagesPerPage = 5;

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/wishes');
            if (res.ok) {
                const data = await res.json();
                setMessages(Array.isArray(data) ? data : []);
            } else {
                console.error('Failed to fetch messages:', res.status);
                setMessages([]);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
            setMessages([]);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/wishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormData({ nama: '', presensi: '', ucapan: '' });
                setCurrentPage(1); // Reset to first page after new submission
                await fetchMessages();
            } else {
                console.error('Failed to submit:', res.status);
                alert('Gagal mengirim ucapan. Silakan coba lagi.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Pagination calculations
    const totalPages = Math.ceil(messages.length / messagesPerPage);
    const startIndex = (currentPage - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const currentMessages = messages.slice(startIndex, endIndex);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="w-full min-h-screen relative bg-cover bg-center"
            style={{ backgroundImage: "url('/bg.png')" }}>

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                <h2 className="text-4xl font-semibold mb-10 text-white mt-10">Tulis Ucapan & Doa</h2>

                {/* Form */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            required
                            placeholder="Nama Anda"
                            className="w-full border p-2 rounded font-mono bg-white text-gray-800"
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            disabled={isSubmitting}
                        />
                        <select
                            required
                            className="w-full border p-2 rounded font-mono bg-white text-gray-800"
                            value={formData.presensi}
                            onChange={(e) => setFormData({ ...formData, presensi: e.target.value })}
                            disabled={isSubmitting}
                        >
                            <option value="">Presensi</option>
                            <option value="Hadir ✅">Hadir</option>
                            <option value="Tidak Hadir ❌">Tidak Hadir</option>
                        </select>
                        <textarea
                            required
                            placeholder="Ucapan Doa"
                            className="w-full border p-2 rounded bg-white font-mono text-gray-800"
                            rows={4}
                            value={formData.ucapan}
                            onChange={(e) => setFormData({ ...formData, ucapan: e.target.value })}
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 font-mono rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Mengirim...' : 'Kirim'}
                        </button>
                    </form>
                </div>

                {/* List */}
                <div className="space-y-4 mt-10">
                    {messages.length > 0 ? (
                        <>
                            {/* Messages */}
                            {currentMessages.map((msg: Message, index) => (
                                <div key={startIndex + index} className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-lg text-gray-800 font-mono">
                                            {msg.nama}
                                        </h3>
                                        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                            {msg.presensi}
                                        </span>
                                    </div>
                                    <hr className="border-gray-200 mb-4" />
                                    <p className="text-gray-700 leading-relaxed font-mono text-sm bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                                        {msg.ucapan}
                                    </p>
                                </div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center space-x-2 mt-8">
                                    <button
                                        onClick={goToPrevious}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 text-sm font-mono rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        ← Sebelumnya
                                    </button>

                                    <div className="flex space-x-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`px-3 py-2 text-sm font-mono rounded-lg transition-colors ${currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={goToNext}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 text-sm font-mono rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Selanjutnya →
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-gray-100">
                            <div className="text-gray-400 text-6xl mb-4">💌</div>
                            <p className="text-gray-500 font-mono">Belum ada ucapan</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}
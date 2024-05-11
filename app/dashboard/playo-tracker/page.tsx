'use client';
import { lusitana } from '@/app/ui/fonts';
// import { fetchNumberOfPlayersInPlayOGame } from '@/app/lib/scrapper';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import axios from 'axios';
import { saveGamesToBeTracked, getGamesToBeTracked } from '@/app/lib/data';

export default function Page() {
    const [gameUrl, setGameUrl] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Data saved successfully.');
        try {
            const data = await saveGamesToBeTracked(gameUrl, email);
            console.log('Data saved successfully.');
            alert('Data saved.');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving data.');
        }
    };

    const { pending } = useFormStatus();

    return (
        <form onSubmit={handleSubmit} method="POST">
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                PlayO Tracker
            </h1>
            <h2 className="mb-4 text-lg">
                Track the number of players in a PlayO game.
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Game URL:
                    <input
                        type="url"
                        value={gameUrl}
                        onChange={(e) => setGameUrl(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </label>
            </div>

            <button
                type="submit"
                aria-disabled={pending}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Start Tracking this Game
            </button>

        </form>
    );
}

'use client'

import { useState } from 'react';

export default function Home() {
    const [text, setText] = useState('');
    const [label, setLabel] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/labelText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();
        console.log(data.label)
        setLabel(data.label);
    };


    return (
        <div style={{ padding: '20px' }} className="flex flex-col justify-center">
            <h1>Post Labeling</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label class="block text-sm text-gray-500 dark:text-gray-300">Write your thoughts</label>

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to label..."
                        className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                        style={{ width: '50%', padding: '10px' }}  >
                    </textarea>
                </div>


                <button
                    type="submit"
                    style={{ marginTop: '10px' }}
                    className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                    Label thought
                </button>

            </form>
            {label && (
                
                    <div class="flex w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div class="px-4 py-2 -mx-3">
                            <div class="mx-3">
                                <span class="font-semibold text-emerald-500 dark:text-emerald-400">Result</span>
                                <p class="text-sm text-gray-600 dark:text-gray-200">{label}</p>
                            </div>
                        </div>
                    </div>
            
            )}
        </div>
    );
}

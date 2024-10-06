import React from 'react'

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
            <h1 className="text-8xl font-bold text-green-500">404</h1>
            <p className="mt-4 text-2xl">Oops! Page not found.</p>
            <p className="mt-2">
                <button
                    onClick={() => window.location.href = '/'}
                    className="mt-6 px-6 py-2 text-white bg-green-500 hover:bg-green-700 rounded transition duration-300"
                >
                    Go back to homepage
                </button>
            </p>
        </div>
    )
}

export default NotFound

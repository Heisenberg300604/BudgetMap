const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-12 h-12">
                <div className="absolute w-full h-full border-4 border-green-600/30 rounded-full"></div>
                <div className="absolute w-full h-full border-4 border-green-600 rounded-full animate-spin border-t-transparent"></div>
            </div>
        </div>
    )
}

export default Loader

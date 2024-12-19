const Chatlog = () => {
    var userName = "John Doe";

    return (
        <div className="h-full w-[75%] flex border border-gray-500 flex-col">
            <div className="h-[10%] w-full border flex justify-between align-center">
                <div className="h-full w-[15%] flex flex-row align-center justify-center border border-black gap-4">
                    <div className="bg-blue-500 rounded-full flex justify-center items-center h-full aspect-square">
                        <span className="text-white font-bold">C</span>
                    </div>
                    <div className="h-full flex justify-center items-center">
                        <h1 className="">{userName}</h1>
                    </div>
                </div>
                <div className="flex items-center justify-center rounded-full border border-gray-400 text-gray-500 text-sm font-bold cursor-help">
                    i
                </div>
            </div>
            <div className="h-[90%] w-full border">Chat stuff</div>
        </div>
    );
}

export default Chatlog;
const Chatlog = () => {
    var userName = "John Doe";

    return (
        <div className="h-full w-[75%] flex flex-col">
            {/* This is top container */}
            <div className="h-[10%] w-full flex justify-center items-center border border-black">
                <div className="h-full w-[100%] px-5 flex items-center justify-between border border-black ">
                    <div className="h-[80%] w-[90%] flex flex-row items-center justify-center flex-row gap-5">
                        <div className="h-full flex flex-row items-start justify-start">
                            <div className="bg-blue-500 rounded-full flex justify-center items-center h-full aspect-square">
                                <span className="text-white font-bold">C</span>
                            </div>
                        </div>
                        <div className="h-full w-full flex justify-start items-center">
                            <h1 className="font-bold text-2xl">{userName}</h1>
                        </div>
                    </div>
                    <div className="h-full flex justify-center items-center">
                        <div className="rounded-full flex justify-center items-center h-[45%] aspect-square border border-black">
                            <span className="font-bold">i</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Log stuff */}
            <div className="h-[90%] w-full border"></div>
        </div>
    );
}

export default Chatlog;
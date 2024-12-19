interface RecentMessageProps {
    userName: string;
    message: string;
    time: number;
}

const RecentMessage: React.FC<RecentMessageProps> = ({ userName, message, time }) => {
    return (
        <div className="flex justify-center items-center flex-row w-full h-[75px] gap-3">
            <div className="h-full">
                <div className="bg-blue-500 rounded-full flex justify-center items-center h-full aspect-square">
                    <span className="text-white font-bold">C</span>
                </div>
            </div>
            <div className="w-[75%] flex justify-center items-center flex-col gap-1">
                <div className="flex w-full justify-between items-center flex-row">
                    <h1 className="font-bold">{userName}</h1>
                    <h2>{time}hr</h2>
                </div>

                <div className="flex w-full justify-start items-center flex-row">
                    {message}
                </div>
            </div>
        </div>
    );
};

export default RecentMessage;

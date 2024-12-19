import RecentMessage from "./RecentMessage";
interface RecentMessageProps {
    userName: string;
    message: string;
    time: number;
}

const RecentMessages: React.FC = () => {
    const testData: RecentMessageProps[] = [
        {
            userName: "John Doe",
            message: "Hello, how are you?",
            time: 10,
        },
        {
            userName: "Jane Smith",
            message: "Let's catch up later!",
            time: 1,
        },
        {
            userName: "Alex Johnson",
            message: "Great job on the project!",
            time: 2,
        },
        {
            userName: "Emily Davis",
            message: "Looking forward to the meeting tomorrow.",
            time: 5,
        },
        {
            userName: "Michael Brown",
            message: "Can you review my latest code?",
            time: 3,
        },
        {
            userName: "Sophia Wilson",
            message: "Happy Birthday!",
            time: 0,
        },
        {
            userName: "David Lee",
            message: "Let's schedule a call.",
            time: 8,
        },
    ];

    return (
        <div className="h-full w-[25%] flex border border-gray-500 justify-start items-center flex-col px-4 py-4 gap-4">
            {testData
                .slice()
                .sort((a, b) => a.time - b.time)
                .map((message) => (
                    <RecentMessage
                        key={message.userName}
                        userName={message.userName}
                        message={message.message}
                        time={message.time}
                    />
            ))}
        </div>
    );
};

export default RecentMessages;

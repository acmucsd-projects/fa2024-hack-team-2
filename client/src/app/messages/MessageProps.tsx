export interface RecentMessageProps {
    username: string;
    message: string;
    time: string;
    user_id: string;
    date: string;
}

export interface Message {
    sender: string;
    text: string;
    timestamp: string;  // Military time (e.g., "10:00")
    date: string;  // Date in YYYY-MM-DD format (e.g., "2024-12-20")
}

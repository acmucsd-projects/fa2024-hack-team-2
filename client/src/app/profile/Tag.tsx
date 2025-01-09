import React from 'react';

interface TagProps {
    text: string;
}

const Tag: React.FC<TagProps> = ({ text }) => {
    return (
        <div className="tag bg-gray-200 shadow-sm rounded p-2 m-0">
            {text}
        </div>
    );
};

export default Tag;
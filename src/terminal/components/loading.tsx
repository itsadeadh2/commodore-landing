// Loading.tsx
import React, { useEffect, useState } from 'react';

interface LoadingProps {
    isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
    const [dotCount, setDotCount] = useState(0);

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setDotCount((prevDotCount) => (prevDotCount + 1) % 4);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, [isLoading]);

    const dots = '.'.repeat(dotCount);

    return (
        <div>
            &gt; please wait{dots}
        </div>
    );
};

export default Loading;

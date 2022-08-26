import { useState, useEffect } from "react";

const useCurLocation = () => {
    const [location, setLocation] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [error, setError] = useState(false);

    const successHandler = (position: any) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
    };
    const errorHandler = () => {
        setError(true);
    };

    useEffect(() => {
        const { geolocation } = navigator;
        if (!geolocation) {
            setError(true);
            return;
        }
        geolocation.getCurrentPosition(successHandler, errorHandler);
    }, []);

    return { location, error };
};

export default useCurLocation;

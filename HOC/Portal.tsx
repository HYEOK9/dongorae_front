import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface propType {
    children: JSX.Element;
}

const Portal = ({ children }: propType) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted
        ? createPortal(children, document.querySelector("#portal") as Element)
        : null;
};

export default Portal;

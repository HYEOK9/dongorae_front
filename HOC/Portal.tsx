import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface propType {
    children: JSX.Element;
}

//sideBar 나오는 portal _app.tsx에 포탈 위치 있음
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

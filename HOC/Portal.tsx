import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface propType {
    children: React.ReactNode;
}

const Portal = ({ children }: propType) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        return () => setMounted(false);
    }, []);

    return mounted
        ? createPortal(
              children,
              document.querySelector("#portal") as HTMLElement
          )
        : null;
};

export default Portal;

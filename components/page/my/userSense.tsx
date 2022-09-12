import React, { useEffect, useState, useRef } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "../../context/Theme";
const ProgressBar = require("progressbar.js");

const config = {
    strokeWidth: 4,
    easing: "easeInOut",
    duration: 1400,
    color: "",
    trailColor: "#eee",
    trailWidth: 1,
    text: {
        style: {
            color: "",
            padding: 0,
            margin: 0,
            transform: null,
        },
        autoStyleContainer: false,
    },
};

interface propType {
    name: string;
    value: number;
    idx: number;
}

const UserSenseInfo = ({ name, value, idx }: propType) => {
    const { themeColorset } = useTheme();
    const [progressBar, setProgressBar] = useState(null);
    const container = `container${idx}`;

    useEffect(() => {
        if (progressBar) return;
        config.color = themeColorset.pointColor;
        config.text.style.color = themeColorset.textColor;
        const bar = new ProgressBar.Line("#" + container, config);
        bar.animate(value / 100);
        setProgressBar(bar);
    }, []);

    return (
        <>
            <Container>
                <Text>{name}</Text>
                <Bar id={container} />
                <Text>{value}</Text>
            </Container>
        </>
    );
};

export default UserSenseInfo;

const Container = tw.div`
flex justify-around items-center w-1/2 h-auto my-6
`;

const Text = tw.span`
flex justify-center w-1/3 text-[0.825rem]
`;
const Bar = tw.div`
w-3/5
`;

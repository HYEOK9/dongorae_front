import type { NextPage } from "next";
import tw from "tailwind-styled-components/dist/tailwind";

const Home: NextPage = () => {
    return (
        <>
            <h1
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                }}
            >
                Contents Here
            </h1>
        </>
    );
};

export default Home;

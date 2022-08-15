import type { NextPage } from "next";
import tw from "tailwind-styled-components/dist/tailwind";

const Home: NextPage = () => {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                }}
            >
                <h1>Contents Here</h1>
            </div>
        </>
    );
};

export default Home;

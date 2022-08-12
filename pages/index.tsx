import type { NextPage } from "next";
import tw from "tailwind-styled-components";

const Home: NextPage = () => {
    return (
        <Div>
            <h1>:D</h1>
        </Div>
    );
};

export default Home;

const Div = tw.div`
w-screen h-screen bg-black
&>h1{
 text-white
}
`;

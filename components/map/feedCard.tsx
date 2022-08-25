import tw from "tailwind-styled-components";

const feedCard = () => {
    return (
        <>
            <InfoContainer></InfoContainer>
        </>
    );
};

export default feedCard;

const InfoContainer = tw.div`
w-[100px] h-[40px] bg-black
`;

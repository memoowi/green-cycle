import Lottie from "lottie-react";
import animationData from "@/../../public/images/anicon-sad.json";

export default function SadIcon({ ...props }) {
    return (
        <Lottie
            {...props}
            animationData={animationData}
            loop={true}
            autoplay={true}
        />
    );
}

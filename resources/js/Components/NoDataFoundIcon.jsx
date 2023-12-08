import animationData from "@/../../public/images/anicon-notfound.json";
import Lottie from "lottie-react";

export default function NoDataFoundIcon({ ...props }) {
    return (
        <Lottie
            {...props}
            animationData={animationData}
            loop={true}
            autoplay={true}
        />
    );
}

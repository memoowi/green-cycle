
import Lottie from "lottie-react";
import animationData from "@/../../public/images/anicon-truck.json";

export default function TruckIcon({ ...props }) {
    return (
        <Lottie
            {...props}
            animationData={animationData}
            loop={true}
            autoplay={true}
        />
    );
}

export default function CardLandingItems({ image, title, ...props }) {
    return (
        <div
            {...props}
            className="flex justify-center items-center w-[40%] sm:w-[48%] md:w-[23%] h-40 mx-3 sm:mx-0 bg-white border-[1px] border-gray-700 dark:bg-slate-800 overflow-hidden shadow-sm rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
            <div className="flex flex-col items-center gap-4 p-6 text-gray-800 dark:text-gray-100">
                {image && (
                    <img
                        src={"/storage/item-images/" + image}
                        className="w-16 h-16 object-cover"
                    />
                )}
                <h2 className="text-xl font-medium">{title}</h2>
            </div>
        </div>
    );
}

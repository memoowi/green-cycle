export default function CardServices({ title = "", description = "", icon = "", lineColor = "" }) {
    return (
        <div className="w-2/3 sm:w-[43%] md:w-[23%] h-72 mx-3 sm:mx-0 bg-white dark:bg-slate-800 overflow-hidden shadow-sm border-2 border-slate-700 rounded hover:shadow-[-10px_10px_0px_0px_rgb(0,0,0)] dark:hover:shadow-[-10px_10px_0px_0px_rgb(5,150,105)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 ease-in-out">
            <div className="p-6 space-y-4 text-gray-800 dark:text-gray-100">
                <div className="flex items-center gap-4">
                    {icon}
                    <h2 className="text-2xl font-medium">{title}</h2>
                </div>
                <div className={"w-full h-1 " + lineColor }></div>
                <p className="text-lg">{description}</p>
            </div>
        </div>
    );
}

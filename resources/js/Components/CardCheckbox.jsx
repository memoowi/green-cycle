export default function CardCheckbox({
    id,
    type = "checkbox",
    icon,
    title,
    children,
    ...props
}) {
    const isDisabled = props.disabled;

    return (
        <li>
            <input
                {...props}
                type={type}
                id={id}
                className="hidden peer"
                // required
            />
            <label
                htmlFor={id}
                className={`inline-flex items-center justify-between w-full p-5 text-gray-500 border-2 border-gray-200 rounded-lg cursor-pointer 
                ${isDisabled ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:hover:text-gray-300 hover:text-gray-600'}
                dark:border-gray-700 peer-checked:border-emerald-600 peer-checked:bg-emerald-600 peer-checked:text-white peer-checked:dark:bg-emerald-600 peer-checked:dark:text-white dark:peer-checked:text-gray-300`}
            >
                <div className="flex flex-col items-center justify-center w-full text-center">
                    {icon}
                    <div className="w-full text-lg font-semibold">{title}</div>
                    <div className="w-full text-sm">{children}</div>
                </div>
            </label>
        </li>
    );
}

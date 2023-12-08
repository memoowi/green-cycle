export default function NextButton({ children, disabled = false, ...props }) {
    return (
        <button
            {... props}
            type="submit"
            disabled={disabled}
            className="group flex items-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded hover:shadow-[-5px_5px_0px_0px_rgb(0,0,0)] hover:translate-x-1 hover:-translate-y-1 transition duration-500 ease-in-out"
        >
            { children }
            <svg
                className="inline w-4 h-4 ml-2 fill-current -translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition duration-500 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
            >
                <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
        </button>
    );
}

import InputLabel from "./InputLabel";
import TextInput from "./TextInput";

export default function TogglesButton({ className = '', value, onChange, checked, label, ...props }) {
    return (
        <InputLabel className={("relative inline-flex items-center cursor-pointer") + className }>
            <TextInput
                {...props}
                type="checkbox"
                value={ value }
                className="sr-only peer"
                onChange={ onChange }
                checked={ checked }
            />
            <div className="w-11 h-6 bg-red-400  rounded-full peer dark:bg-red-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-white peer-checked:bg-emerald-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                { label }
            </span>
        </InputLabel>
    );
}

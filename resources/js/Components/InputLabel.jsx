export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-semibold text-base text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
}

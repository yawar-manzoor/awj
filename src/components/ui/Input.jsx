const Input = ({ id, name, type, placeholder, required, ...props }) => {
    return (
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            {...props}
        />
    )
}

export default Input

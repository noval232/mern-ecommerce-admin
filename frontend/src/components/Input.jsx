function Input({ name, type = 'text', size = 'text-md', capitalize = true, ...props }) {
  const isCapitalize = capitalize ? 'capitalize' : '';
  return (
    <fieldset>
      <input
        placeholder={name}
        id={name}
        name={name}
        type={type}
        className={`${isCapitalize} w-full inline-block my-3 py-1 px-3 rounded-md outline-1 outline-secondary ${size}`}
        {...props}
      />
    </fieldset>
  );
}

export default Input;

function ContactInput({
  placeholder,
  name,
  type,
}: {
  placeholder: string;
  name: string;
  type: string;
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full p-4 rounded border border-pistachio text-pistachio focus:outline-none focus:border-2 "
      required
    />
  );
}
export default ContactInput;

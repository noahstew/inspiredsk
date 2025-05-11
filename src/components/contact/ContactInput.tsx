function ContactInput({ placeholder }: { placeholder: string }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full p-4 rounded border border-pistachio text-pistachio focus:outline-none focus:border-2 "
      required
    />
  );
}
export default ContactInput;

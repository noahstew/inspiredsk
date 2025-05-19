import ContactInput from '@/components/contact/ContactInput';

function ContactForm() {
  return (
    <form className="space-y-6 font-league-spartan">
      <ContactInput placeholder="Name" />
      <ContactInput placeholder="Email" />

      <textarea
        placeholder="Message"
        className="w-full h-40 p-4 rounded border border-pistachio text-pistachio focus:outline-none focus:border-2"
      />
      <button
        type="submit"
        className="bg-pistachio text-cream font-bold px-6 py-3 rounded hover:bg-olive transition hover:cursor-pointer"
      >
        Send
      </button>
    </form>
  );
}
export default ContactForm;

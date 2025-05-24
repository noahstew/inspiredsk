'use client';

import { useRef, useState } from 'react';
import ContactInput from '@/components/contact/ContactInput';

function ContactForm() {
  const ACCESS_KEY = '1850b1b-0375-43ff-83b1-e9d1e3cfaf0d';
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default redirect

    if (!formRef.current) return;

    setStatus('sending');

    const formData = new FormData(formRef.current);
    formData.append('access_key', ACCESS_KEY);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        formRef.current.reset(); // clear the form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 font-league-spartan"
    >
      <ContactInput placeholder="Name" name="name" type="text" />
      <ContactInput placeholder="Email" name="email" type="email" />
      <textarea
        placeholder="Message"
        name="message"
        className="w-full h-40 p-4 rounded border border-pistachio text-pistachio focus:outline-none focus:border-2"
        required
      />
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-pistachio text-cream font-bold px-6 py-3 rounded hover:bg-olive transition hover:cursor-pointer"
      >
        {status === 'sending' ? 'Sending...' : 'Send'}
      </button>

      {status === 'success' && (
        <p className="text-pistachio mt-2">
          Thanks! Your message has been sent. We will get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="text-red-500 mt-2">
          Oops! Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}

export default ContactForm;

import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Lightning from './ui/Lightning'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const formRef = useRef(null)

  useEffect(() => {
    const timer = status === 'success' ? setTimeout(() => setStatus(null), 3000) : undefined
    return () => timer && clearTimeout(timer)
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const emailOk = /.+@.+\..+/.test(form.email)
    if (!form.name || !emailOk || !form.message) {
      setStatus('error')
      setTimeout(() => setStatus(null), 3000)
      return
    }

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
        return
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey,
      })
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-8 pb-16 overflow-hidden">
      {/* Lightning Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-35 pointer-events-none">
        <Lightning
          hue={0}
          xOffset={-0.2}
          speed={0.5}
          intensity={0.8}
          size={1.1}
        />
      </div>
      
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 scroll-animate from-bottom">
        <h2 className="text-3xl font-bold mb-3">Contact Me</h2>
        <div className="w-16 h-1.5 bg-gradient-to-r from-rose-500 to-pink-600 rounded-full"></div>
      </div>
      <form ref={formRef} className="mt-8 grid gap-4 sm:max-w-md scroll-animate from-left" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          className="rounded border border-gray-300 dark:border-rose-700/50 bg-white dark:bg-gray-900/50 px-3 py-2 dark:text-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
          value={form.name}
          name="user_name"
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          type="email"
          placeholder="you@example.com"
          className="rounded border border-gray-300 dark:border-rose-700/50 bg-white dark:bg-gray-900/50 px-3 py-2 dark:text-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
          value={form.email}
          name="user_email"
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="rounded border border-gray-300 dark:border-rose-700/50 bg-white dark:bg-gray-900/50 px-3 py-2 dark:text-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500"
          value={form.message}
          name="message"
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
        />
        <button
          type="submit"
          className="btn btn-soft btn-rose px-4 py-2 font-medium disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send'}
        </button>
        {status === 'success' && (
          <p className="text-green-600 animate-bounce">Message sent! I&apos;ll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="text-red-600">Please fill all fields with a valid email.</p>
        )}
      </form>
      </div>
    </section>
  )
}

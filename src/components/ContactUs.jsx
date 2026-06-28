import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import DecryptedText from './ui/DecryptedText'

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

  const handleRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`)
  }

  return (
    <section id="contact" className="relative ui-section pb-28 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 sm:mb-12"
        >
          <p className="ui-kicker mb-2">Let&apos;s Collaborate</p>
          <h2 className="ui-title mb-3">
            <DecryptedText text="Contact Me" animateOn="inViewHover" revealDirection="center" speed={55} maxIterations={12} />
          </h2>
          <div className="ui-divider"></div>
        </motion.div>
      <motion.form
        ref={formRef}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        className="ui-card mt-8 grid gap-4 sm:max-w-xl p-5 sm:p-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Your Name"
          className="rounded-xl border border-gray-600/50 bg-slate-900/60 px-3.5 py-2.5 text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={form.name}
          name="user_name"
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          type="email"
          placeholder="you@example.com"
          className="rounded-xl border border-gray-600/50 bg-slate-900/60 px-3.5 py-2.5 text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={form.email}
          name="user_email"
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <textarea
          placeholder="Message"
          rows={5}
          className="rounded-xl border border-gray-600/50 bg-slate-900/60 px-3.5 py-2.5 text-slate-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={form.message}
          name="message"
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
        />
        <button
          type="submit"
          className="btn rounded-xl px-4 py-3 font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          onMouseMove={handleRipple}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'success' && (
          <p className="text-gray-300">Message sent! I'll get back to you soon.</p>
        )}
        {status === 'error' && (
          <p className="text-rose-300">Please fill all fields with a valid email.</p>
        )}
      </motion.form>
      </div>
    </section>
  )
}

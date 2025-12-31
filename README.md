# 🎨 Personal Portfolio (React + Tailwind)

A modern, fully responsive portfolio built with React and Tailwind CSS. Includes dark/light theme toggle, smooth navigation, project showcase, and a simple contact form (no backend required).

## ✨ Features

- 🌓 Theme Toggle with dark/light mode
- 📱 Fully responsive layout
- 🚀 Fast & lightweight (Vite + Tailwind)
- 🔗 Social profile links (GitHub, LinkedIn, Email)
- 📂 Project cards with tech badges
- ✉️ Contact form with client-side validation + success message

## 🛠️ Tech Stack

- React 19
- Tailwind CSS 4 (`@tailwindcss/vite` plugin)
- Lucide React icons

## 🚀 Getting Started

```bash
# From the project root
cd my-project

# Install dependencies
npm install

# Install icon library
npm install lucide-react

# Install EmailJS browser SDK
npm install @emailjs/browser

# Start dev server
npm run dev
```

Open http://localhost:5173 and customize your content.

## 📝 Customize

- Name & title: edit the hero text in `src/App.jsx`
- Social links: update the `profiles` array in `src/App.jsx`
- Projects: update the `projects` array in `src/App.jsx`
- Skills: update the `skills` array in `src/App.jsx`
- Email: replace `your@email.com` in `src/App.jsx`

## 🎨 Colors

Uses a blue → purple gradient: `from-blue-500 to-purple-600`. Swap to any Tailwind colors as desired.

## ✅ Contact Form

Client-side validation is built-in. For email delivery, EmailJS is wired in `src/App.jsx`.

### EmailJS Integration
- Sign up at https://www.emailjs.com/ and create a Service and Template
- Note your `Service ID`, `Template ID`, and `Public Key`
- Create a file: `.env.local` at project root and add:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

- Ensure form fields map to your template variables:
	- `user_name` → Name input
	- `user_email` → Email input
	- `message` → Message textarea

`handleSubmit` uses `emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })` and shows a success or error message accordingly.

## 📦 Dependencies

```
react, react-dom, tailwindcss, @tailwindcss/vite, lucide-react
```

## 🐛 Troubleshooting

- Icons not showing: ensure `lucide-react` is installed.
- Theme not persisting across refresh: current toggle uses React state; add `localStorage` if desired.
	- Already implemented: theme is persisted in `localStorage` under the `theme` key.

## 📄 License

This template is free to use for personal and commercial projects.

import { useMemo, useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Code, Book } from 'lucide-react'

export default function Home() {
  const roles = ['Software Developer', 'Lifelong Learner', 'ML Enthusiast', 'Problem Solver']
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRoleIndex, roles])

  const profiles = useMemo(
    () => [
      { name: 'GitHub', url: 'https://github.com/Nikhil-X-codes', icon: Github },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nikhil2310', icon: Linkedin },
      { name: 'Email', url: 'mailto:nagarn2005@gmail.com', icon: Mail },
      { name: 'Codolio', url: 'https://codolio.com/profile/J6G0HHGi', icon: Code},
      { name: 'Research Paper', url: 'https://drive.google.com/drive/folders/1ETdlrfZtmvJTdfi4mo8kRuuqx8Cr6vMr?usp=drive_link', icon: Book},
    ],
    []
  )

  return (
    <section id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="scroll-animate from-left">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Hi, I&apos;m Nikhil Nagar</h2>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 h-8">
            <span className="text-blue-500">{displayText}</span>
            <span className="animate-pulse">|</span>
          </p>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            I am a third-year Information Technology student at IIIT Sonepat with strong experience in building web applications, a solid foundation in Data Structures and Algorithms, and a keen interest in Artificial Intelligence and Machine Learning.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {profiles.map(({ name, url, icon: Icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="social-btn inline-flex items-center gap-2 rounded border border-gray-200 dark:border-gray-800 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Icon className="h-5 w-5" />
                <span>{name}</span>
              </a>
            ))}
          </div>
        </div>
        <img
          src={"/images/profile.jpg"}
          alt="Nikhil Nagar"
          className="scroll-animate from-right profile-image w-80 h-80 rounded-full object-cover border-4 border-blue-500"
        />
      </div>
    </section>
  )
}

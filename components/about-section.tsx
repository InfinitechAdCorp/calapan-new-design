"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, Users } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "Deliver efficient and transparent government services to every citizen",
  },
  {
    icon: Lightbulb,
    title: "Our Vision",
    description: "A smart city where technology and community values work together",
  },
  {
    icon: Users,
    title: "Our Values",
    description: "Integrity, transparency, and citizen-centric service delivery",
  },
]

const teamMembers = [
  { id: 1, name: "Maria Santos", role: "City Mayor", icon: "👩‍💼" },
  { id: 2, name: "Juan Cruz", role: "IT Director", icon: "👨‍💻" },
  { id: 3, name: "Rosa Garcia", role: "Services Head", icon: "👩‍💼" },
  { id: 4, name: "Pedro Lopez", role: "Finance Manager", icon: "👨‍💼" },
]

export default function AboutSection() {
  return (
    <>
      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="p-8 rounded-2xl bg-white border border-primary-200 text-center hover:shadow-lg transition-all"
                >
                  <motion.div
                    className="flex justify-center mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="p-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-3">
                    {value.title}
                  </h3>
                  <p className="text-foreground/60">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-6">
            <p className="text-lg text-foreground/70 leading-relaxed">
              The Calapan City Government is dedicated to delivering world-class services with the highest standards of
              integrity and transparency. We strive to foster sustainable community development by embracing innovation,
              leveraging modern technology, and actively engaging our citizens in decision-making processes.
            </p>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Through collaborative initiatives and responsive governance, we aim to create a safe, inclusive, and
              thriving city where every resident has the opportunity to contribute to and benefit from the growth and
              progress of Calapan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg text-foreground/60">Meet the dedicated professionals leading our city</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="p-6 rounded-2xl bg-white border border-primary-200 text-center hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{member.icon}</div>
                <h3 className="font-bold text-foreground text-lg mb-1">{member.name}</h3>
                <p className="text-primary-600 font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-8 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-4">
              Visit Us
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-primary-200"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.535729495896!2d121.18033177572742!3d13.37911950581156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bce92544f3d819%3A0x29a37a79f34acaa2!2sCalapan%20City%20Hall!5e0!3m2!1sen!2sph!4v1763345133260!5m2!1sen!2sph"
              width="100%"
              height="500"
              style={{ border: 0 }}
              title="Calapan City Map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}

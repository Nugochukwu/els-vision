import { Footer } from '@/components/layout/Footer'

const values = [
  { icon: '🌱', title: 'Sustainability', body: 'All materials are certified organic, recycled, or sustainably harvested. Our packaging is 100% compostable.' },
  { icon: '✊', title: 'Fair Trade', body: 'Every person in our supply chain earns a living wage. We publish our full audit reports annually.' },
  { icon: '⏳', title: 'Longevity', body: 'We design for years, not seasons. Every garment comes with a lifetime repair guarantee.' },
]

const team = [
  { name: 'Nwodo Chubike', role: 'Founder & Creative Director', emoji: '👨🏾', bg: 'from-[#E8DDD0] to-[#D4C4B0]' },
  { name: 'Nwodo Chubike', role: 'Lead Designer', emoji: '👨🏾', bg: 'from-[#D0E8D4] to-[#B0D4B8]' },
  { name: 'Nwodo Ugochukwu', role: 'Software Lead', emoji: '👨🏾', bg: 'from-[#E8D0D0] to-[#D4B0B0]' },
]

export const metadata = {
  title: 'About — Maison Elara',
  description: 'We started Maison Elara with one belief: great clothes shouldn\'t cost the planet.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-ink py-24 px-10 text-center">
        <p className="section-tag">SW. 2026 · Nigeria</p>
        <h1 className="font-serif text-[3.5rem] font-light text-white mb-6">
          Happy Birth Day <em className="italic text-warm"> Chubi</em>
        </h1>
        <p className="text-[14px] text-[#9B9590] leading-[1.9] max-w-lg mx-auto">
          Happy Happy Happy Happy Happy Happy Happy Happy Happy Happy Birthday
        </p>
      </section>

      {/* Story */}
      <section className="grid grid-cols-2 gap-20 max-w-5xl mx-auto py-20 px-10">
        <div>
          <p className="text-[11px] tracking-[0.12em] text-warm uppercase mb-4">
            The Beginning
          </p>
          <h2 className="font-serif text-[2rem] font-light mb-6 leading-[1.3]">
            A Happy Birthday
          </h2>
          <div className="text-[14px] text-muted leading-[1.9] space-y-4">
            <p>
              Happy Birthday
            </p>
            <p>
              Happy Birthday
            </p>
            <p>
              Happy Birthday
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#D4C4B0] to-[#B8A088] rounded-lg flex items-center justify-center text-[5rem] min-h-[400px]">
          🏛
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-10 bg-white">
        <div className="text-center mb-12">
          <p className="section-tag">What We Stand For</p>
          <h2 className="font-serif text-[2.5rem] font">
            Our <em className="italic">values</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {values.map(({ icon, title, body }) => (
            <div
              key={title}
              className="bg-white border border-border rounded-lg p-8"
            >
             
              <h3 className="font-serif text-xl mb-3">{title}</h3>
              <p className="text-[13px] text-muted leading-[1.8]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-10">
        <div className="text-center mb-12">
          <p className="section-tag">The Team</p>
          <h2 className="font-serif text-[2.5rem] font-light">
            The people <em className="italic">behind the pieces</em>
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6 max-w-[900px] mx-auto">
          {team.map(({ name, role, emoji, bg }) => (
            <div key={name} className="text-center">
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${bg} flex items-center justify-center text-3xl mx-auto mb-4`}
              >
                {emoji}
              </div>
              <p className="font-serif text-lg mb-1">{name}</p>
              <p className="text-[12px] text-muted tracking-[0.04em]">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

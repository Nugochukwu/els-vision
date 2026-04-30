import { Footer } from '@/components/layout/Footer'

const values = [
  { icon: '✨', title: 'Premium Quality', body: 'Every piece is hand-selected for quality, craftsmanship, and lasting style. We only carry what we\'d wear ourselves.' },
  { icon: '🌍', title: 'Ethically Sourced', body: 'We partner exclusively with manufacturers who pay fair wages and maintain safe, respectful working conditions.' },
  { icon: '🎯', title: 'Bold Vision', body: 'Our curation philosophy is simple: pieces that make you feel seen, confident, and unmistakably yourself.' },
]

const team = [
  { name: 'El Okonkwo', role: 'Founder & Creative Director', emoji: '👑', bg: 'from-[#D4AF37]/30 to-[#A88B1E]/20' },
  { name: 'Amara Diallo', role: 'Head of Curation', emoji: '👩🏽', bg: 'from-[#1A1A2E] to-[#16213E]' },
  { name: 'James Farrow', role: 'Operations Director', emoji: '👨🏼', bg: 'from-[#1A2E1A] to-[#16211A]' },
  { name: 'Kai Nakamura', role: 'Brand & Marketing', emoji: '🎨', bg: 'from-[#2E1A1A] to-[#211616]' },
]

export const metadata = {
  title: "About — El's Vision",
  description: "Where style meets vision. Our story, our values, the team behind the brand.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-obsidian min-h-[60vh] flex flex-col items-center justify-center text-center px-10 relative overflow-hidden -mt-[73px] pt-[73px]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-gold/6 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-gold/10 rounded-full animate-counter-spin" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gold/5 rounded-full animate-pulse-glow" />
        </div>
        <div className="relative z-10">
          <span className="section-tag opacity-0 animate-fade-up">Est. 2020 · Lagos</span>
          <h1 className="font-serif text-[4rem] font-bold text-pearl leading-[1.05] mb-6 opacity-0 animate-fade-up delay-100">
            Where <em className="italic text-gold">Style</em><br />Meets Vision
          </h1>
          <p className="text-[14px] text-pearl/50 leading-[1.9] max-w-lg mx-auto opacity-0 animate-fade-up delay-200">
            El&apos;s Vision began with a simple belief — that fashion should feel
            personal, intentional, and powerful. We curate pieces for those who
            lead with their aesthetic.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-charcoal py-24 px-10">
        <div className="grid grid-cols-2 gap-20 max-w-5xl mx-auto items-center">
          <div className="opacity-0 animate-slide-left">
            <span className="section-tag">The Beginning</span>
            <h2 className="font-serif text-[2.5rem] font-bold mb-6 leading-[1.2] text-pearl mt-1">
              One woman&apos;s vision,<br />
              <em className="italic text-gold">thousands of stories</em>
            </h2>
            <div className="text-[14px] text-pearl/50 leading-[1.9] space-y-4">
              <p>
                In 2020, founder El Okonkwo left corporate Lagos with a
                sketchbook, a vision, and a conviction: Nigerian women deserved
                fashion that matched their ambition and reflected their beauty.
              </p>
              <p>
                Starting with a curated Instagram page that grew to 80,000
                followers in six months, El&apos;s Vision became the destination
                for women who refused to blend in.
              </p>
              <p>
                Today, we ship across Nigeria and beyond — every order packed
                with intention, every piece chosen to make you feel unstoppable.
              </p>
            </div>
          </div>

          <div className="opacity-0 animate-slide-right">
            <div className="bg-gradient-to-br from-gold/20 to-gold/5 border-shimmer rounded-2xl flex items-center justify-center min-h-[420px] relative overflow-hidden">
              <span className="text-[7rem] animate-float">👑</span>
              <div className="absolute inset-8 border border-gold/15 rounded-xl animate-spin-slow pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-10 bg-graphite">
        <div className="text-center mb-14">
          <span className="section-tag">What We Stand For</span>
          <h2 className="font-serif text-[3rem] font-bold text-pearl mt-1">
            Our <em className="italic text-gold">values</em>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {values.map(({ icon, title, body }, i) => (
            <div key={title}
                 className="bg-charcoal border-shimmer rounded-xl p-8 card-hover opacity-0 animate-fade-up"
                 style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="text-3xl mb-4 animate-float" style={{ animationDelay: `${i * 0.6}s` }}>{icon}</div>
              <h3 className="font-serif text-xl text-pearl mb-3">{title}</h3>
              <p className="text-[13px] text-mist leading-[1.8]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-10 bg-obsidian relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/4 rounded-full blur-3xl pointer-events-none" />
        <div className="text-center mb-14 relative">
          <span className="section-tag">The Team</span>
          <h2 className="font-serif text-[3rem] font-bold text-pearl mt-1">
            The people <em className="italic text-gold">behind the vision</em>
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-6 max-w-[900px] mx-auto relative">
          {team.map(({ name, role, emoji, bg }, i) => (
            <div key={name}
                 className="text-center card-hover opacity-0 animate-fade-up"
                 style={{ animationDelay: `${i * 0.12}s` }}>
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${bg} border-shimmer flex items-center justify-center text-4xl mx-auto mb-4 animate-float`}
                   style={{ animationDelay: `${i * 0.8}s` }}>
                {emoji}
              </div>
              <p className="font-serif text-lg text-pearl mb-1">{name}</p>
              <p className="text-[12px] text-mist tracking-[0.04em]">{role}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

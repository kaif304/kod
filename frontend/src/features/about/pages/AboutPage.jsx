import PageHero from '../../../components/common/PageHero.jsx'
import SectionHeading from '../../../components/common/SectionHeading.jsx'
import { siteConfig } from '../../../content/site.js'

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A travel company presentation built around trust, clarity, and strong follow-up."
        description="Kings of Destination is designed for teams who want their website to feel premium while keeping booking conversations personal and manager-led."
      />

      <section className="section-shell mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel border-rounded p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-900/70">
            Our Story
          </p>
          <h2 className="mt-4 font-display text-5xl leading-none text-slate-900">
            Built for travel businesses that value real relationships.
          </h2>
          <p className="mt-5 text-sm leading-8 text-slate-600">
            KOD is intentionally not an OTA clone. It is a polished lead-generation travel service
            website where packages inspire, inquiries convert, and destination managers handle the
            final sales journey manually. That means fewer fake automation promises and more control
            over the actual customer experience.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            ['Mission', 'Turn travel discovery into meaningful human conversations and high-intent leads.'],
            ['Approach', 'Use elegant package storytelling, clean admin visibility, and careful manual follow-up.'],
            ['Future-ready', 'Keep the architecture modular so operations, payments, and package data can scale gradually.'],
          ].map(([title, description]) => (
            <div key={title} className="glass-panel border-rounded p-6">
              <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell mt-24">
        <SectionHeading
          eyebrow="Team"
          title="A compact team with premium service instincts."
          description="The brand story stays human by giving your managers real visibility into inquiries, package intent, and payment signals."
          align="center"
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {siteConfig.team.map((member) => (
            <div key={member.name} className="glass-panel border-rounded p-6">
              <div className="h-16 w-16 border-rounded bg-slate-950 text-center text-2xl leading-[64px] font-bold text-white">
                {member.name.charAt(0)}
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-slate-900">{member.name}</h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-800/70">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default AboutPage

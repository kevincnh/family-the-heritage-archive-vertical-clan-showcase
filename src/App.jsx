import React, { useState, useEffect, useRef } from 'react'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('branches')
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const sectionsRef = useRef([])
  const navRefs = useRef({})
  const navItems = [
    { id: 'branches', label: 'The Branches', matchIds: ['bloom', 'miller', 'sterling', 'vance'] },
    { id: 'values', label: 'Our Values', matchIds: ['values'] },
    { id: 'footer', label: 'The Collection', matchIds: ['footer'] }
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up')
          // Check which nav item's matchIds this matches
          const matchedItem = navItems.find(item => item.matchIds.includes(entry.target.id))
          if (matchedItem) {
            setActiveSection(matchedItem.id)
          }
        }
      })
    }, observerOptions)

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    // Observe specific timeline sections and other main sections
    const targetIds = ['bloom', 'miller', 'sterling', 'vance', 'values', 'footer']
    targetIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const activeEl = navRefs.current[activeSection]
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth
      })
    }
  }, [activeSection])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    // Set active section based on clicked link's mapping
    const matchedItem = navItems.find(item => item.matchIds.includes(id))
    if (matchedItem) {
      setActiveSection(matchedItem.id)
    }
  }

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
      {/* TopAppBar */}
      <nav
        className={`fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'py-2 shadow-md' : 'py-4 shadow-sm'
        }`}
      >
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <span className="font-display-lg text-headline-md text-primary tracking-tight">
            The Heritage Archive
          </span>
          <div className="relative hidden md:flex items-center space-x-8">
            <div
              ref={(el) => (navRefs.current['branches'] = el)}
              className={`group relative z-10 transition-colors duration-300 ${
                activeSection === 'branches' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
              }`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm flex items-center gap-1 cursor-pointer">
                The Branches <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              <div
                className={`absolute right-0 top-full pt-2 transition-all duration-200 ${
                  dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl p-4 w-48 space-y-2">
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm text-on-surface-variant hover:text-primary" href="#bloom" onClick={(e) => handleNavClick(e, 'bloom')}>
                    The Blooms
                  </a>
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm text-on-surface-variant hover:text-primary" href="#miller" onClick={(e) => handleNavClick(e, 'miller')}>
                    The Millers
                  </a>
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm text-on-surface-variant hover:text-primary" href="#sterling" onClick={(e) => handleNavClick(e, 'sterling')}>
                    The Sterlings
                  </a>
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm text-on-surface-variant hover:text-primary" href="#vance" onClick={(e) => handleNavClick(e, 'vance')}>
                    The Vances
                  </a>
                </div>
              </div>
            </div>
            <a
              ref={(el) => (navRefs.current['values'] = el)}
              className={`transition-colors duration-300 font-label-sm relative z-10 pb-1 ${
                activeSection === 'values' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
              }`}
              href="#values"
              onClick={(e) => handleNavClick(e, 'values')}
            >
              Our Values
            </a>
            <a
              ref={(el) => (navRefs.current['footer'] = el)}
              className={`transition-colors duration-300 font-label-sm relative z-10 pb-1 ${
                activeSection === 'footer' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
              }`}
              href="#footer"
              onClick={(e) => handleNavClick(e, 'footer')}
            >
              The Collection
            </a>
            {/* Sliding Underline */}
            <div
              className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`
              }}
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden px-gutter bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto text-center space-y-8 fade-in-up">
          <div className="inline-flex items-center space-x-2 text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="font-label-sm tracking-widest uppercase text-primary">A Collective Legacy</span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface max-w-4xl mx-auto">
            One Tree, Many <span className="text-primary italic">Branches</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            A vertical journey through the distinct chapters of our clan. Each section honors a unique lineage, woven together into one grand tapestry.
          </p>
          <div className="flex flex-col items-center pt-8">
            <div className="w-[1px] h-12 bg-outline-variant"></div>
            <p className="font-label-sm text-primary tracking-widest mt-4">BEGIN THE JOURNEY</p>
          </div>
        </div>
      </section>

      {/* Clan Chapters (Vertical Showcase) */}
      <main id="clan-chapters">
        {/* Chapter 1: The Bloom Family */}
        <section
          ref={addToRefs}
          className="py-24 px-gutter bg-surface transition-colors duration-500 hover:bg-surface-container-low opacity-0"
          id="bloom"
        >
          <div className="max-w-container-max mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="font-label-sm tracking-widest uppercase text-primary">Chapter I • Est. 1982</span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">The Bloom Family</h2>
              <div className="w-16 h-[2px] bg-primary/30 mx-auto"></div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] soft-elevation group">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80"
                alt="The Bloom family roots landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <h3 className="font-display-lg text-headline-md text-primary italic">Keepers of the Sun</h3>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  Rooted in the golden hills, the Blooms have always prioritized the warmth of home and the growth of the next generation. Their story is one of simple joys and enduring stability, defined by laughter in the garden and stories shared under the shade of old oaks.
                </p>
                <div className="flex items-center space-x-3 text-outline">
                  <span className="material-symbols-outlined">account_tree</span>
                  <span className="font-label-sm">Primary Lineage</span>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation border border-white/20">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80"
                    alt="Sarah and David"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation border border-white/20">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?auto=format&fit=crop&w=800&q=80"
                    alt="New life"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation border border-white/20">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
                    alt="Celebration"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="line-divider"></div>

        {/* Chapter 2: The Miller Branch */}
        <section
          ref={addToRefs}
          className="py-24 px-gutter bg-surface-container-lowest transition-colors duration-500 hover:bg-surface-container opacity-0"
          id="miller"
        >
          <div className="max-w-container-max mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="font-label-sm tracking-widest uppercase text-secondary">Chapter II • Est. 1954</span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">The Miller Branch</h2>
              <div className="w-16 h-[2px] bg-secondary/30 mx-auto"></div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] soft-elevation group">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80"
                alt="Coastal forest landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                    alt="Elder couple"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80"
                    alt="Vintage gear"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80"
                    alt="Family letters"
                  />
                </div>
              </div>
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
                <h3 className="font-display-lg text-headline-md text-secondary italic">Seekers of the Horizon</h3>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  The Millers brought a spirit of curiosity and exploration to our archive. Travelers, artists, and scholars, their legacy is found in the letters sent from distant shores and the art that fills our collective spaces. They taught us that the world is wide and waiting.
                </p>
                <div className="flex items-center space-x-3 text-outline">
                  <span className="material-symbols-outlined">explore</span>
                  <span className="font-label-sm">Matriarchal Line</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="line-divider"></div>

        {/* Chapter 3: The Sterling Lineage */}
        <section
          ref={addToRefs}
          className="py-24 px-gutter bg-surface transition-colors duration-500 hover:bg-surface-container-low opacity-0"
          id="sterling"
        >
          <div className="max-w-container-max mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="font-label-sm tracking-widest uppercase text-tertiary">Chapter III • Est. 1910</span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">The Sterling Lineage</h2>
              <div className="w-16 h-[2px] bg-tertiary/30 mx-auto"></div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] soft-elevation group">
              <img
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                alt="Mountain range landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <h3 className="font-display-lg text-headline-md text-tertiary italic">Founders of the Foundation</h3>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  The Sterlings represent our oldest documented roots. With a history tied to the land and the industry of the early century, they provided the resilience and values that anchor us today. Their steadfast nature is the bedrock upon which all subsequent branches were built.
                </p>
                <div className="flex items-center space-x-3 text-outline">
                  <span className="material-symbols-outlined">history_edu</span>
                  <span className="font-label-sm">Foundational Line</span>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    src="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&w=1200&q=80"
                    alt="Sterling ancestors"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    src="https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80"
                    alt="Old farmhouse"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80"
                    alt="Pocket watch"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="line-divider"></div>

        {/* Chapter 4: The Vance Branch */}
        <section
          ref={addToRefs}
          className="py-24 px-gutter bg-surface-container-low transition-colors duration-500 hover:bg-surface opacity-0"
          id="vance"
        >
          <div className="max-w-container-max mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="font-label-sm tracking-widest uppercase text-primary">Chapter IV • Est. 1995</span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">The Vance Branch</h2>
              <div className="w-16 h-[2px] bg-primary/30 mx-auto"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="aspect-square rounded-3xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
                    alt="Modern creative space"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="font-display-lg text-headline-md text-primary italic">The Modern Weavers</h3>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  As the newest established branch, the Vances bring a contemporary energy to our heritage. Tech-savvy yet deeply traditional, they are the ones who pioneered this digital archive, ensuring that the ancient stories of the Sterlings and the adventures of the Millers live forever in pixels and light.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video rounded-xl bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">photo_library</span>
                  </div>
                  <div className="aspect-video rounded-xl bg-surface-container-highest flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">videocam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Values Section */}
      <section ref={addToRefs} className="py-32 relative overflow-hidden bg-surface-container-low opacity-0" id="values">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="bg-tertiary-container/10 rounded-[3rem] p-12 md:p-20 border border-tertiary-container/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
              <span className="material-symbols-outlined text-[400px] text-tertiary-container/10 select-none">
                auto_awesome
              </span>
            </div>
            <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
              <div className="space-y-6">
                <span className="font-label-sm text-primary tracking-widest uppercase">The Heritage Ethos</span>
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Values That Bind Us</h2>
                <div className="w-24 h-1 bg-primary-container mx-auto rounded-full"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                <div className="space-y-4 group">
                  <div className="w-16 h-16 bg-white dark:bg-surface-dim rounded-full flex items-center justify-center mx-auto soft-elevation group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">favorite</span>
                  </div>
                  <h3 className="font-display-lg text-headline-md text-on-surface italic">Unconditional Love</h3>
                  <p className="font-body-md text-on-surface-variant">The universal foundation of every branch we grow.</p>
                </div>
                <div className="space-y-4 group">
                  <div className="w-16 h-16 bg-white dark:bg-surface-dim rounded-full flex items-center justify-center mx-auto soft-elevation group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">history_edu</span>
                  </div>
                  <h3 className="font-display-lg text-headline-md text-on-surface italic">Honoring Roots</h3>
                  <p className="font-body-md text-on-surface-variant">Respecting the unique sacrifices of each lineage.</p>
                </div>
                <div className="space-y-4 group">
                  <div className="w-16 h-16 bg-white dark:bg-surface-dim rounded-full flex items-center justify-center mx-auto soft-elevation group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-primary text-3xl">diversity_3</span>
                  </div>
                  <h3 className="font-display-lg text-headline-md text-on-surface italic">Constant Growth</h3>
                  <p className="font-body-md text-on-surface-variant">Encouraging new sprouts while staying grounded.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 bg-surface-container-lowest dark:bg-surface-container-low border-t border-outline-variant/30" id="footer">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto space-y-8 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <span className="font-display-lg text-headline-md text-primary">The Heritage Archive</span>
            <p className="text-on-surface-variant dark:text-surface-variant font-body-md opacity-80">
              A collective journey across generations.
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md opacity-80 hover:opacity-100" href="#">
              The Collection
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors font-body-md opacity-80 hover:opacity-100" href="#">
              Archive Policy
            </a>
            <span className="font-body-md text-secondary italic">Est. 1910</span>
          </div>
        </div>
        <div className="max-w-container-max mx-auto px-gutter mt-12 pt-8 border-t border-outline-variant/10 text-center md:text-left">
          <p className="text-outline text-label-sm uppercase tracking-widest">
            © 2024 The Heritage Collective. Curated with intention.
          </p>
        </div>
      </footer>
    </div>
  )
}

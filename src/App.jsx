import React, { useState, useEffect, useRef } from 'react'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const sectionsRef = useRef([])

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
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
      {/* TopAppBar */}
      <nav
        className={`fixed top-0 w-full z-50 bg-surface/90 dark:bg-surface-dim/90 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'py-2 shadow-md' : 'py-4 shadow-sm'
        }`}
      >
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <span className="font-display-lg text-headline-md text-primary dark:text-primary-fixed-dim tracking-tight">
            The Heritage Archive
          </span>
          <div className="hidden md:flex items-center space-x-8">
            <div
              className="group relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm flex items-center gap-1">
                The Branches <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              <div
                className={`absolute right-0 top-full pt-2 transition-all duration-200 ${
                  dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl p-4 w-48 space-y-2">
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm" href="#bloom">
                    The Blooms
                  </a>
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm" href="#miller">
                    The Millers
                  </a>
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm" href="#sterling">
                    The Sterlings
                  </a>
                  <a className="block p-2 hover:bg-surface-container-low rounded-lg transition-colors text-label-sm" href="#vance">
                    The Vances
                  </a>
                </div>
              </div>
            </div>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm" href="#values">
              Our Values
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-sm" href="#footer">
              The Collection
            </a>
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrfmhU0hzw_4glyngD-HYrq4us8orWUiP0ROzQINjaNFjGJOKHzYlHdkjoJNARLhkVmdZvGpKb8cNWTpQOWXXdyQh2ZIIYBdkUNQF7vBkZBirsVKEZzGkBqoPxRSvdfAq9T-1zwwzQ1tCaoZn7Hd-XQdWAFAMBupyzuV4iuFIAkEdBl3F3QFb8x7fvuWwrqvTflO0Zp-IGyM87sBXp-gliAq9wEEwgJucVQbAuFYJ0SPs0zzhSkT8ui4T12DYOFEGWWMiffqJXTyo"
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
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhS46KnKWVMsC-l5M1HiAEryWQ_5t6kV7lsKpp2lXtuVF9tb4jpUKI6YeavzQgxbsxtZihR8kYh2bdWOeVkc38NnmTYkrIdshBZ4-HsFHDUsnMSrtAlVLlX_KQzqg5Q_R5-z6FgE6xU6TtBxso1ddd9IWUg-0SjTT-3hMyyY-9G39rTcocWrSR6Kn6CyA_0S0ncTyjKoxblMrw7FIIHaBYv_WjdeG8NW3zsEIgKwxbWJYqf2tgzSnq3-Xk7LSYivRiTz0rUry1Kl0"
                    alt="Sarah and David"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation border border-white/20">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh36_m-h6oscLmCrPQsUj_Th2pKGPsvcrWVWyUe1xukgUAWJr85U6TukHnPjJx0btmRFPCfIPX6dAakGc7YBwUUAhVkJhG9bFVGASQVJcV937HnrY4jpBq09CoUPEvwISGGzDu9EQefxaKPbBLjYVqz6K3Z_ViCKaOU8EOUff9zkte9kYso_P5umE1ezAn2_7QAtn43pv5lae7V57zuCu8X1O48w_cbQAylg_tojuQ4GTXF0CMyYfOCYb5STTeZXbZ74HB3YK5P7s"
                    alt="New life"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation border border-white/20">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4W5c5MFn9UPcrZLe-f177FchJwyZZQz0migjs8z1XOKqBsrgZmaxs-Nm5axGGTD9EiDBpI8VXKc_i13xcAeqYkxLOu1ym3k6D1cy3TRt3KkaMwQRFpU0cz7CuIDAUNgLiRpSTOXTxTapXknwrYaE1pw0UpYoq9q3lI4MQQg5z_CFsYn-dgCjW-m8SfjtfXoYexSk6dNH2sp7X3yx-8lyUVhOy0ykWjEPFnPjOnZyqhSHkIWURgWAZq5Mpclu6SBMNC65rnNnVb9E"
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC-A2Nosnh9aHV9tDVcRgOs1bAGIZE86LeKDIF8QsacXhTKbXUzHVDibivRHB1hphN2yLwko_DowgdD5DJex7-xKmknE04QOsgFbVtOvech2rL7qEcPIvXC4XdfSybs1eiMTG4BxpGC6F-YDaazT-qvKi6Enw2t0cLkMixs5oOtDQZhyOtQ1c-4FyXbK39-wLV8ewkYv9aOCimMAdmmUPQbTtcKvU76UArDi1wODFVPSFoQ04kMxogZ_puZ8FaCvY0JlLpwxFAktA"
                alt="Coastal forest landscape"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz_L2C5hMbUBAzEFNopBIM1j-BZqC9XoYsE-TS_R5kC2x5IPKXKEDOc8DcTJizIOtKv4qMH5A_6u1QjNRTBO1CMmH6T5bqiuqS2YmtkdyBRYHizDfasgcegMyujaMnrO-Lr6o8cTND_yPdpHYqitEEE3mGRqExO-1FexOn1RzSFEQmvbxpJLb0LKsA0NpSCY2CoOfNqZE892QLIfkcYYyOAKbb_LAHYdjw-ki_Bl80rqJUmPLcke8Y6C5UMu8ucj5sRauE0FFJuoI"
                    alt="Elder couple"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1h88HwPG0E6gfwen217Ewz1NctqPiX9Hd9jZdcKvyqSmT3nY0NC6It7kZ89urp2qDe_a3700zlvTLbhltiFJ2raIn25ZBSB9pMHZEA03jr3ALld-p6lZCUFM7GpJ3ZhyzyZbef8pVohumfYn1vG_dMRVRZ_NzCYv-BKgvavG8rm_GvemzI_Sw2n7fVNWEEhEZ85NZOE821O-uJx7xJIj8NsFiDZi-KfFtxlKhrNeNKpgvDqJd1ZbTHF0pcbQNvAieQdx4yDtpJoE"
                    alt="Vintage gear"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCjteQ2qCngxTH9cdk9ePAP5DxuyOy92SwBHrbUQ8XNrnS5LHHic6YDOW3d29k-Ck9lrV9hr5MdhKVINAo4Y-hHFilil8_NEJHVuxAc6o9hvalV_u6y2NE2NwLtGxhWKM5kjx_VjsuwZUzA8xFqXfsmk_mn5AuF8ONaCH9RpbDE09IeNRNSHBiSVVDLX1LyOYDPd9yX4au25NUnF2sG01frD5vbsTQHaLJsnR2Xn6IFjqv85oxliKhSwNar3zRhfBtualGJJm1Seo"
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqOBXNcQChalQOGpvqOrKRBlFqAp8SvFt6Ru4TIojjUb9YZu1tL0uB7ToDgD8yzzm37znTvZYFm2D_KlRNZwXxs1Cx5D9Cs3jSs8Fg4npoKcOyWC4Yi607h9jPG_HZ9362ZVEKAclcBtp_Z5Zy05gfIZgdeTZq3na1QDB69bM4BhjRyyBPjPHXRuqmuy4g8POWhs5VMdUFFpTrCED8JbdLOHK92Tr-Vu2qdCSz2gnyCgGON_cby3YVWuWDX1ytLGRiRqp1ek53Rzk"
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
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo2z1wqD7zQFGGKO--VTvvq1aYBSEQlBRJfjM77b4hE_GzuYOL248bxzCVSAgSfUr_eUODLelbN5Qi9Wnx1LdAjfa_3Wwfc84mMoIMk_-rz03xonHJo_y89Qw6qO1pAYQFhSzW2_uXos3XTB-9N0_tNTrcUKg_y71fCQZRam2wjLr9pz_rYldKT0sj5vfzjfX_f79OcK6E5nRyBaB_EECJ4Pe7sV63DXyHDPrHTj-Ge0vtP26uJ1u4wN04PhOuaRMxfvAHSYaeCIU"
                    alt="Sterling ancestors"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdaXqtn-JaiyGPl_eBwOCcfRfgJ8P2SfypwLpf1M0j60kQEcZzpTXkLcOGuJjYUPeDxCN9lrTscCbqnzkIqWURgd4cS0OJCFutrpjIyIuiE02lOFb6_4Ovn-IJrcg8So-EGn63IOkUlqPU2RDHRJUo_n6aYwaF4nM-xsHk2jv8tNTzVHsYeTF_ljozbCfbX05qJsaaNatUYbrpioAaoyzvwXCJTGuOO9TDHI3KgIHCA2NPWtcu7PFbEp9o8bbMtlHj_K6KfvTJtIg"
                    alt="Old farmhouse"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden soft-elevation">
                  <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmQVulApY64fVb1AsO8V_2EHHuwhZycaIIzVJBZcwFJ-996AilMK179ZlvpuFQve6szz-TRd4YIQaT0HJtsWobwno_mmD1H4oSLLU1s-6r3dFuiUWD_WcuCtN6qG_cLUNBbDC7MHkqz-4THTyMT6jU6KrfeBxLLG-ZcOXIE2C-P1l6mX3g4aFIC8VrHwN3tsEJQkJSZI_f-7hdsg_JwAQFSbvZyfeKtEcFTO5wYiXEBXRXNm_DjmbjuVnX1MXVf0yGW56UtsGoWXE"
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
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt11czBUJpy9hpps7IepKtrkx3Au3OfzjRBlwKhMa87l__KlADKC7y4MWaIurY489PtFG-0i_ND_idZLCjrvCj1B_fISa4cihYkkUrFCpWlTX0A-0uDjORtCxAJWHzb-Jh5AGDU1GIzYIbwxssfjLxK_GrUalWU5TUOo27OVlNkJlaC3y-L36c6QDMt4BA3UL6k_-3Rnie7UYxiNvJaBm8Okjw8GqrBl51qoQ-3-21L7onwktO8CxzjctHJAt6fHEQwHdsniUc3I0"
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

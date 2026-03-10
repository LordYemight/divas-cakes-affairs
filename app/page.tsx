'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Cake, 
  Star, 
  MapPin, 
  Heart, 
  Award, 
  Smile, 
  Instagram, 
  Mail, 
  Phone, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight,
  ImageOff,
  Quote
} from 'lucide-react';

// --- Types ---
interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

// --- Components ---

const SafeImage = ({ src, alt, fill, width, height, className, priority }: SafeImageProps) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-primary/10 ${className}`}>
        <ImageOff size={32} className="text-primary/20" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
};

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const brand = {
    name: "Diva's Cakes Affairs",
    tagline: "Where Every Slice Tells a Story of Luxury.",
    description: "Artisan cake studio in Lagos, specializing in bespoke wedding, celebration, and gourmet dessert cakes crafted with premium ingredients.",
    industry: "food",
    region: "nigeria",
    currency: "₦"
  };

  const images = {
    hero: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=1920&q=80",
    about: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=800&q=80",
    products: [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516685018646-527ad952fca3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80",
    ]
  };

  const features = [
    { title: "Bespoke Design", desc: "Every cake is a unique masterpiece tailored precisely to your vision and theme.", icon: <Cake /> },
    { title: "Premium Ingredients", desc: "We exclusively use high-quality butter, fine cocoa, and fresh, natural flavorings.", icon: <Star /> },
    { title: "Lagos Delivery", desc: "Reliable and temperature-controlled delivery service across Lagos State.", icon: <MapPin /> }
  ];

  const products = [
    { name: "Royal Wedding Tier", desc: "A magnificent three-tier cake, draped in fine buttercream florals and edible gold leaf.", price: "₦120,000", image: images.products[0] },
    { name: "Velvet Dream Cupcakes", desc: "Rich Red Velvet sponge topped with our signature cream cheese frosting. Dozen.", price: "₦8,500", image: images.products[1] },
    { name: "Gourmet Chocolate Bar", desc: "Decadent dark chocolate mud cake layered with salted caramel mousse.", price: "₦18,000", image: images.products[2] },
    { name: "Birthday Luxe Smash", desc: "Perfect for intimate celebrations. Custom flavors available.", price: "₦15,500", image: images.products[3] }
  ];

  const stats = [
    { number: "400+", label: "Weddings Designed", icon: <Heart /> },
    { number: "5+", label: "Years of Excellence", icon: <Award /> },
    { number: "98%", label: "Client Satisfaction", icon: <Smile /> }
  ];

  const testimonials = [
    { name: "Tosin M.", text: "The wedding cake was the absolute centerpiece of the reception. Flawless execution!", role: "Wedding Client" },
    { name: "Jide O.", text: "The most luxurious chocolate cake I have ever tasted. Worth every Naira.", role: "Corporate Client" }
  ];

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // --- Scroll Reveals ---
  const revHero = useScrollReveal();
  const revFeat = useScrollReveal();
  const revProd = useScrollReveal();
  const revAbout = useScrollReveal();
  const revTest = useScrollReveal();
  const revContact = useScrollReveal();

  return (
    <main className="relative bg-secondary overflow-x-hidden text-primary">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary py-4 shadow-xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className={`font-heading text-3xl font-black tracking-tighter transition-colors ${scrolled ? 'text-white' : 'text-primary'}`}>
              DC<span className={scrolled ? 'text-accent' : 'text-primary'}>A</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Collections', 'Our Story', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '')}`} 
                className={`text-sm font-bold uppercase tracking-widest hover:opacity-70 transition-opacity ${scrolled ? 'text-white' : 'text-primary'}`}
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 ${scrolled ? 'bg-white text-primary' : 'bg-primary text-white'}`}
            >
              BOOK NOW
            </a>
          </div>

          <button className="md:hidden text-primary" onClick={() => setMenuOpen(true)}>
            <Menu className={scrolled ? 'text-white' : 'text-primary'} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="relative w-full max-w-sm bg-primary h-full p-10 animate-slideIn flex flex-col">
            <button className="self-end text-white mb-10" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {['Home', 'Collections', 'Our Story', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '')}`} 
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-3xl font-heading font-bold"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        id="home"
        ref={revHero.ref}
        className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src={images.hero} 
            alt="Luxury Cake" 
            fill 
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />
        </div>

        <div className={`relative z-10 max-w-4xl transition-all duration-1000 delay-300 ${revHero.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h1 className="font-heading text-6xl md:text-8xl font-black leading-[0.9] text-primary">
            Artistry <br /> <span className="text-accent italic">Baked In.</span>
          </h1>
          <p className="mt-8 text-xl text-primary/80 max-w-xl leading-relaxed">
            {brand.tagline} {brand.description}
          </p>
          <div className="mt-12 flex flex-wrap gap-5">
            <a href="#products" className="bg-primary text-white px-10 py-4 rounded-full font-black text-lg hover:bg-primary/90 transition-all flex items-center gap-3 group">
              VIEW COLLECTIONS <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
            <a href="#contact" className="border-2 border-primary text-primary px-10 py-4 rounded-full font-black text-lg hover:bg-primary hover:text-white transition-all">
              BOOK CONSULTATION
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="py-12 border-y border-primary/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16">
          {['Bespoke', 'Luxury', 'Artisan', 'Lagos Finest'].map((word, i) => (
            <div key={i} className="flex items-center gap-3 text-primary/40 font-heading text-xl font-bold uppercase tracking-[0.2em]">
              <div className="w-2 h-2 rounded-full bg-accent" />
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section 
        id="features"
        ref={revFeat.ref}
        className={`py-24 px-6 max-w-7xl mx-auto transition-all duration-1000 ${revFeat.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-black">Our Commitment to Quality</h2>
          <p className="text-accent font-bold mt-2 uppercase tracking-widest text-sm">More than just a dessert, it's an experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-10 rounded-[2rem] bg-white shadow-xl hover:-translate-y-2 transition-transform duration-500 border border-primary/5">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6">
                {f.icon}
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-primary/70 leading-relaxed">
                {f.desc} {f.title === "Lagos Delivery" ? "Sharp delivery guaranteed across all local government areas." : ""}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section 
        id="collections"
        ref={revProd.ref}
        className={`py-24 bg-primary text-white transition-all duration-1000 ${revProd.isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-heading text-5xl font-black">Signature Collections</h2>
              <p className="text-accent font-bold mt-2 uppercase tracking-widest">Handcrafted Excellence</p>
            </div>
            <a href="#contact" className="text-white border-b-2 border-accent pb-1 font-bold tracking-widest hover:text-accent transition-colors">
              CUSTOM ORDERS
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <div key={i} className="group bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all">
                <div className="relative h-64 overflow-hidden">
                  <SafeImage 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-sm font-bold">
                    {p.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold mb-2">{p.name}</h3>
                  <p className="text-white/60 text-sm line-clamp-2 mb-6">{p.desc}</p>
                  <a href="#contact" className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white py-3 rounded-xl font-bold text-sm hover:brightness-110 transition-all">
                    ORDER NOW <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="ourstory"
        ref={revAbout.ref}
        className="py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 items-center gap-16">
          <div className={`relative h-[600px] rounded-[3rem] overflow-hidden transition-all duration-1000 ${revAbout.isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <SafeImage src={images.about} alt="The Bakery" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-xl p-8 rounded-2xl border border-primary/10">
              <Quote size={40} className="text-accent mb-4" />
              <p className="italic text-primary font-heading text-xl">"Baking isn't just a process; it's the alchemy of transforming simple ingredients into memories."</p>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${revAbout.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h2 className="font-heading text-5xl font-black mb-8">The Diva's Story</h2>
            <p className="text-lg leading-relaxed text-primary/80 mb-10">
              Founded in 2018, Diva's Cakes Affairs was established with a singular mission: to elevate the standard of celebration baking in Nigeria. We combine classic French techniques with vibrant Nigerian flavor profiles to create edible art that delights both the eye and the palate.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="flex justify-center text-accent mb-3">{s.icon}</div>
                  <p className="text-3xl font-black">{s.number}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="inline-block mt-12 bg-primary text-white px-10 py-4 rounded-full font-black hover:bg-primary/90 transition-all">
              MEET THE BAKER
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        id="testimonials"
        ref={revTest.ref}
        className={`py-24 px-6 bg-secondary transition-all duration-1000 ${revTest.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-5xl font-black">Kind Words</h2>
            <p className="text-accent font-bold mt-2 uppercase tracking-widest text-sm">What Our Clients Say</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] shadow-xl border border-primary/5 relative">
                <p className="text-xl leading-relaxed text-primary/80 mb-8 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-accent text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section 
        id="contact"
        ref={revContact.ref}
        className={`py-24 px-6 transition-all duration-1000 ${revContact.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] overflow-hidden text-white shadow-2xl relative">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <Cake size={200} />
          </div>

          <div className="p-10 md:p-20 relative z-10">
            {formSubmitted ? (
              <div className="text-center py-20 animate-scaleIn">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-8">
                  <Smile size={40} className="text-white" />
                </div>
                <h3 className="font-heading text-4xl font-bold mb-4">Request Received</h3>
                <p className="text-white/70 text-lg">Our consultant will reach out via WhatsApp/Email shortly. Get ready for something sweet!</p>
                <button 
                  onClick={() => setFormSubmitted(false)}
                  className="mt-8 text-accent font-bold border-b border-accent"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-5xl font-black mb-4 text-center">Place Your Order Consultation</h2>
                <p className="text-white/60 text-center mb-12">Fill in your details and we'll contact you to discuss your dream cake.</p>
                
                <form onSubmit={handleForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Full Name</label>
                    <input required type="text" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Email Address</label>
                    <input required type="email" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Celebration Type</label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors">
                      <option className="bg-primary">Wedding</option>
                      <option className="bg-primary">Birthday</option>
                      <option className="bg-primary">Corporate Event</option>
                      <option className="bg-primary">Other Celebration</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-widest opacity-50">Message / Details</label>
                    <textarea rows={4} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors"></textarea>
                  </div>
                  <button type="submit" className="md:col-span-2 bg-accent text-white py-4 rounded-xl font-black text-lg hover:brightness-110 transition-all">
                    SUBMIT INQUIRY
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <span className="font-heading text-4xl font-black tracking-tighter">DCA</span>
              <p className="mt-6 text-white/50 leading-relaxed text-sm">
                Creating edible memories in Lagos since 2018. Bespoke luxury for every celebration.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-accent text-sm mb-6">Explore</h4>
              <ul className="space-y-4 text-white/70 text-sm">
                <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="#collections" className="hover:text-accent transition-colors">Collections</a></li>
                <li><a href="#ourstory" className="hover:text-accent transition-colors">Our Story</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-accent text-sm mb-6">Contact</h4>
              <ul className="space-y-4 text-white/70 text-sm">
                <li className="flex items-center gap-3"><Mail size={16} /> orders@divascakesaffairs.ng</li>
                <li className="flex items-center gap-3"><Phone size={16} /> +234XXXXXXXXXX</li>
                <li className="flex items-center gap-3"><MapPin size={16} /> Lagos, Nigeria</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-accent text-sm mb-6">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://instagram.com/divascake_affairs" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all">
                  <Instagram size={20} />
                </a>
                <a href="mailto:orders@divascakesaffairs.ng" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-all">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/30 text-xs uppercase tracking-widest">
              &copy; {new Date().getFullYear()} DIVA'S CAKES AFFAIRS. ALL RIGHTS RESERVED.
            </p>
            <p className="text-white/30 text-xs uppercase tracking-widest">
              Crafted for Lagos Celebrations.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
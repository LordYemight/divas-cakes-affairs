'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  ArrowRight, 
  Cake, 
  Award, 
  Truck, 
  CheckCircle,
  ImageOff,
  Quote,
  Sparkles
} from 'lucide-react';

// --- DATA & ASSETS ---
const BRAND = {
  name: "Diva's Cakes Affairs",
  tagline: "Crafting Edible Masterpieces for Your Milestones",
  description: "Lagos' premier destination for bespoke, handcrafted cakes. From stunning wedding tiers to delightful individual pastries, we bring your sweet dreams to life with the finest ingredients and artistry.",
  industry: "food",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = [
  "https://images.unsplash.com/photo-1706795042710-08025d8a03bf?auto=format&fit=crop&q=80&w=1080", // Hero
  "https://images.unsplash.com/photo-1733166199389-19acf7aef11b?auto=format&fit=crop&q=80&w=1080", // About
  "https://images.unsplash.com/photo-1671513580493-a1701a357101?auto=format&fit=crop&q=80&w=1080", // Product 1
  "https://images.unsplash.com/photo-1758995115475-7b7d6eb060ba?auto=format&fit=crop&q=80&w=1080", // Product 2
  "https://images.unsplash.com/photo-1729603370122-2c5b31bd0e9d?auto=format&fit=crop&q=80&w=1080", // Product 3
  "https://images.unsplash.com/photo-1647989551088-f93f35f03339?auto=format&fit=crop&q=80&w=1080", // Product 4
  "https://images.unsplash.com/photo-1575886672692-34cb9b65a074?auto=format&fit=crop&q=80&w=1080", // Gallery
  "https://images.unsplash.com/photo-1566977806197-b52b166f231f?auto=format&fit=crop&q=80&w=1080", // Gallery
];

const PRODUCTS = [
  {
    name: "The Royal Wedding Tier",
    description: "A stunning five-tier vanilla-almond cake, adorned with edible gold leaf and fresh orchids. Serves 150+",
    price: "₦120,000",
    image: IMAGES[2]
  },
  {
    name: "Chocolate Decadence Sphere",
    description: "Rich dark chocolate fudge cake infused with espresso, finished with a mirror glaze. Serves 12-15",
    price: "₦28,500",
    image: IMAGES[3]
  },
  {
    name: "Lagos Luxe Cupcake Box",
    description: "Box of 12 assorted signature cupcakes: Red Velvet, Salted Caramel, and Champagne flavor.",
    price: "₦15,000",
    image: IMAGES[4]
  },
  {
    name: "Anniversary Mini-Cake",
    description: "Perfect for small celebrations. Moist lemon cake with raspberry buttercream. Serves 8-10",
    price: "₦18,000",
    image: IMAGES[5]
  }
];

const FEATURES = [
  { title: "Bespoke Design", description: "Every cake is a unique piece of art, tailored exactly to your vision and event theme.", icon: <Cake className="text-accent" /> },
  { title: "Premium Ingredients", description: "We use only the finest imported chocolates and fresh dairy. Quality wey go loud!", icon: <Star className="text-accent" /> },
  { title: "Lagos Delivery", description: "Reliable, temperature-controlled delivery service across Lagos to ensure perfection.", icon: <Truck className="text-accent" /> }
];

const STATS = [
  { number: "500+", label: "Successful Deliveries", icon: <CheckCircle size={20} /> },
  { number: "10+ Years", label: "Experience", icon: <Award size={20} /> },
  { number: "4.9/5", label: "Average Rating", icon: <Star size={20} /> }
];

const TESTIMONIALS = [
  { name: "Adebayo K.", text: "The wedding cake was breathtaking! It tasted even better than it looked. Professional and timely service.", role: "Wedding Planner" },
  { name: "Chiamaka O.", text: "My husband loved his birthday cake! The salted caramel flavor is addictive. Highly recommend for luxury events.", role: "Client" },
  { name: "Segun D.", text: "Quick turnaround on a custom order. The presentation was flawless. Diva's is the new standard.", role: "Event Organizer" }
];

// --- COMPONENTS ---

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
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
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}

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
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'unset';
  }, [menuOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const sectionReveal = {
    hero: useScrollReveal(),
    features: useScrollReveal(),
    products: useScrollReveal(),
    about: useScrollReveal(),
    testimonials: useScrollReveal(),
    contact: useScrollReveal()
  };

  return (
    <main className="relative">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-md shadow-xl py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 group">
            <span className="font-heading text-3xl font-black text-accent tracking-tighter">DC</span>
            <span className={`text-xs font-mono tracking-[0.2em] uppercase transition-colors ${scrolled ? 'text-secondary' : 'text-primary'}`}>
              Diva's Cakes
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-bold uppercase tracking-widest transition-colors hover:text-accent ${scrolled ? 'text-secondary' : 'text-primary'}`}
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-accent text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 hover:brightness-110 transition-all flex items-center gap-2"
            >
              Order Now <ArrowRight size={16} />
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className={scrolled ? 'text-secondary' : 'text-primary'} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] animate-fadeIn">
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 shadow-2xl flex flex-col">
            <button className="self-end p-2" onClick={() => setMenuOpen(false)}>
              <X className="text-secondary" />
            </button>
            <div className="mt-12 flex flex-col gap-8">
              {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-heading font-bold text-secondary hover:text-accent transition-colors"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setMenuOpen(false)}
                className="mt-6 bg-accent text-primary text-center py-4 rounded-xl font-bold uppercase tracking-widest"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION - HR-C Pattern (Split) */}
      <section 
        id="home"
        ref={sectionReveal.hero.ref}
        className="min-h-screen grid md:grid-cols-2 items-center bg-secondary overflow-hidden pt-20 md:pt-0"
      >
        <div className={`px-8 md:px-16 py-12 md:py-20 transition-all duration-1000 ${sectionReveal.hero.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <h1 className="font-heading text-5xl md:text-8xl font-black text-primary leading-[0.9] tracking-tight">
            Your Vision, <br />
            <span className="text-accent italic">Baked to</span> <br />
            Perfection.
          </h1>
          <p className="text-primary/70 mt-8 text-xl max-w-md leading-relaxed">
            {BRAND.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="#products" className="bg-primary text-secondary px-10 py-4 rounded-full font-bold text-center hover:bg-primary/90 transition-all shadow-lg">
              View Our Gallery
            </a>
            <a href="#contact" className="border-2 border-primary text-primary px-10 py-4 rounded-full font-bold text-center hover:bg-primary hover:text-secondary transition-all">
              Book a Call
            </a>
          </div>
        </div>
        <div className={`relative h-full min-h-[500px] transition-all duration-1000 delay-300 ${sectionReveal.hero.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <SafeImage 
            src={IMAGES[0]} 
            alt="Bespoke Cake Display" 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent md:block hidden" />
          {/* Accent decoration */}
          <div className="absolute top-10 right-10 w-32 h-32 border-2 border-accent/30 rounded-full animate-float" />
          <div className="absolute bottom-1/4 left-10 w-16 h-16 bg-accent/20 rounded-lg rotate-12" />
        </div>
      </section>

      {/* STAT STRIP - A6c Pattern */}
      <div className="bg-primary py-12 border-y border-accent/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <p className="text-4xl font-black text-secondary">{stat.number}</p>
              <p className="text-accent/60 text-sm uppercase tracking-widest mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section 
        id="features"
        ref={sectionReveal.features.ref}
        className="py-24 bg-secondary"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${sectionReveal.features.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary">The Diva Difference</h2>
            <p className="text-primary/60 mt-4 text-lg">Why discerning clients choose Diva's Cakes Affairs for their celebrations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((f, i) => (
              <div 
                key={i} 
                className={`p-10 rounded-3xl bg-white/50 border border-primary/5 hover:border-accent/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group transition-all duration-1000`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-500">
                  {React.cloneElement(f.icon as React.ReactElement, { className: "group-hover:text-primary transition-colors" })}
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary">{f.title}</h3>
                <p className="text-primary/70 mt-4 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section 
        id="gallery"
        ref={sectionReveal.products.ref}
        className="py-24 bg-primary text-secondary"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-1000 ${sectionReveal.products.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent">Signature Selections</h2>
              <p className="text-secondary/60 mt-4 text-lg max-w-xl">Explore some of our most beloved creations available for order.</p>
            </div>
            <a href="#contact" className="group flex items-center gap-3 text-accent font-bold uppercase tracking-widest hover:gap-5 transition-all">
              Request Custom Design <ArrowRight />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((product, i) => (
              <div 
                key={i} 
                className={`group relative bg-secondary/5 rounded-3xl overflow-hidden border border-secondary/10 hover:border-accent/40 transition-all duration-700 transition-all duration-1000`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SafeImage 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-accent font-bold text-lg">{product.price}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-accent group-hover:text-secondary transition-colors">{product.name}</h3>
                  <p className="text-secondary/50 text-sm mt-2 line-clamp-2">{product.description}</p>
                  <a href="#contact" className="mt-4 w-full py-3 border border-accent/30 rounded-xl text-center text-xs font-bold uppercase tracking-widest text-accent hover:bg-accent hover:text-primary transition-all inline-block">
                    Inquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - Split visual with stats */}
      <section 
        id="about"
        ref={sectionReveal.about.ref}
        className="py-24 bg-secondary overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className={`relative transition-all duration-1000 ${sectionReveal.about.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <SafeImage src={IMAGES[1]} alt="Cake Artist at work" fill className="object-cover" />
            </div>
            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -top-10 -left-10 w-32 h-32 border-4 border-primary/10 rounded-full" />
          </div>
          <div className={`transition-all duration-1000 delay-200 ${sectionReveal.about.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <span className="text-accent font-mono text-sm tracking-[0.3em] uppercase block mb-4">Our Heritage</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary leading-tight">
              From Our Kitchen to Your Celebration
            </h2>
            <p className="text-primary/70 mt-6 text-lg leading-relaxed">
              Founded on a passion for baking and design, Diva's Cakes Affairs has quickly become synonymous with luxury and reliability in the Nigerian cake scene.
            </p>
            <p className="text-primary/70 mt-4 text-lg leading-relaxed">
              We blend traditional techniques with modern aesthetics to deliver unforgettable centerpieces for your biggest moments. Whether it's the heart of Lagos Island or the outskirts, we ensure your sweet dreams travel safe.
            </p>
            <div className="mt-10 p-8 bg-primary/5 rounded-3xl border border-primary/5">
              <div className="flex items-center gap-4 text-primary italic text-lg font-serif">
                <Quote size={40} className="text-accent" />
                "We don't just bake cakes; we craft memories that linger long after the last crumb is gone."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Masonry Style */}
      <section 
        id="testimonials"
        ref={sectionReveal.testimonials.ref}
        className="py-24 bg-primary"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-1000 ${sectionReveal.testimonials.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-accent">What Our Clients Say</h2>
          </div>

          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={i} 
                className={`break-inside-avoid bg-secondary/5 p-8 rounded-3xl border border-secondary/10 relative group hover:bg-secondary/10 transition-all duration-500`}
              >
                <div className="flex text-accent mb-4 gap-1">
                  {[1,2,3,4,5].map(n => <Star key={n} size={14} fill="currentColor" />)}
                </div>
                <p className="text-secondary/90 italic leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4 border-t border-secondary/10 pt-6">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">{t.name}</h4>
                    <p className="text-accent/60 text-xs uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION - C2 Pattern */}
      <section 
        id="contact"
        ref={sectionReveal.contact.ref}
        className="py-24 bg-secondary"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-primary rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-accent p-12 text-primary">
              <h2 className="text-3xl font-heading font-black mb-8">Get In Touch</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Phone size={24} />
                  <div>
                    <p className="font-bold">Call/WhatsApp</p>
                    <p className="opacity-80">+234 801 234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail size={24} />
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="opacity-80 text-sm">orders@divascakesaffairs.ng</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin size={24} />
                  <div>
                    <p className="font-bold">Location</p>
                    <p className="opacity-80">Lagos Island, Nigeria</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 flex gap-4">
                <a href="https://instagram.com/divascake_affairs" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-secondary transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div className="md:w-2/3 p-12 relative">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-scaleIn">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center text-accent mb-6">
                    <Sparkles size={40} />
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-secondary mb-4">Request Received!</h3>
                  <p className="text-secondary/60">We'll get back to you within 24 hours to discuss your edible masterpiece.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-accent font-bold uppercase tracking-widest text-sm underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-2">Let's Discuss Your Dream Cake</h2>
                  <p className="text-secondary/50 mb-8">Fill the form below and we'll reach out shortly.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-secondary/40">Full Name</label>
                        <input required type="text" className="w-full bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-accent transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-secondary/40">Phone Number</label>
                        <input required type="tel" className="w-full bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-accent transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-secondary/40">Email Address</label>
                      <input required type="email" className="w-full bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-bold text-secondary/40">Event Details & Type of Cake</label>
                      <textarea rows={4} className="w-full bg-secondary/10 border border-secondary/20 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <button type="submit" className="w-full bg-accent text-primary py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2">
                      Send Inquiry <ArrowRight size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - F2 Pattern */}
      <footer className="bg-primary py-20 text-secondary border-t border-accent/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="mb-8">
            <span className="font-heading text-4xl font-black text-accent tracking-tighter block mb-2">DC</span>
            <p className="text-accent/60 font-mono text-xs tracking-[0.4em] uppercase">{BRAND.name}</p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12">
            {['Home', 'Gallery', 'About', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest hover:text-accent transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex gap-6 mb-12">
            <a href="https://instagram.com/divascake_affairs" className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
              <Instagram size={20} />
            </a>
            <a href="https://wa.me/+2348012345678" className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
              <Phone size={20} />
            </a>
            <a href="mailto:orders@divascakesaffairs.ng" className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
              <Mail size={20} />
            </a>
          </div>

          <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent mb-8" />
          
          <p className="text-secondary/40 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} {BRAND.name}. Handcrafted in Lagos.
          </p>
        </div>
      </footer>
    </main>
  );
}
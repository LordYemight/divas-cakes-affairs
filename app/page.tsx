'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChefHat, 
  Truck, 
  Palette, 
  Star, 
  Heart, 
  Cake, 
  Instagram, 
  Mail, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  Quote,
  ImageOff,
  Send
} from 'lucide-react';
import Image from 'next/image';

// --- DATA ---

const BRAND = {
  name: "Diva's Cakes Affairs",
  tagline: "Baking Dreams into Edible Reality.",
  description: "Artisan cakes and confectionery crafted with passion in the heart of Lagos. From birthdays to grand celebrations, let Diva's Cakes Affairs be the centerpiece of your joy.",
  contact: {
    whatsapp: "+234XXXXXXXXXX",
    instagram: "@divascake_affairs",
    email: "orders@divascakesaffairs.ng",
    address: "Lagos, Nigeria (Delivery Only)"
  }
};

const IMAGES = [
  "https://picsum.photos/seed/food0/1200/800",
  "https://picsum.photos/seed/food1/800/600",
  "https://picsum.photos/seed/food2/800/600",
  "https://picsum.photos/seed/food3/800/600",
  "https://picsum.photos/seed/food4/800/600",
  "https://picsum.photos/seed/food5/800/600",
  "https://picsum.photos/seed/food6/800/600",
  "https://picsum.photos/seed/food7/800/600",
  "https://picsum.photos/seed/food8/800/600",
  "https://picsum.photos/seed/food9/800/600"
];

const PRODUCTS = [
  { 
    name: "Classic Vanilla Dream", 
    desc: "A light, fluffy vanilla sponge layered with smooth buttercream and a hint of almond essence.", 
    price: "₦15,000", 
    img: IMAGES[2] 
  },
  { 
    name: "Chocolate Decadence", 
    desc: "Rich, dark chocolate cake with ganache filling and mirror glaze finish. Perfect for serious chocolate lovers.", 
    price: "₦22,000", 
    img: IMAGES[3] 
  },
  { 
    name: "Red Velvet Royalty", 
    desc: "Moist, vibrant red velvet cake with our signature cream cheese frosting.", 
    price: "₦18,500", 
    img: IMAGES[4] 
  },
  { 
    name: "Custom Celebration Tier", 
    desc: "Fully bespoke multi-tiered cake design consultation and creation for weddings and large events.", 
    price: "Starting From ₦85,000", 
    img: IMAGES[5] 
  }
];

const FEATURES = [
  {
    title: "Artisan Craftsmanship",
    desc: "Every cake is handcrafted from scratch using premium, locally sourced ingredients.",
    icon: <ChefHat size={32} />
  },
  {
    title: "Lagos Delivery",
    desc: "Sharp delivery across all major areas in Lagos. We ensure your cake arrives in perfect condition.",
    icon: <Truck size={32} />
  },
  {
    title: "Custom Design",
    desc: "Bring your vision to life with personalized flavors, designs, and decorations tailored to you.",
    icon: <Palette size={32} />
  }
];

const STATS = [
  { number: '5+', label: 'Years in Business', icon: <Star size={24} /> },
  { number: '300+', label: 'Successful Events', icon: <Cake size={24} /> },
  { number: '100%', label: 'Customer Satisfaction', icon: <Heart size={24} /> }
];

const TESTIMONIALS = [
  { 
    name: "Amara O.", 
    text: "The Red Velvet was absolutely divine! It stole the show at my anniversary dinner. Flawless service.", 
    role: "Event Planner" 
  },
  { 
    name: "Segun F.", 
    text: "Ordered a custom birthday cake for my son. The design was exactly what we asked for. Highly recommend Diva's!", 
    role: "Client" 
  }
];

// --- COMPONENTS ---

const SafeImage = ({ src, alt, fill, width, height, className, priority }: any) => {
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
};

const useScrollReveal = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
};

const SectionHeading = ({ title, subtitle, light = false }: any) => (
  <div className="text-center mb-16">
    <h2 className={`font-heading text-4xl md:text-5xl font-bold ${light ? 'text-white' : 'text-primary'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 max-w-2xl mx-auto text-lg ${light ? 'text-white/70' : 'text-primary/60'}`}>
        {subtitle}
      </p>
    )}
    <div className={`w-24 h-1 mx-auto mt-6 ${light ? 'bg-accent' : 'bg-accent'}`} />
  </div>
);

// --- MAIN PAGE ---

export default function DivaCakes() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
  };

  return (
    <main className="relative">
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary py-4 shadow-xl' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className={`font-heading text-3xl font-black tracking-tighter transition-colors ${
              scrolled ? 'text-white' : 'text-primary'
            }`}>
              DC
            </span>
            <span className={`text-xs font-mono tracking-[0.2em] uppercase hidden sm:block ${
              scrolled ? 'text-white/60' : 'text-primary/60'
            }`}>
              {BRAND.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Gallery', 'About', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors ${
                  scrolled ? 'text-white/80' : 'text-primary'
                }`}
              >
                {item}
              </a>
            ))}
            <a 
              href="#contact" 
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all animate-glow ${
                scrolled 
                  ? 'bg-accent text-white hover:brightness-110' 
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              ORDER NOW
            </a>
          </div>

          <button className="md:hidden text-primary" onClick={() => setMenuOpen(true)}>
            <Menu className={scrolled ? 'text-white' : 'text-primary'} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="relative w-[80%] max-w-sm h-full bg-primary flex flex-col p-8 animate-slideIn">
            <button className="self-end text-white mb-12" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {['Home', 'Gallery', 'About', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="text-white text-2xl font-heading font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                className="mt-4 bg-accent text-white px-8 py-4 rounded-full font-bold text-center"
                onClick={() => setMenuOpen(false)}
              >
                ORDER NOW
              </a>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section 
        id="home" 
        ref={heroReveal.ref}
        className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="absolute inset-0 z-0">
          <SafeImage 
            src={IMAGES[0]} 
            alt="Delicious Cake Background" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/70 to-accent/20" />
        </div>
        
        <div className={`relative z-10 text-center max-w-4xl px-6 transition-all duration-1000 ${
          heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="font-heading text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
            Your Celebration <br /> 
            <span className="text-secondary/80">Deserves the Best.</span>
          </h1>
          <p className="text-white/80 mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Exquisite, handcrafted cakes made with love in the heart of Lagos. From birthdays to grand weddings, we bake your dreams into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href="#products" className="bg-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-xl">
              VIEW OUR GALLERY
            </a>
            <a href="#contact" className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              CONTACT US
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section 
        id="features" 
        ref={featuresReveal.ref}
        className="py-24 px-6 bg-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Why Choose Diva's?" subtitle="Quality, Passion, and Perfection in every single slice." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx}
                style={{ transitionDelay: `${idx * 200}ms` }}
                className={`p-10 rounded-3xl bg-white shadow-sm border border-primary/5 hover:shadow-xl transition-all duration-500 group ${
                  featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">{feature.title}</h3>
                <p className="text-primary/60 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section 
        id="gallery" 
        ref={productsReveal.ref}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            title="Our Signature Creations" 
            subtitle="Explore our most popular cakes or request a custom masterpiece for your event." 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((product, idx) => (
              <div 
                key={idx}
                style={{ transitionDelay: `${idx * 150}ms` }}
                className={`group flex flex-col h-full bg-secondary/30 rounded-3xl overflow-hidden border border-primary/5 transition-all duration-700 ${
                  productsReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <SafeImage 
                    src={product.img} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-heading text-xl font-bold text-primary">{product.name}</h3>
                  <p className="text-primary/60 text-sm mt-2 line-clamp-3 flex-grow">{product.desc}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-accent font-bold text-lg">{product.price}</span>
                    <a href="#contact" className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-accent transition-colors">
                      <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section 
        id="about" 
        ref={aboutReveal.ref}
        className="py-24 px-6 bg-primary text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`relative transition-all duration-1000 ${
            aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700">
              <SafeImage src={IMAGES[1]} alt="The Baker's Studio" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-accent flex items-center justify-center p-4 border-8 border-primary animate-float">
              <p className="text-center font-heading font-bold text-lg leading-tight">
                Crafting Joy <br /> Since 2019
              </p>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${
            aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <h2 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-8">
              The Art of <br /> Heartfelt Baking
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Diva's Cakes Affairs started as a home passion project and has grown into Lagos's trusted source for celebration cakes. We believe that a cake is more than just dessert—it's the sweet centerpiece of your most cherished memories. 
            </p>
            
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-accent mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-white/50 text-xs uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section 
        id="testimonials" 
        ref={testimonialReveal.ref}
        className="py-24 px-6 bg-secondary/50"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Sweet Words from Clients" subtitle="Stories of joy shared over a slice of our cakes." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={i}
                className={`bg-white p-10 rounded-[2rem] shadow-sm border border-primary/5 relative transition-all duration-700 ${
                  testimonialReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <Quote className="absolute top-8 right-8 text-accent/10" size={60} />
                <div className="flex text-accent mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-primary/70 text-xl leading-relaxed italic mb-8">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                    {t.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{t.name}</h4>
                    <p className="text-primary/40 text-sm uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section 
        id="contact" 
        ref={contactReveal.ref}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`grid md:grid-cols-2 gap-16 items-start transition-all duration-1000 ${
            contactReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary leading-tight mb-6">
                Ready to Order Your Dream Cake?
              </h2>
              <p className="text-primary/60 text-lg mb-12">
                Get in touch with us to discuss your requirements. Whether it's a simple birthday or a grand event, we're here to help.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <Phone />, title: "WhatsApp", val: BRAND.contact.whatsapp },
                  { icon: <Mail />, title: "Email", val: BRAND.contact.email },
                  { icon: <MapPin />, title: "Address", val: BRAND.contact.address }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary/40 font-bold">{item.title}</p>
                      <p className="text-lg font-bold text-primary">{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary p-8 md:p-12 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              {formStatus === 'success' ? (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <Send size={40} />
                  </div>
                  <h3 className="text-3xl font-heading font-bold text-primary">Message Sent!</h3>
                  <p className="mt-4 text-primary/60">Thank you for reaching out. We'll get back to you shortly to discuss your cake.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-8 text-accent font-bold underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary/60 uppercase tracking-wider ml-1">Full Name</label>
                      <input required type="text" className="w-full bg-white border border-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="Ada Obi" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary/60 uppercase tracking-wider ml-1">Phone</label>
                      <input required type="tel" className="w-full bg-white border border-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="+234..." />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-wider ml-1">Email</label>
                    <input required type="email" className="w-full bg-white border border-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-wider ml-1">Message</label>
                    <textarea required rows={4} className="w-full bg-white border border-primary/10 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-accent outline-none transition-all" placeholder="Tell us about your event and cake idea..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white py-5 rounded-full font-bold text-lg hover:bg-accent transition-all shadow-lg flex items-center justify-center gap-3">
                    SEND INQUIRY <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-24 pb-12 px-6 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <a href="#home" className="flex items-center gap-3 mb-8">
                <span className="font-heading text-4xl font-black text-accent tracking-tighter">
                  DC
                </span>
                <span className="text-sm font-mono tracking-[0.2em] uppercase text-white/60">
                  {BRAND.name}
                </span>
              </a>
              <p className="text-white/60 text-lg max-w-sm mb-8 leading-relaxed">
                Making every occasion special with artisan cakes handcrafted with love in Lagos.
              </p>
              <div className="flex gap-4">
                <a 
                  href={`https://instagram.com/${BRAND.contact.instagram.replace('@', '')}`}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href={`mailto:${BRAND.contact.email}`}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-primary transition-all"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading text-xl font-bold mb-8 text-accent">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Gallery', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading text-xl font-bold mb-8 text-accent">Working Hours</h4>
              <ul className="space-y-4 text-white/60">
                <li>Mon - Fri: 9AM - 6PM</li>
                <li>Sat: 10AM - 4PM</li>
                <li>Sun: Pre-orders Only</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <p className="text-white/40 text-sm font-mono italic">
              Quality Wey Go Loud.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
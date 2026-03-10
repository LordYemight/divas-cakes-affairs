'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ArrowRight, 
  Cake, 
  Star, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Truck,
  Quote,
  ImageOff,
  ChevronRight
} from 'lucide-react';

// --- Types ---
interface Product {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  name: string;
  text: string;
  role: string;
}

interface Stat {
  number: string;
  label: string;
  icon: string;
}

// --- Components ---

const SafeImage = ({ src, alt, fill, width, height, className, priority }: any) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/10 ${className}`}>
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
    tagline: "Crafting Edible Masterpieces for Your Special Moments.",
    description: "Diva's Cakes Affairs is Lagos' premier custom cake studio, specializing in bespoke wedding, birthday, and novelty cakes that are as stunning to look at as they are delicious to eat.",
    industry: "food",
    region: "nigeria",
    currency: "₦"
  };

  const images = {
    hero: "https://picsum.photos/seed/food0/1200/800",
    about: "https://picsum.photos/seed/food1/800/1000",
    products: [
      "https://picsum.photos/seed/food2/800/600",
      "https://picsum.photos/seed/food3/800/600",
      "https://picsum.photos/seed/food4/800/600",
      "https://picsum.photos/seed/food5/800/600"
    ],
    gallery: [
      "https://picsum.photos/seed/food6/800/800",
      "https://picsum.photos/seed/food7/800/800",
      "https://picsum.photos/seed/food8/800/800"
    ]
  };

  const products = [
    { name: "The Royal Tier Wedding Cake", description: "A majestic three-tiered vanilla bean cake with buttercream roses, perfect for a grand celebration.", price: "₦75,000", image_url: images.products[0] },
    { name: "Lagos Sunset Birthday Cake", description: "Vibrant ombre red velvet cake with gold leaf accents, serves 15-20.", price: "₦22,500", image_url: images.products[1] },
    { name: "Luxury Chocolate Truffle Box", description: "Box of 12 rich, decadent dark chocolate truffles infused with espresso.", price: "₦8,500", image_url: images.products[2] },
    { name: "Kid's Novelty Character Cake", description: "Custom sculpted cake featuring your child's favorite character, limited to 8-inch round base.", price: "₦18,000", image_url: images.products[3] }
  ];

  const features = [
    { title: "Bespoke Design Consultations", description: "We work closely with you to bring your unique cake vision to life, from mood board to final creation.", icon: "Sparkles" },
    { title: "Premium Local Ingredients", description: "We source the finest Nigerian butter, fresh eggs, and high-grade cocoa for unparalleled taste.", icon: "CheckCircle2" },
    { title: "Sharp Delivery Across Lagos", description: "Reliable and temperature-controlled delivery service ensuring your cake arrives safely and perfectly presented.", icon: "Truck" }
  ];

  const stats = [
    { number: "500+", label: "Cakes Delivered", icon: "Cake" },
    { number: "4.9/5", label: "Average Rating", icon: "Star" },
    { number: "5+", label: "Years Experience", icon: "Calendar" }
  ];

  const testimonials = [
    { name: "Tunde O.", text: "The wedding cake was breathtaking! It tasted even better than it looked. Truly professional service.", role: "Wedding Client" },
    { name: "Funke M.", text: "Ordered a last-minute birthday cake and the team delivered perfection. Highly recommend for quality and service.", role: "Birthday Client" }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles />;
      case 'CheckCircle2': return <CheckCircle2 />;
      case 'Truck': return <Truck />;
      case 'Cake': return <Cake />;
      case 'Star': return <Star />;
      case 'Calendar': return <Calendar />;
      default: return <Cake />;
    }
  };

  const revealHero = useScrollReveal();
  const revealFeatures = useScrollReveal();
  const revealProducts = useScrollReveal();
  const revealAbout = useScrollReveal();
  const revealTestimonials = useScrollReveal();
  const revealContact = useScrollReveal();

  return (
    <main id="home" className="relative">
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="font-heading text-3xl font-black text-secondary tracking-tighter">
              DC
            </span>
            <span className="text-secondary/80 text-xs font-mono tracking-[0.2em] uppercase hidden sm:block">
              {brand.name}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Gallery', 'About', 'Contact'].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="text-secondary/80 hover:text-secondary font-medium transition-colors"
              >
                {link}
              </a>
            ))}
            <a 
              href="#contact" 
              className="bg-accent text-white px-6 py-2.5 rounded-full font-bold hover:brightness-110 transition-all"
            >
              Order Now
            </a>
          </div>

          <button className="md:hidden text-secondary" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[75%] max-w-sm bg-primary p-8 shadow-2xl flex flex-col">
            <button className="self-end text-secondary mb-12" onClick={() => setMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8">
              {['Home', 'Gallery', 'About', 'Contact'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  className="text-2xl font-heading font-bold text-secondary"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-accent text-white px-8 py-4 rounded-full font-bold text-center mt-4"
                onClick={() => setMenuOpen(false)}
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Split Layout */}
      <section 
        ref={revealHero.ref}
        className="min-h-screen grid lg:grid-cols-2 items-center bg-primary overflow-hidden"
      >
        <div className={`px-8 md:px-16 py-32 transition-all duration-1000 ${
          revealHero.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
        }`}>
          <h1 className="font-heading text-5xl md:text-8xl font-black text-secondary mt-4 leading-[1.1]">
            Your Dream Cake <br/> Starts Here.
          </h1>
          <p className="text-secondary/70 mt-8 text-xl max-w-md leading-relaxed">
            Artisan cakes handcrafted for unforgettable moments in Lagos. See our gallery and place your order today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <a href="#products" className="bg-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:brightness-110 hover:scale-105 transition-all text-center">
              View Our Gallery
            </a>
            <a href="#about" className="border-2 border-secondary/30 text-secondary px-10 py-4 rounded-full font-bold text-lg hover:bg-secondary hover:text-primary transition-all text-center">
              Our Story
            </a>
          </div>
        </div>
        <div className="relative h-full min-h-[60vh] lg:min-h-screen">
          <SafeImage
            src={images.hero}
            alt={brand.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent lg:from-primary lg:via-transparent" />
        </div>
      </section>

      {/* Features - Grid */}
      <section 
        id="features"
        ref={revealFeatures.ref}
        className="py-24 px-6 bg-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${
            revealFeatures.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-primary">Why Choose Diva's?</h2>
            <p className="text-primary/60 mt-4 text-lg">The difference is in the details, the flavor, and the dedication.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                style={{ transitionDelay: `${i * 150}ms` }}
                className={`p-10 rounded-3xl bg-white border border-primary/5 hover:shadow-xl transition-all duration-500 group ${
                  revealFeatures.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <div className="text-accent group-hover:text-white transition-colors">
                    {getIcon(feature.icon)}
                  </div>
                </div>
                <h3 className="font-heading font-bold text-2xl text-primary">{feature.title}</h3>
                <p className="text-primary/70 mt-4 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - Grid */}
      <section 
        id="products"
        ref={revealProducts.ref}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 transition-all duration-1000 ${
            revealProducts.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-primary">Our Signature Creations</h2>
              <p className="text-primary/60 mt-4 text-lg">Explore our most requested designs and flavors.</p>
            </div>
            <div className="h-px flex-1 bg-primary/10 hidden md:block mx-8 mb-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <div 
                key={i} 
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`group relative overflow-hidden rounded-3xl bg-secondary transition-all duration-500 ${
                  revealProducts.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <SafeImage
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-primary group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-primary/60 mt-2 text-sm line-clamp-2 h-10">{product.description}</p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-accent font-bold text-xl">{product.price}</span>
                    <a href="#contact" className="w-10 h-10 rounded-full bg-primary text-secondary flex items-center justify-center hover:bg-accent transition-colors">
                      <ChevronRight size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-accent py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-white/50 mb-2">{getIcon(stat.icon)}</div>
              <p className="text-4xl md:text-5xl font-black text-white">{stat.number}</p>
              <p className="text-white/70 text-sm mt-1 font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section 
        id="about"
        ref={revealAbout.ref}
        className="py-24 px-6 bg-secondary overflow-hidden"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className={`relative transition-all duration-1000 ${
            revealAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'
          }`}>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl z-10">
              <SafeImage
                src={images.about}
                alt="Baking"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-accent/20 rounded-3xl -z-10" />
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
          </div>
          
          <div className={`transition-all duration-1000 delay-200 ${
            revealAbout.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
          }`}>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-primary leading-tight">
              Our Passion for Pastry
            </h2>
            <div className="w-20 h-1.5 bg-accent mt-6 mb-8" />
            <p className="text-primary/70 text-lg leading-relaxed mb-8">
              Diva's Cakes Affairs was founded in 2018 with a singular mission: to elevate the standard of celebration cakes in Lagos. We combine classic European techniques with rich local flavors to create true edible art.
            </p>
            <p className="text-primary/70 text-lg leading-relaxed mb-10">
              Every creation is handled with meticulous care, from the initial sketch to the final sprinkle of gold leaf. We believe that a cake shouldn't just be the centerpiece of a table, but the highlight of a memory.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-primary">Custom Designs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-primary">Fast Response</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-primary">Fresh Ingredients</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-accent" size={20} />
                <span className="font-bold text-primary">Nationwide Craft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        id="testimonials"
        ref={revealTestimonials.ref}
        className="py-24 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            revealTestimonials.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="font-heading text-4xl md:text-5xl font-black text-primary">What Our Clients Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                className={`bg-secondary p-10 rounded-3xl border border-primary/5 relative group transition-all duration-1000 ${
                  revealTestimonials.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <Quote size={60} className="absolute top-6 right-6 text-primary/5 group-hover:text-accent/10 transition-colors duration-500" />
                <div className="flex text-accent mb-6 gap-1">
                  {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={16} />)}
                </div>
                <p className="text-primary/80 text-xl leading-relaxed italic mb-8 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary font-heading">{t.name}</h4>
                    <p className="text-primary/50 text-sm uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact"
        ref={revealContact.ref}
        className="py-24 px-6 bg-primary"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className={`transition-all duration-1000 ${
              revealContact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="font-heading text-4xl md:text-6xl font-black text-secondary leading-tight">
                Ready to Order Your Masterpiece?
              </h2>
              <p className="text-secondary/60 mt-6 text-xl leading-relaxed">
                Contact us today for custom quotes, tasting appointments, or to discuss your dream design.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-6 text-secondary/80">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-secondary/40 font-bold">Call / WhatsApp</p>
                    <p className="text-xl font-bold">{brand.region === 'nigeria' ? '+234 801 234 5678' : '+1 234 567 890'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-secondary/80">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-secondary/40 font-bold">Email Us</p>
                    <p className="text-xl font-bold">orders@divascakesaffairs.ng</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-secondary/80">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-accent">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-widest text-secondary/40 font-bold">Visit Studio</p>
                    <p className="text-xl font-bold">Lagos Island, Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl transition-all duration-1000 delay-300 ${
              revealContact.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {formSubmitted ? (
                <div className="text-center py-16 animate-scaleIn">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="font-heading text-3xl font-black text-primary mb-4">Message Sent!</h3>
                  <p className="text-primary/60 mb-8">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="text-accent font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary/60 uppercase tracking-wider">Full Name</label>
                      <input required type="text" className="w-full bg-secondary border-none rounded-xl px-4 py-4 text-primary focus:ring-2 focus:ring-accent transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-primary/60 uppercase tracking-wider">Email Address</label>
                      <input required type="email" className="w-full bg-secondary border-none rounded-xl px-4 py-4 text-primary focus:ring-2 focus:ring-accent transition-all" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-wider">Event Date</label>
                    <input type="date" className="w-full bg-secondary border-none rounded-xl px-4 py-4 text-primary focus:ring-2 focus:ring-accent transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/60 uppercase tracking-wider">Cake Details</label>
                    <textarea required rows={4} className="w-full bg-secondary border-none rounded-xl px-4 py-4 text-primary focus:ring-2 focus:ring-accent transition-all" placeholder="Tell us about your event and cake vision..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent text-white py-5 rounded-xl font-bold text-lg hover:brightness-110 shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-3">
                    Submit Inquiry <ArrowRight size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-secondary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <a href="#home" className="flex items-center gap-3 mb-8">
                <span className="font-heading text-3xl font-black text-secondary tracking-tighter">
                  DC
                </span>
                <span className="text-secondary/80 text-xs font-mono tracking-[0.2em] uppercase">
                  {brand.name}
                </span>
              </a>
              <p className="text-secondary/50 leading-relaxed mb-8 max-w-xs">
                Handcrafting premium custom cakes for weddings, birthdays, and special corporate events across Lagos.
              </p>
              <div className="flex gap-4">
                <a href="https://instagram.com/divascake_affairs" target="_blank" className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary/60 hover:text-accent hover:bg-secondary/10 transition-all">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-secondary font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Gallery', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-secondary/50 hover:text-secondary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-secondary font-bold mb-8 uppercase tracking-widest text-sm">Products</h4>
              <ul className="space-y-4">
                {['Wedding Cakes', 'Birthday Cakes', 'Novelty Cakes', 'Cupcakes', 'Truffles'].map((item) => (
                  <li key={item}>
                    <a href="#products" className="text-secondary/50 hover:text-secondary transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-secondary font-bold mb-8 uppercase tracking-widest text-sm">Contact</h4>
              <ul className="space-y-4 text-secondary/50">
                <li className="flex gap-3">
                  <MapPin size={18} className="text-accent shrink-0" />
                  <span>Lagos Island, Nigeria</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="text-accent shrink-0" />
                  <span>+234 801 234 5678</span>
                </li>
                <li className="flex gap-3">
                  <Mail size={18} className="text-accent shrink-0" />
                  <span>orders@divascakesaffairs.ng</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-secondary/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-secondary/30 text-sm">
              © {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <div className="flex gap-8 text-secondary/30 text-sm">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
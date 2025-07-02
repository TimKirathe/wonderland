"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import JourneyModal from "@/components/JourneyModal";
import ContactForm from "@/components/ContactForm";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [marketingPhotos, setMarketingPhotos] = useState<string[]>([]);

  useEffect(() => {
    // Fetch marketing photos dynamically
    fetch('/api/marketing-photos')
      .then(res => res.json())
      .then(data => setMarketingPhotos(data.photos))
      .catch(error => {
        console.error('Error fetching marketing photos:', error);
        // Fallback to a default set if API fails
        setMarketingPhotos([
          "/marketing-photos/marketing-photo-1.jpg",
          "/marketing-photos/marketing-photo-2.jpg",
          "/marketing-photos/marketing-photo-3.jpg",
        ]);
      });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2 flex-shrink min-w-0">
              <Image
                src="/wonderland-logo.svg"
                alt="Wonderland Logo"
                width={32}
                height={32}
                className="h-20 w-16 flex-shrink-0"
              />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient truncate">
                Wonderland Early Years & Prep School
              </h1>
            </div>
            <div className="hidden lg:flex space-x-6">
              <Link
                href="#about"
                className="text-foreground hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="#programs"
                className="text-foreground hover:text-primary transition-colors"
              >
                Programs
              </Link>
              <Link
                href="#admissions"
                className="text-foreground hover:text-primary transition-colors"
              >
                Admissions
              </Link>
              <Link
                href="#contact"
                className="text-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
            <button className="bg-primary text-white px-3 sm:px-4 py-2 rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap flex-shrink-0 text-sm sm:text-base">
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <HeroCarousel images={marketingPhotos.length > 0 ? marketingPhotos : ["/wonderland-logo.svg"]}>
          <div className="container mx-auto px-4 min-h-screen flex items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-6">
                <span className="text-lg">🏆</span>
                <span className="text-sm font-semibold">Nurturing Young Minds Since 1976</span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                <span className="block">We learn,</span>
                <span className="block">We care,</span>
                <span className="block">We play</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-xl">
                Welcome to Wonderland Early Years & Prep School, where every
                child&apos;s journey begins with wonder, creativity, and endless
                possibilities.
              </p>
              <div className="flex">
                <button
                  onClick={() => setIsJourneyModalOpen(true)}
                  className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </HeroCarousel>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Welcome to Wonderland</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              At Wonderland Early Years & Prep School, we believe every child is
              unique and special. Our nurturing environment fosters creativity,
              curiosity, and confidence in young learners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">❤️</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">
                Caring Environment
              </h3>
              <p className="text-foreground/70">
                Our dedicated teachers create a warm, supportive atmosphere
                where children feel safe and loved.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎓</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Quality Education</h3>
              <p className="text-foreground/70">
                Age-appropriate curriculum designed to spark curiosity and
                develop essential skills.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-accent/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Individual Growth</h3>
              <p className="text-foreground/70">
                Personalized attention to help each child reach their full
                potential at their own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">🧸</div>
              <h3 className="text-2xl font-semibold mb-3">Playgroup</h3>
              <p className="text-foreground/70 mb-4">Ages 2-4 years</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Sensory play
                  activities
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Basic motor
                  skills
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Social
                  interaction
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Language
                  development
                </li>
              </ul>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-semibold mb-3">Pre-Primary 1</h3>
              <p className="text-foreground/70 mb-4">Ages 4-5 years</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Creative arts &
                  crafts
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Early literacy
                  skills
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Number concepts
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Music &
                  movement
                </li>
              </ul>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">🎒</div>
              <h3 className="text-2xl font-semibold mb-3">Pre-Primary 2</h3>
              <p className="text-foreground/70 mb-4">Ages 5-6 years</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Reading &
                  writing
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Mathematics
                  basics
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Science
                  exploration
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> School
                  readiness
                </li>
              </ul>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold mb-3">Grade 1</h3>
              <p className="text-foreground/70 mb-4">Ages 6-7 years</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Foundational
                  literacy
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Basic
                  arithmetic
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Environmental
                  studies
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Creative
                  expression
                </li>
              </ul>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">✏️</div>
              <h3 className="text-2xl font-semibold mb-3">Grade 2</h3>
              <p className="text-foreground/70 mb-4">Ages 7-8 years</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Reading
                  comprehension
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Problem solving
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Social studies
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Physical
                  education
                </li>
              </ul>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-semibold mb-3">Grade 3</h3>
              <p className="text-foreground/70 mb-4">Ages 8-9 years</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Advanced
                  reading
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Multiplication
                  & division
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Science
                  projects
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Critical
                  thinking
                </li>
              </ul>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold mb-3">Grade 4</h3>
              <p className="text-foreground/70 mb-4">Ages 9-10 years</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Independent
                  learning
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Research skills
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Technology
                  integration
                </li>
                <li className="flex items-center">
                  <span className="text-secondary mr-2">✓</span> Leadership
                  development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Wonderland?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Column */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden card-shadow">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                >
                  <source
                    src="/wonderland-school-video-1.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Features Column */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <span className="text-2xl">👩‍🏫</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Qualified Teachers
                  </h3>
                  <p className="text-foreground/70">
                    Experienced educators passionate about early childhood
                    development.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                  <span className="text-2xl">🏫</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Safe Facilities
                  </h3>
                  <p className="text-foreground/70">
                    Child-friendly spaces designed for exploration and learning.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-full flex-shrink-0">
                  <span className="text-2xl">🍎</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Healthy Meals</h3>
                  <p className="text-foreground/70">
                    Nutritious snacks and meals prepared with care.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Parent Partnership
                  </h3>
                  <p className="text-foreground/70">
                    Regular communication and involvement opportunities.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Diverse Community
                  </h3>
                  <p className="text-foreground/70">
                    Celebrating different cultures and backgrounds.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-full flex-shrink-0">
                  <span className="text-2xl">🎪</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Extra Activities
                  </h3>
                  <p className="text-foreground/70">
                    Field trips, celebrations, and special events throughout the
                    year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Parents Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card-bg rounded-3xl p-8 card-shadow">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-foreground/70 mb-4">
                &quot;My daughter loves going to Wonderland every day. The
                teachers are amazing and she&apos;s learned so much!&quot;
              </p>
              <p className="font-semibold">- Sarah M.</p>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-foreground/70 mb-4">
                &quot;The perfect balance of learning and play. My son has grown
                so much in confidence since joining.&quot;
              </p>
              <p className="font-semibold">- David L.</p>
            </div>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="text-foreground/70 mb-4">
                &quot;Wonderland truly lives up to its name. It&apos;s a magical
                place where children thrive and grow.&quot;
              </p>
              <p className="font-semibold">- Emma K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Get In Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Visit Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-foreground/70">
                        Ngei Estate Phase 1, Kalobot road, Langata, Nairobi,
                        Kenya
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-foreground/70">
                        <a href="tel:+254738626219">+254 738 626 219</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-foreground/70">
                        <a href="mailto:info@wonderlandkindergarten.sc.ke">
                          info@wonderlandkindergarten.sc.ke
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">🕐</span>
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-foreground/70">
                        Monday - Friday: 7:30 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Schedule a Visit
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2 xl:col-span-1">
              <div className="flex items-start space-x-2 mb-4">
                <Image
                  src="/wonderland-logo.svg"
                  alt="Wonderland Logo"
                  width={48}
                  height={48}
                  className="h-20 w-16 flex-shrink-0"
                />
                <div className="pt-1">
                  <h3 className="text-xl font-bold">Wonderland</h3>
                  <p className="text-white/70 mt-1">We learn, We care, We play</p>
                </div>
              </div>
              <p className="text-white/60 text-sm max-w-xs">
                Nurturing young minds with love, creativity, and endless possibilities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link
                    href="#about"
                    className="hover:text-white transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#programs"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#admissions"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link
                    href="#programs"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Playgroup
                  </Link>
                </li>
                <li>
                  <Link
                    href="#programs"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Pre-Primary 1 & 2
                  </Link>
                </li>
                <li>
                  <Link
                    href="#programs"
                    className="hover:text-white transition-colors text-sm"
                  >
                    Grade 1-4
                  </Link>
                </li>
                <li>
                  <Link
                    href="#programs"
                    className="hover:text-white transition-colors text-sm"
                  >
                    All Programs
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2 xl:col-span-1">
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex items-center space-x-4 mb-4">
                <a
                  href={
                    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                    "https://www.instagram.com/wonderlandkindergartenke/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Image
                    src="/social-media/instagram.svg"
                    alt="Instagram"
                    width={20}
                    height={20}
                    className="w-5 h-5 brightness-0 invert"
                  />
                </a>
                <span className="text-white/70 text-sm">@wonderlandkindergartenke</span>
              </div>
              <p className="text-white/60 text-sm">
                Follow us for updates, events, and moments from our wonderful community.
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
            <p className="text-sm">
              &copy; 2025 Wonderland Early Years & Prep School. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Journey Modal */}
      <JourneyModal
        isOpen={isJourneyModalOpen}
        onClose={() => setIsJourneyModalOpen(false)}
      />
    </div>
  );
}

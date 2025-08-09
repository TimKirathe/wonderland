"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DynamicJourneyModal from "@/components/DynamicJourneyModal";
import DynamicContactForm from "@/components/DynamicContactForm";
import HeroCarousel from "@/components/HeroCarousel";
import NoSSR from "@/components/NoSSR";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

interface Review {
  id: string;
  text: string;
  parent_name: string;
  date: string;
}

interface HomeClientProps {
  initialPhotos: string[];
  initialReviews: Review[];
}

export default function HomeClient({ initialPhotos, initialReviews }: HomeClientProps) {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavbarVisible(true);
      }
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavbarVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      {/* Navigation */}
      <nav
        className={`bg-background/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center space-x-2 flex-shrink min-w-0">
              <Image
                src="/wonderland-logo.svg"
                alt="Wonderland Logo"
                width={80}
                height={96}
                className="h-16 w-12 sm:h-20 sm:w-16 md:h-24 md:w-20 flex-shrink-0"
                priority
              />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient truncate font-primary">
                Wonderland Early Years & Prep School
              </h1>
            </div>
            <div className="hidden lg:flex space-x-6">
              <Link
                href="#about"
                className="text-foreground hover:text-primary transition-colors whitespace-nowrap font-secondary"
              >
                About Us
              </Link>
              <Link
                href="#programs"
                className="text-foreground hover:text-primary transition-colors whitespace-nowrap font-secondary"
              >
                What We Offer
              </Link>
              <Link
                href="#contact"
                className="text-foreground hover:text-primary transition-colors whitespace-nowrap font-secondary"
              >
                Contact Us
              </Link>
            </div>
            <button
              onClick={() => setIsJourneyModalOpen(true)}
              className="bg-primary text-white px-3 sm:px-4 py-2 rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap flex-shrink-0 text-sm sm:text-base font-primary"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[calc(100vh-88px)] overflow-hidden">
        <HeroCarousel
          images={initialPhotos}
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full flex items-end pb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8">
                <span className="text-lg">🏆</span>
                <span className="text-sm font-semibold font-secondary">
                  Nurturing Young Minds Since 1976
                </span>
              </div>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-xl leading-relaxed">
                At Wonderland Early Years & Prep School, we give individual
                attention to every student, ensuring that your child feels safe
                and loved in an atmosphere of learning, growth and adventure.
              </p>
              <div className="flex">
                <Link
                  href="#contact"
                  className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg font-primary"
                >
                  Make an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </HeroCarousel>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animation="floatUp" delay={0}>
            <h2 className="text-4xl font-bold text-center mb-12 font-primary">
              What Parents Say
            </h2>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="driftIn" delay={300}>
            <ReviewsCarousel
              reviews={initialReviews}
              loading={false}
              error={false}
            />
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimationWrapper animation="spiralIn" delay={0}>
              <h2 className="text-4xl font-bold text-center mb-12 font-primary">
                Get In Touch
              </h2>
            </ScrollAnimationWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <ScrollAnimationWrapper animation="slideUp" delay={200}>
                  <h3 className="text-2xl font-semibold mb-6 font-primary">
                    Visit Us
                  </h3>
                </ScrollAnimationWrapper>
                <div className="space-y-4">
                  <ScrollAnimationWrapper animation="slideInBounce" delay={400}>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-semibold font-secondary">Address</p>
                        <p className="text-foreground/70 font-secondary">
                          Kalobot road, Langata, Nairobi, Kenya
                        </p>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                  <ScrollAnimationWrapper animation="slideInBounce" delay={600}>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">📞</span>
                      <div>
                        <p className="font-semibold font-secondary">Phone</p>
                        <p className="text-foreground/70 font-secondary">
                          <a href="tel:+254738626219">+254 738 626 219</a>
                        </p>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                  <ScrollAnimationWrapper animation="slideInBounce" delay={800}>
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">✉️</span>
                      <div>
                        <p className="font-semibold font-secondary">Email</p>
                        <p className="text-foreground/70 font-secondary">
                          <a href="mailto:info@wonderlandke.com">
                            info@wonderlandke.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                  <ScrollAnimationWrapper
                    animation="slideInBounce"
                    delay={1000}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">🕐</span>
                      <div>
                        <p className="font-semibold font-secondary">Hours</p>
                        <p className="text-foreground/70 font-secondary">
                          Monday - Friday: 8:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </ScrollAnimationWrapper>
                </div>
              </div>
              <div>
                <ScrollAnimationWrapper animation="fadeSlideUp" delay={300}>
                  <h3 className="text-2xl font-semibold mb-6 font-primary">
                    Make an Enquiry
                  </h3>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper animation="expandUp" delay={600}>
                  <NoSSR>
                    <DynamicContactForm />
                  </NoSSR>
                </ScrollAnimationWrapper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12">
            <ScrollAnimationWrapper animation="revealUp" delay={0}>
              <div className="md:col-span-2 xl:col-span-1">
                <div className="flex items-start space-x-2 mb-4">
                  <Image
                    src="/wonderland-logo.svg"
                    alt="Wonderland Logo"
                    width={64}
                    height={80}
                    className="h-20 w-16 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="pt-1">
                    <h3 className="text-xl font-bold font-primary">
                      Wonderland
                    </h3>
                    <p className="text-white/70 mt-1 font-secondary">
                      We learn, We care, We play
                    </p>
                  </div>
                </div>
                <p className="text-white/60 text-sm max-w-xs font-secondary">
                  Nurturing young minds with love, creativity, and endless
                  possibilities.
                </p>
              </div>
            </ScrollAnimationWrapper>
            <div>
              <ScrollAnimationWrapper animation="staggerFadeIn" delay={200}>
                <h4 className="font-semibold mb-4 font-primary">Quick Links</h4>
              </ScrollAnimationWrapper>
              <ul className="space-y-2 text-white/70">
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={300}>
                  <li>
                    <Link
                      href="#about"
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      About Us
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={400}>
                  <li>
                    <Link
                      href="#programs"
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      What We Offer
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={500}>
                  <li>
                    <Link
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        setIsJourneyModalOpen(true);
                      }}
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      Enroll Now
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={600}>
                  <li>
                    <Link
                      href="#contact"
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      Contact
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
              </ul>
            </div>
            <div>
              <ScrollAnimationWrapper animation="staggerFadeIn" delay={300}>
                <h4 className="font-semibold mb-4 font-primary">
                  What We Offer
                </h4>
              </ScrollAnimationWrapper>
              <ul className="space-y-2 text-white/70">
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={400}>
                  <li>
                    <Link
                      href="#programs"
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      Playgroup
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={500}>
                  <li>
                    <Link
                      href="#programs"
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      Pre-Primary 1 & 2
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={600}>
                  <li>
                    <Link
                      href="#programs"
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      Grade 1-4
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
                <ScrollAnimationWrapper animation="staggerFadeIn" delay={700}>
                  <li>
                    <Link
                      href="#programs"
                      className="hover:text-white transition-colors text-sm font-secondary"
                    >
                      All Stages
                    </Link>
                  </li>
                </ScrollAnimationWrapper>
              </ul>
            </div>
            <ScrollAnimationWrapper animation="slideLeft" delay={400}>
              <div className="md:col-span-2 xl:col-span-1">
                <h4 className="font-semibold mb-4 font-primary">
                  Connect With Us
                </h4>
                <div className="flex items-center space-x-4 mb-4">
                  <a
                    href="https://www.instagram.com/wonderlandkindergartenke/"
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
                      loading="lazy"
                    />
                  </a>
                  <span className="text-white/70 text-sm font-secondary">
                    @wonderlandkindergartenke
                  </span>
                </div>
                <p className="text-white/60 text-sm font-secondary">
                  Follow us for updates, events, and moments from our wonderful
                  community.
                </p>
              </div>
            </ScrollAnimationWrapper>
          </div>
          <ScrollAnimationWrapper animation="fadeIn" delay={600}>
            <div className="border-t border-white/20 mt-12 pt-8 text-center text-white/70">
              <p className="text-sm font-secondary">
                &copy; 2025 Wonderland Early Years & Prep School. All rights
                reserved.
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </footer>

      {/* Journey Modal */}
      <DynamicJourneyModal
        isOpen={isJourneyModalOpen}
        onClose={() => setIsJourneyModalOpen(false)}
      />
    </div>
  );
}
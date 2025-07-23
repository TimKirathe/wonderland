"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import JourneyModal from "@/components/JourneyModal";
import ContactForm from "@/components/ContactForm";
import HeroCarousel from "@/components/HeroCarousel";
import NoSSR from "@/components/NoSSR";
import VisionMission from "@/components/VisionMission";
import EducationPhilosophy from "@/components/EducationPhilosophy";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

interface Review {
  id: string;
  text: string;
  parent_name: string;
  date: string;
}

export default function Home() {
  const [isJourneyModalOpen, setIsJourneyModalOpen] = useState(false);
  const [marketingPhotos, setMarketingPhotos] = useState<string[]>([]);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(false);

  useEffect(() => {
    // Fetch marketing photos dynamically
    fetch("/api/marketing-photos")
      .then((res) => res.json())
      .then((data) => setMarketingPhotos(data.photos))
      .catch((error) => {
        console.error("Error fetching marketing photos:", error);
        // Fallback to a default set if API fails
        setMarketingPhotos([
          "/marketing-photos/marketing-photo-1.jpg",
          "/marketing-photos/marketing-photo-2.jpg",
          "/marketing-photos/marketing-photo-3.jpg",
        ]);
      });
  }, []);

  useEffect(() => {
    // Fetch reviews
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) {
          setReviews(data.reviews);
        }
        setReviewsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setReviewsError(true);
        setReviewsLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavbarVisible(true);
      }
      // Hide navbar when scrolling down (with a threshold to prevent jitter)
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
                width={32}
                height={32}
                className="h-16 w-12 sm:h-20 sm:w-16 md:h-24 md:w-20 flex-shrink-0"
              />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gradient truncate">
                Wonderland Early Years & Prep School
              </h1>
            </div>
            <div className="hidden lg:flex space-x-6">
              <Link
                href="#about"
                className="text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                About Us
              </Link>
              <Link
                href="#programs"
                className="text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                What We Offer
              </Link>
              <Link
                href="#contact"
                className="text-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
            <button
              onClick={() => setIsJourneyModalOpen(true)}
              className="bg-primary text-white px-3 sm:px-4 py-2 rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[calc(100vh-88px)] overflow-hidden">
        <HeroCarousel
          images={
            marketingPhotos.length > 0
              ? marketingPhotos
              : ["/wonderland-logo.svg"]
          }
        >
          <div className="container mx-auto px-4 md:px-6 lg:px-8 h-full flex items-end pb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full mb-8">
                <span className="text-lg">🏆</span>
                <span className="text-sm font-semibold">
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
                  className="inline-block bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Make an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </HeroCarousel>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <ScrollAnimationWrapper animation="fadeUp" delay={0}>
              <h2 className="text-4xl font-bold mb-4">Welcome to Wonderland</h2>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animation="fadeUp" delay={200}>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                At Wonderland Early Years & Prep School, we believe every child is
                unique and special. Our environment fosters creativity, curiosity,
                and confidence in young learners.
              </p>
            </ScrollAnimationWrapper>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimationWrapper animation="fadeUp" delay={400}>
              <div className="text-center">
                <ScrollAnimationWrapper animation="bounceIn" delay={600} className="inline-block">
                  <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 hover:scale-110">
                    <span className="text-4xl">❤️</span>
                  </div>
                </ScrollAnimationWrapper>
                <h3 className="text-2xl font-semibold mb-2">
                  Caring Environment
                </h3>
                <p className="text-foreground/70">
                  Excellence in Christian education with love and Biblical values.
                </p>
              </div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animation="fadeUp" delay={600}>
              <div className="text-center">
                <ScrollAnimationWrapper animation="bounceIn" delay={800} className="inline-block">
                  <div className="bg-secondary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 hover:scale-110">
                    <span className="text-4xl">🎓</span>
                  </div>
                </ScrollAnimationWrapper>
                <h3 className="text-2xl font-semibold mb-2">Quality Education</h3>
                <p className="text-foreground/70">
                  CBC-trained teachers inspiring productive young learners.
                </p>
              </div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper animation="fadeUp" delay={800}>
              <div className="text-center">
                <ScrollAnimationWrapper animation="bounceIn" delay={1000} className="inline-block">
                  <div className="bg-accent/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 hover:scale-110">
                    <span className="text-4xl">🎯</span>
                  </div>
                </ScrollAnimationWrapper>
                <h3 className="text-2xl font-semibold mb-2">Co-Curricluum</h3>
                <p className="text-foreground/70">
                  Abacus, Swimming, Football, Skating, Ballet, and more exciting activities!
                </p>
              </div>
            </ScrollAnimationWrapper>
          </div>
          <ScrollAnimationWrapper animation="fadeUp" delay={1000}>
            <VisionMission />
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Education Philosophy Section */}
      <EducationPhilosophy />

      {/* Programs Section */}
      <section
        id="programs"
        className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Playgroup Card */}
            <div className="bg-card-bg rounded-3xl overflow-hidden card-shadow card-shadow-hover transition-all">
              <div className="relative h-48 mb-6">
                <Image
                  src="/programs-photos/playgroup-girl-coloring.jpg"
                  alt="Playgroup classroom with children engaged in activities"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-2xl font-semibold mb-3">Playgroup</h3>
                <p className="text-foreground/70 mb-4">Ages 2-4 years</p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Sensory play
                    activities
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Social
                    interaction
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Language
                    activities & development
                  </li>
                </ul>
              </div>
            </div>
            {/* Pre-Primary Programs Card */}
            <div className="bg-card-bg rounded-3xl overflow-hidden card-shadow card-shadow-hover transition-all">
              <div className="relative h-48 mb-6">
                <Image
                  src="/programs-photos/child-in-pp2-writing-blurred.png"
                  alt="Pre-Primary classroom with students learning"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-2xl font-semibold mb-3">
                  Pre-Primary 1 & 2
                </h3>
                <p className="text-foreground/70 mb-6">Ages 4-6 years</p>

                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Basic
                    mathematical concepts
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Early
                    literacy skills
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Psychomotor &
                    creative activities
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Environmental
                    awareness
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Religious
                    education
                  </li>
                </ul>
              </div>
            </div>
            {/* Grade 1-4 Card */}
            <div className="bg-card-bg rounded-3xl overflow-hidden card-shadow card-shadow-hover transition-all">
              <div className="relative h-48 mb-6">
                <Image
                  src="/programs-photos/child-in-grade1.jpg"
                  alt="Grade school classroom with students at desks"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="px-8 pb-8">
                <h3 className="text-2xl font-semibold mb-3">Grade 1-4</h3>
                <p className="text-foreground/70 mb-6">Ages 6-10 years</p>

                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Literacy &
                    Indigenous language comprehension
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Arts & Craft,
                    Music, and Physical Education
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Foundational
                    mathematics & critical thinking
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Hygiene &
                    Nutrition Awareness
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary mr-2">✓</span> Technology
                    integration & leadership skills
                  </li>
                </ul>
              </div>
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
          <ReviewsCarousel 
            reviews={reviews}
            loading={reviewsLoading}
            error={reviewsError}
          />
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
                        Kalobot road, Langata, Nairobi, Kenya
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
                        Monday - Friday: 8:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-6">Make an Enquiry</h3>
                <NoSSR>
                  <ContactForm />
                </NoSSR>
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
                  <p className="text-white/70 mt-1">
                    We learn, We care, We play
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm max-w-xs">
                Nurturing young minds with love, creativity, and endless
                possibilities.
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
                    What We Offer
                  </Link>
                </li>
                <li>
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setIsJourneyModalOpen(true);
                    }}
                    className="hover:text-white transition-colors text-sm"
                  >
                    Enroll Now
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
              <h4 className="font-semibold mb-4">What We Offer</h4>
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
                    All Stages
                  </Link>
                </li>
              </ul>
            </div>
            <div className="md:col-span-2 xl:col-span-1">
              <h4 className="font-semibold mb-4">Connect With Us</h4>
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
                  />
                </a>
                <span className="text-white/70 text-sm">
                  @wonderlandkindergartenke
                </span>
              </div>
              <p className="text-white/60 text-sm">
                Follow us for updates, events, and moments from our wonderful
                community.
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

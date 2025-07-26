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

      {/* Education Philosophy Section */}
      <EducationPhilosophy />

      {/* About Section */}
      <section id="about" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 max-w-6xl mx-auto">
            <div className="text-center lg:text-left">
              <ScrollAnimationWrapper animation="fadeUp" delay={0}>
                <h2 className="text-4xl font-bold mb-4 font-primary">
                  Who We Are
                </h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper animation="fadeUp" delay={200}>
                <p className="text-xl text-foreground/70">
                  Wonderland Early Years & Prep School is a private school based
                  in Nairobi, Kenya. We have a rich history of 45+ years in
                  operation, and a proven track record of providing an excellent
                  learning environment for young children.
                </p>
              </ScrollAnimationWrapper>
            </div>
            <ScrollAnimationWrapper animation="slideLeft" delay={400}>
              <div className="relative w-48 h-72 lg:w-64 lg:h-96 mx-auto rounded-3xl overflow-hidden">
                <Image
                  src="/student-smiling.jpg"
                  alt="Student Smiling"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimationWrapper>
          </div>
          <ScrollAnimationWrapper animation="fadeUp" delay={1000}>
            <VisionMission />
          </ScrollAnimationWrapper>
        </div>
      </section>

      {/* Programs Section */}
      <section
        id="programs"
        className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
      >
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animation="cascadeUp" delay={0}>
            <h2 className="text-4xl font-bold text-center mb-12 font-primary">
              What We Offer
            </h2>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Playgroup Card */}
            <ScrollAnimationWrapper animation="slideDownRight" delay={200}>
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
                  <h3 className="text-2xl font-semibold mb-3 font-primary">
                    Playgroup
                  </h3>
                  <p className="text-foreground/70 mb-4 font-secondary">
                    Ages 2-4 years
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Sensory
                      play activities
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Social
                      interaction
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Language
                      activities & development
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollAnimationWrapper>
            {/* Pre-Primary Programs Card */}
            <ScrollAnimationWrapper animation="slideDownRight" delay={500}>
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
                  <h3 className="text-2xl font-semibold mb-3 font-primary">
                    Pre-Primary 1 & 2
                  </h3>
                  <p className="text-foreground/70 mb-6 font-secondary">
                    Ages 4-6 years
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Basic
                      mathematical concepts
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Early
                      literacy skills
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Psychomotor
                      & creative activities
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span>{" "}
                      Environmental awareness
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Religious
                      education
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollAnimationWrapper>
            {/* Grade 1-4 Card */}
            <ScrollAnimationWrapper animation="slideDownRight" delay={800}>
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
                  <h3 className="text-2xl font-semibold mb-3 font-primary">
                    Grade 1-4
                  </h3>
                  <p className="text-foreground/70 mb-6 font-secondary">
                    Ages 6-10 years
                  </p>

                  <ul className="space-y-2">
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Literacy &
                      Indigenous language comprehension
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Arts &
                      Craft, Music, and Physical Education
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span>{" "}
                      Foundational mathematics & critical thinking
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Hygiene &
                      Nutrition Awareness
                    </li>
                    <li className="flex items-center font-secondary">
                      <span className="text-secondary mr-2">✓</span> Technology
                      integration & leadership skills
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <ScrollAnimationWrapper animation="zoomFade" delay={0}>
            <h2 className="text-4xl font-bold text-center mb-12 font-primary">
              Why Choose Wonderland?
            </h2>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Video Column */}
            <ScrollAnimationWrapper animation="slideRotateLeft" delay={200}>
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
            </ScrollAnimationWrapper>

            {/* Features Column */}
            <div className="space-y-6">
              <ScrollAnimationWrapper animation="slideLeft" delay={400}>
                <div className="flex items-start space-x-4">
                  <ScrollAnimationWrapper
                    animation="popIn"
                    delay={600}
                    className="inline-block"
                  >
                    <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                      <span className="text-2xl">👩‍🏫</span>
                    </div>
                  </ScrollAnimationWrapper>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-primary">
                      Qualified Teachers
                    </h3>
                    <p className="text-foreground/70 font-secondary">
                      Experienced educators passionate about early childhood
                      development.
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper animation="slideLeft" delay={700}>
                <div className="flex items-start space-x-4">
                  <ScrollAnimationWrapper
                    animation="popIn"
                    delay={900}
                    className="inline-block"
                  >
                    <div className="bg-secondary/10 p-3 rounded-full flex-shrink-0">
                      <span className="text-2xl">🏫</span>
                    </div>
                  </ScrollAnimationWrapper>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-primary">
                      Safe Facilities
                    </h3>
                    <p className="text-foreground/70 font-secondary">
                      Child-friendly spaces designed for exploration and
                      learning.
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper animation="slideLeft" delay={1000}>
                <div className="flex items-start space-x-4">
                  <ScrollAnimationWrapper
                    animation="popIn"
                    delay={1200}
                    className="inline-block"
                  >
                    <div className="bg-accent/10 p-3 rounded-full flex-shrink-0">
                      <span className="text-2xl">🍎</span>
                    </div>
                  </ScrollAnimationWrapper>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-primary">
                      Healthy Meals
                    </h3>
                    <p className="text-foreground/70 font-secondary">
                      Nutritious snacks and meals prepared with care.
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper animation="slideLeft" delay={1300}>
                <div className="flex items-start space-x-4">
                  <ScrollAnimationWrapper
                    animation="popIn"
                    delay={1500}
                    className="inline-block"
                  >
                    <div className="bg-primary/10 p-3 rounded-full flex-shrink-0">
                      <span className="text-2xl">👨‍👩‍👧‍👦</span>
                    </div>
                  </ScrollAnimationWrapper>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-primary">
                      Parent Partnership
                    </h3>
                    <p className="text-foreground/70 font-secondary">
                      Regular communication and involvement opportunities.
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper animation="slideLeft" delay={1600}>
                <div className="flex items-start space-x-4">
                  <ScrollAnimationWrapper
                    animation="popIn"
                    delay={1800}
                    className="inline-block"
                  >
                    <div className="bg-accent/10 p-3 rounded-full flex-shrink-0">
                      <span className="text-2xl">🎪</span>
                    </div>
                  </ScrollAnimationWrapper>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-primary">
                      Extra Activities
                    </h3>
                    <p className="text-foreground/70 font-secondary">
                      Field trips, celebrations, and special events throughout
                      the year.
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            </div>
          </div>
        </div>
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
              reviews={reviews}
              loading={reviewsLoading}
              error={reviewsError}
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
                          <a href="mailto:info@wonderlandkindergarten.sc.ke">
                            info@wonderlandkindergarten.sc.ke
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
                    <ContactForm />
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
                    width={48}
                    height={48}
                    className="h-20 w-16 flex-shrink-0"
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
      <JourneyModal
        isOpen={isJourneyModalOpen}
        onClose={() => setIsJourneyModalOpen(false)}
      />
    </div>
  );
}

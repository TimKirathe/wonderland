import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import HomeClient from "@/components/HomeClient";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import DynamicContactForm from "@/components/DynamicContactForm";
import NoSSR from "@/components/NoSSR";
import Link from "next/link";
import FooterEnrollButton from "@/components/FooterEnrollButton";

interface Review {
  id: string;
  text: string;
  parent_name: string;
  date: string;
}

// This enables ISR with a revalidation period of 3600 seconds (1 hour)
export const revalidate = 3600;

async function getMarketingPhotos() {
  const photosDirectory = path.join(
    process.cwd(),
    "public",
    "marketing-photos",
  );

  try {
    const files = fs.readdirSync(photosDirectory);

    const imageFiles = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || "0");
        const numB = parseInt(b.match(/\d+/)?.[0] || "0");
        return numA - numB;
      });

    return imageFiles.map((file) => `/marketing-photos/${file}`);
  } catch (error) {
    console.error("Error reading marketing photos directory:", error);
    return [
      "/marketing-photos/marketing-photo-1.jpg",
      "/marketing-photos/marketing-photo-2.jpg",
      "/marketing-photos/marketing-photo-3.jpg",
    ];
  }
}

async function getReviews(): Promise<Review[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .order("date", { ascending: false })
      .limit(9);

    if (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }

    return reviews || [];
  } catch (error) {
    console.error("Error in reviews fetch:", error);
    return [];
  }
}

export default async function Home() {
  // Fetch data at build/request time
  const [marketingPhotos, reviews] = await Promise.all([
    getMarketingPhotos(),
    getReviews(),
  ]);

  return (
    <>
      {/* Client-side navigation and hero */}
      <HomeClient initialPhotos={marketingPhotos} initialReviews={reviews} />

      <main id="main-content">
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
                    <ScrollAnimationWrapper
                      animation="slideInBounce"
                      delay={400}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">📍</span>
                        <div>
                          <p className="font-semibold font-secondary">
                            Address
                          </p>
                          <p className="text-foreground/70 font-secondary">
                            Kalobot road, Langata, Nairobi, Kenya
                          </p>
                        </div>
                      </div>
                    </ScrollAnimationWrapper>
                    <ScrollAnimationWrapper
                      animation="slideInBounce"
                      delay={600}
                    >
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
                    <ScrollAnimationWrapper
                      animation="slideInBounce"
                      delay={800}
                    >
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
                  <h4 className="font-semibold mb-4 font-primary">
                    Quick Links
                  </h4>
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
                      <a
                        href="#"
                        data-enroll-trigger
                        className="hover:text-white transition-colors text-sm font-secondary cursor-pointer"
                      >
                        Enroll Now
                      </a>
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
                    Follow us for updates, events, and moments from our
                    wonderful community.
                  </p>
                </div>
              </ScrollAnimationWrapper>
            </div>
            <ScrollAnimationWrapper animation="fadeIn" delay={600}>
              <div className="border-t border-white/20 mt-12 pt-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-sm font-secondary text-white/70">
                    &copy; 2025 Wonderland Early Years & Prep School. All rights
                    reserved.
                  </p>
                  <div className="flex gap-6 text-sm font-secondary">
                    <Link 
                      href="/privacy" 
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link 
                      href="/terms" 
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          </div>
        </footer>
      </main>
      <FooterEnrollButton />
    </>
  );
}

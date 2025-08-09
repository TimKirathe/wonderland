import Image from "next/image";
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import HomeClient from "@/components/HomeClient";
import VisionMission from "@/components/VisionMission";
import EducationPhilosophy from "@/components/EducationPhilosophy";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import LazyVideo from "@/components/LazyVideo";

interface Review {
  id: string;
  text: string;
  parent_name: string;
  date: string;
}

// This enables ISR with a revalidation period of 3600 seconds (1 hour)
export const revalidate = 3600;

async function getMarketingPhotos() {
  const photosDirectory = path.join(process.cwd(), 'public', 'marketing-photos');
  
  try {
    const files = fs.readdirSync(photosDirectory);
    
    const imageFiles = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
        return numA - numB;
      });
    
    return imageFiles.map(file => `/marketing-photos/${file}`);
  } catch (error) {
    console.error('Error reading marketing photos directory:', error);
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
      .from('reviews')
      .select('*')
      .order('date', { ascending: false })
      .limit(9);

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    return reviews || [];
  } catch (error) {
    console.error('Error in reviews fetch:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch data at build/request time
  const [marketingPhotos, reviews] = await Promise.all([
    getMarketingPhotos(),
    getReviews()
  ]);

  return (
    <>
      {/* Client-side navigation and hero */}
      <HomeClient initialPhotos={marketingPhotos} initialReviews={reviews} />

      {/* Education Philosophy Section */}
      <main id="main-content">
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
                  sizes="(max-width: 1024px) 192px, 256px"
                  loading="lazy"
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
                    loading="lazy"
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
                    loading="lazy"
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
                    loading="lazy"
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
                  <LazyVideo
                    src="/wonderland-school-video-1.mp4"
                    poster="/video-poster.jpg"
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
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

      {/* Contact Section is rendered in HomeClient for interactivity */}

      {/* Footer is rendered in HomeClient for interactivity */}
      </main>
    </>
  );
}

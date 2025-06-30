import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🌈</span>
              <h1 className="text-2xl font-bold text-gradient">
                Wonderland Early Years & Prep School
              </h1>
            </div>
            <div className="hidden md:flex space-x-6">
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
            <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">We learn,</span>
                <br />
                <span className="text-gradient">We care,</span>
                <br />
                <span className="text-gradient">We play</span>
              </h2>
              <p className="text-xl text-foreground/80 mb-8">
                Welcome to Wonderland Early Years & Prep School, where every
                child's journey begins with wonder, creativity, and endless
                possibilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105">
                  Start Your Journey
                </button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary hover:text-white transition-all">
                  Virtual Tour
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/20 rounded-3xl p-8 animate-float">
                  <span className="text-6xl">🎨</span>
                  <p className="mt-2 font-semibold">Creative Arts</p>
                </div>
                <div
                  className="bg-secondary/20 rounded-3xl p-8 animate-float"
                  style={{ animationDelay: "0.5s" }}
                >
                  <span className="text-6xl">📚</span>
                  <p className="mt-2 font-semibold">Learning Fun</p>
                </div>
                <div
                  className="bg-accent/20 rounded-3xl p-8 animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="text-6xl">🎮</span>
                  <p className="mt-2 font-semibold">Play Time</p>
                </div>
                <div
                  className="bg-primary/20 rounded-3xl p-8 animate-float"
                  style={{ animationDelay: "1.5s" }}
                >
                  <span className="text-6xl">🌳</span>
                  <p className="mt-2 font-semibold">Nature</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-6xl animate-wiggle opacity-20">
          🌟
        </div>
        <div
          className="absolute bottom-10 right-10 text-6xl animate-wiggle opacity-20"
          style={{ animationDelay: "0.5s" }}
        >
          🌈
        </div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-float opacity-10">
          ☁️
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Welcome to Wonderland</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              At Wonderland Early Years & Prep School, we believe every child is unique and
              special. Our nurturing environment fosters creativity, curiosity,
              and confidence in young learners.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="text-5xl mb-4">🍼</div>
              <h3 className="text-2xl font-semibold mb-3">Nursery</h3>
              <p className="text-foreground/70 mb-4">Ages 2-3 years</p>
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
              <h3 className="text-2xl font-semibold mb-3">Pre-K</h3>
              <p className="text-foreground/70 mb-4">Ages 3-4 years</p>
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
              <h3 className="text-2xl font-semibold mb-3">Kindergarten</h3>
              <p className="text-foreground/70 mb-4">Ages 4-6 years</p>
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
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Wonderland?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
            </div>
            <div className="space-y-6">
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
                "My daughter loves going to Wonderland every day. The teachers
                are amazing and she's learned so much!"
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
                "The perfect balance of learning and play. My son has grown so
                much in confidence since joining."
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
                "Wonderland truly lives up to its name. It's a magical place
                where children thrive and grow."
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
                        123 Rainbow Lane, Wonderland City, WL 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-foreground/70">(555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">✉️</span>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-foreground/70">
                        hello@wonderlandkindergarten.com
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
                <h3 className="text-2xl font-semibold mb-6">Schedule a Tour</h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Parent's Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  />
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary">
                    <option>Select Child's Age</option>
                    <option>2 years</option>
                    <option>3 years</option>
                    <option>4 years</option>
                    <option>5 years</option>
                    <option>6 years</option>
                  </select>
                  <textarea
                    placeholder="Message (Optional)"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Request Information
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-3xl">🌈</span>
                <h3 className="text-xl font-bold">Wonderland</h3>
              </div>
              <p className="text-white/70">We learn, We care, We play</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link
                    href="#about"
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#programs"
                    className="hover:text-white transition-colors"
                  >
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#admissions"
                    className="hover:text-white transition-colors"
                  >
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="hover:text-white transition-colors"
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
                  <Link href="#" className="hover:text-white transition-colors">
                    Nursery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Pre-K
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kindergarten
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    After School
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <span className="text-xl">📘</span>
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <span className="text-xl">📷</span>
                </a>
                <a
                  href="#"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <span className="text-xl">🐦</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>
              &copy; 2024 Wonderland Early Years & Prep School. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

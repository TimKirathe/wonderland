import Image from "next/image";

export default function VisionMission() {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12 max-w-6xl mx-auto">
        <div className="relative h-64 lg:h-80 rounded-3xl overflow-hidden">
          <Image
            src="/class-photo.jpg"
            alt="Class Photo"
            fill
            className="object-cover"
          />
        </div>
        <div className="text-center lg:text-left">
          <h3 className="text-3xl font-bold mb-6 font-primary">
            Our Beliefs & Values
          </h3>
          <p className="text-lg text-foreground/70 font-secondary">
            We believe that every child is unique and deserving of a nurturing
            environment. Our community is built on the values of godliness,
            love, hard work, and collaboration. We strive to provide a thorough,
            hands-on, and fun educational experience that prepares our students
            for a lifetime of learning, leadership, and service.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Vision Card */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 card-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-primary/20 p-3 rounded-full mr-4">
              <span className="text-3xl">🌟</span>
            </div>
            <h4 className="text-2xl font-bold font-primary">Our Vision</h4>
          </div>
          <p className="text-foreground/80 leading-relaxed font-secondary">
            Our vision is to empower students to become compassionate,
            innovative, and courageous leaders who excel academically,
            spiritually, and socially.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-3xl p-8 card-shadow">
          <div className="flex items-center mb-4">
            <div className="bg-secondary/20 p-3 rounded-full mr-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h4 className="text-2xl font-bold font-primary">Our Mission</h4>
          </div>
          <p className="text-foreground/80 leading-relaxed font-secondary">
            Our mission is to provide high-quality, Biblically principled
            education that equips students with the knowledge, skills, and
            values necessary to succeed in their chosen paths.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-12 bg-accent/10 rounded-3xl p-8 max-w-4xl mx-auto">
        <h4 className="text-2xl font-bold text-center mb-6 font-primary">
          Our Core Values
        </h4>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">
              ✨ Godliness
            </span>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">
              ❤️ Love
            </span>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">
              💪 Hard Work
            </span>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">
              🤝 Collaboration
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

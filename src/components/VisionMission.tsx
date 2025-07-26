export default function VisionMission() {
  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold mb-6 font-primary">Our Beliefs & Values</h3>
        <p className="text-lg text-foreground/70 max-w-3xl mx-auto font-secondary">
          At Wonderland Early Years and Prep School, we believe that every child is unique and deserving of a nurturing environment 
          that fosters academic excellence, spiritual growth, and personal development. Our community is built on the values of 
          godliness, love, hard work, and collaboration. We strive to provide a thorough, hands-on, and fun educational experience 
          that prepares our students for a lifetime of learning, leadership, and service.
        </p>
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
            Our vision is to empower students to become compassionate, innovative, and courageous leaders who excel 
            academically, spiritually, and socially. We aim to cultivate a love for learning and a strong sense of purpose.
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
            Our mission is to provide a high-quality, Christ-centered education that equips students with the knowledge, 
            skills, and values necessary to succeed in their chosen paths. We are committed to creating a supportive 
            community that encourages students to thrive.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-12 bg-accent/10 rounded-3xl p-8 max-w-4xl mx-auto">
        <h4 className="text-2xl font-bold text-center mb-6 font-primary">Our Core Values</h4>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">✨ Godliness</span>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">❤️ Love</span>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">💪 Hard Work</span>
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-full">
            <span className="font-semibold text-primary font-secondary">🤝 Collaboration</span>
          </div>
        </div>
      </div>
    </div>
  );
}
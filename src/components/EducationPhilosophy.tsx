export default function EducationPhilosophy() {
  return (
    <section id="education-philosophy" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Why Early Years Education Matters</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Early years education (ages 0-10) lays the foundation for a child&apos;s future academic success, social skills, and emotional well-being. 
            It shapes their ability to learn, interact, and thrive.
          </p>
        </div>

        {/* Three Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
            <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-center">Brain Development</h3>
            <p className="text-foreground/70 text-center">
              A significant amount of brain development occurs before age 5, making early years crucial for cognitive growth.
            </p>
          </div>

          <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
            <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📚</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-center">Foundational Skills</h3>
            <p className="text-foreground/70 text-center">
              Early years education builds foundational skills in literacy & numeracy, setting the stage for future academic success.
            </p>
          </div>

          <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
            <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💝</span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-center">Social-Emotional Development</h3>
            <p className="text-foreground/70 text-center">
              Early years education helps children develop essential life skills, such as empathy, self-regulation, and cooperation.
            </p>
          </div>
        </div>

        {/* Practical Examples */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-center mb-8">Practical Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 transition-all hover:scale-105">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🎮</span>
                <h4 className="text-lg font-semibold">Play-Based Learning</h4>
              </div>
              <p className="text-foreground/70 text-sm">
                Play is a powerful learning tool. Activities like puzzles, blocks, and role-playing help develop problem-solving skills, creativity, and social skills.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 transition-all hover:scale-105">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">📖</span>
                <h4 className="text-lg font-semibold">Story Time</h4>
              </div>
              <p className="text-foreground/70 text-sm">
                Reading to children regularly exposes them to new vocabulary, sentence structures, and storytelling techniques, fostering language development and literacy skills.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 transition-all hover:scale-105">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🏃</span>
                <h4 className="text-lg font-semibold">Psycho-motor Development</h4>
              </div>
              <p className="text-foreground/70 text-sm">
                Exposing children to a wide variety of sports ensures they develop confidence and fitness at an early age.
              </p>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 transition-all hover:scale-105">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🎯</span>
                <h4 className="text-lg font-semibold">Cognitive Growth</h4>
              </div>
              <p className="text-foreground/70 text-sm">
                Teaching children to code, learn abacus, play instruments, and learn different languages sets our children up for excellence.
              </p>
            </div>
          </div>
        </div>

        {/* Analogy */}
        <div className="bg-accent/10 rounded-3xl p-8 mb-16 max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <span className="text-3xl">🏠</span>
            <div>
              <h3 className="text-2xl font-semibold mb-3">Building a Strong Foundation</h3>
              <p className="text-foreground/70">
                Early years education is like laying the foundation for a house. A strong foundation ensures a stable and secure structure, 
                just like a strong early education sets the stage for future success.
              </p>
            </div>
          </div>
        </div>

        {/* Tips for Parents */}
        <div>
          <h3 className="text-3xl font-semibold text-center mb-8">Tips for Parents</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card-bg rounded-3xl p-6 card-shadow">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">🎨</span>
                <h4 className="text-xl font-semibold">Engage in Play</h4>
              </div>
              <p className="text-foreground/70">
                Engage in play with your child, to foster cognitive and social development.
              </p>
            </div>

            <div className="bg-card-bg rounded-3xl p-6 card-shadow">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">👥</span>
                <h4 className="text-xl font-semibold">Encourage Social Interactions</h4>
              </div>
              <p className="text-foreground/70">
                Encourage social interactions, such as enrolling in school, group activities, and family gatherings, to help your child develop essential social-emotional skills.
              </p>
            </div>

            <div className="bg-card-bg rounded-3xl p-6 card-shadow">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-3">💬</span>
                <h4 className="text-xl font-semibold">Practice Active Recall</h4>
              </div>
              <p className="text-foreground/70">
                Ask your children what they learnt in school during the day! Many of our parents are delighted to hear their children demonstrate knowledge in ways they never thought they could! This also helps your children remember what they have been taught for years to come.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="text-center mt-12">
          <p className="text-xl font-semibold text-primary">
            At Wonderland Early Years, we prioritize early years education, giving your child a solid foundation for future success.
          </p>
        </div>
      </div>
    </section>
  );
}
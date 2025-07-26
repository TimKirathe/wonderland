"use client";

import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

export default function EducationPhilosophy() {
  return (
    <section
      id="education-philosophy"
      className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <ScrollAnimationWrapper animation="slideRight" delay={0}>
            <h2 className="text-4xl font-bold mb-4">
              Why Early Years Education Matters
            </h2>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper animation="slideLeft" delay={150}>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Early years education (ages 0-10) lays the foundation for a
              child&apos;s future academic success, social skills, and emotional
              well-being. It shapes their ability to learn, interact, and
              thrive.
            </p>
          </ScrollAnimationWrapper>
        </div>

        {/* Three Key Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ScrollAnimationWrapper animation="scaleRotate" delay={300}>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-center">
                Brain Development
              </h3>
              <p className="text-foreground/70 text-center">
                A strong early years is crucial for cognitive growth.
              </p>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="scaleRotate" delay={450}>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-center">
                Foundational Skills
              </h3>
              <p className="text-foreground/70 text-center">
                Literacy, numeracy & creativity, are key pillars upon which
                children develop other skills.
              </p>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="scaleRotate" delay={600}>
            <div className="bg-card-bg rounded-3xl p-8 card-shadow card-shadow-hover transition-all">
              <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💝</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-center">
                Social Development
              </h3>
              <p className="text-foreground/70 text-center">
                Children develop empathy, self-regulation, and cooperation.
              </p>
            </div>
          </ScrollAnimationWrapper>
        </div>

        {/* Analogy */}
        <ScrollAnimationWrapper animation="expandCenter" delay={1500}>
          <div className="bg-accent/10 rounded-3xl p-8 mb-16 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <span className="text-3xl">🏠</span>
              <div>
                <h3 className="text-2xl font-semibold mb-3">
                  Building a Strong Foundation
                </h3>
                <p className="text-foreground/70">
                  Early years education is like laying the foundation for a
                  house. Just as a strong foundation ensures a stable structure,
                  even so a solid early education sets the children up for
                  future success.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimationWrapper>

        {/* Closing Statement */}
        <ScrollAnimationWrapper animation="pulse" delay={2150} threshold={0.3}>
          <div className="text-center mt-12">
            <p className="text-xl font-semibold text-primary">
              At Wonderland Early Years, we prioritize early years education,
              giving your child a solid foundation for future success.
            </p>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}

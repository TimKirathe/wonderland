import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Wonderland Early Years & Prep School",
  description: "Terms of service for Wonderland Early Years & Prep School - Guidelines for using our website and services.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-block mb-8 text-primary hover:text-primary/80 transition-colors font-secondary"
        >
          ← Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 font-primary text-gradient">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none font-secondary space-y-6">
            <p className="text-foreground/80">
              <strong>Last Updated: January 2025</strong>
            </p>
            
            <p>
              Welcome to Wonderland Early Years & Prep School. These Terms of Service (&quot;Terms&quot;) govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website or services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. These Terms apply to all visitors, users, and others who access or use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">2. Use of Website</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 font-primary">Permitted Use</h3>
            <p>You may use our website for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Obtaining information about our school and educational programs</li>
              <li>Submitting admission inquiries and applications</li>
              <li>Contacting us for information or scheduling visits</li>
              <li>Accessing educational resources and school updates</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 font-primary">Prohibited Use</h3>
            <p>You agree not to use our website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To interfere with or circumvent the security features of our website</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">3. Enrollment and Admission</h2>
            <p>
              Submission of an inquiry or application through our website does not guarantee admission to Wonderland Early Years & Prep School. Admission decisions are made based on various factors including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Available space in the requested program</li>
              <li>Age and developmental readiness of the child</li>
              <li>Completion of required documentation</li>
              <li>Payment of applicable fees</li>
              <li>School admission policies and procedures</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">4. Tuition and Fees</h2>
            <p>
              Tuition rates and fees displayed on our website are subject to change. Current rates will be confirmed during the admission process. Parents/guardians are responsible for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Timely payment of all tuition and fees</li>
              <li>Understanding the school&apos;s refund and withdrawal policies</li>
              <li>Providing accurate financial information when required</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">5. Intellectual Property</h2>
            <p>
              The content on our website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and data compilations, is the property of Wonderland Early Years & Prep School or its content suppliers and is protected by international copyright laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written consent.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">6. Privacy and Data Protection</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy. By using our website, you consent to our collection and use of your information as described in our Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">7. User Submissions</h2>
            <p>
              Any information, feedback, or materials you submit to us through our website becomes our property. We may use such submissions for any purpose without compensation to you. You represent and warrant that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You own or control all rights to the submissions</li>
              <li>The submissions are accurate and not misleading</li>
              <li>The submissions do not violate any third party&apos;s rights</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">8. Disclaimers</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 font-primary">Website Information</h3>
            <p>
              The information on our website is provided on an &quot;as is&quot; basis. While we strive to keep information accurate and up-to-date, we make no warranties or representations about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 font-primary">Educational Outcomes</h3>
            <p>
              We do not guarantee specific educational outcomes or results. Each child&apos;s progress depends on various factors including individual abilities, effort, and parental support.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Wonderland Early Years & Prep School shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your use or inability to use our website or services</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from our website</li>
              <li>Any bugs, viruses, trojan horses, or the like that may be transmitted through our website by any third party</li>
              <li>Any errors or omissions in any content</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">10. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Wonderland Early Years & Prep School, its officers, directors, employees, and agents, from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">11. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by your use of any such content, goods, or services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">12. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of our website shall be resolved in the courts of Kenya.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">13. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will provide notice on our website prior to any new terms taking effect. Your continued use of our website after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">14. Severability</h2>
            <p>
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">15. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="font-semibold">Wonderland Early Years & Prep School</p>
              <p>Kalobot Road, Langata</p>
              <p>Nairobi, Kenya</p>
              <p>Phone: <a href="tel:+254738626219" className="text-primary hover:underline">+254 738 626 219</a></p>
              <p>Email: <a href="mailto:info@wonderlandke.com" className="text-primary hover:underline">info@wonderlandke.com</a></p>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-foreground/70">
                <strong>Note:</strong> By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
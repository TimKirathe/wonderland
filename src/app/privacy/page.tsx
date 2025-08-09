import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Wonderland Early Years & Prep School",
  description: "Privacy policy for Wonderland Early Years & Prep School - How we collect, use, and protect your information.",
};

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none font-secondary space-y-6">
            <p className="text-foreground/80">
              <strong>Last Updated: January 2025</strong>
            </p>
            
            <p>
              Wonderland Early Years & Prep School (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting the privacy and security of the personal information of our students, parents, guardians, and website visitors. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or interact with our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">1. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 font-primary">Personal Information</h3>
            <p>We may collect personal information that you provide directly to us, including but not limited to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Parent/guardian names and contact information (email, phone number, address)</li>
              <li>Student names, dates of birth, and grade levels</li>
              <li>Medical information and special needs requirements</li>
              <li>Previous school information</li>
              <li>Emergency contact details</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 font-primary">Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and version</li>
              <li>IP address</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website addresses</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">2. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing admission applications and enrollment</li>
              <li>Communicating with parents and guardians about their children&apos;s education</li>
              <li>Providing educational services and support</li>
              <li>Ensuring the safety and well-being of students</li>
              <li>Sending newsletters and school updates (with consent)</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">3. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your consent or at your direction</li>
              <li>With service providers who assist in operating our website and providing our services</li>
              <li>To comply with legal obligations or respond to lawful requests</li>
              <li>To protect the rights, property, or safety of our school, students, staff, or others</li>
              <li>In connection with a merger, acquisition, or sale of assets (with notice to affected parties)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Secure storage of physical and electronic records</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Regular security assessments and updates</li>
              <li>Staff training on data protection and privacy</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">5. Children&apos;s Privacy</h2>
            <p>
              Our website is not intended for children under the age of 13 to use without parental supervision. We do not knowingly collect personal information directly from children under 13 without parental consent. If you believe we have collected information from a child under 13 without proper consent, please contact us immediately.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">6. Your Rights and Choices</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access and review the personal information we hold about you or your child</li>
              <li>Request corrections to inaccurate or incomplete information</li>
              <li>Request deletion of personal information (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">7. Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyze website usage. You can control cookie settings through your browser preferences. Disabling cookies may affect some features of our website.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">9. Data Retention</h2>
            <p>
              We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Student records are retained in accordance with applicable education laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website with a new &quot;Last Updated&quot; date.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 font-primary">11. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="font-semibold">Wonderland Early Years & Prep School</p>
              <p>Kalobot Road, Langata</p>
              <p>Nairobi, Kenya</p>
              <p>Phone: <a href="tel:+254738626219" className="text-primary hover:underline">+254 738 626 219</a></p>
              <p>Email: <a href="mailto:info@wonderlandke.com" className="text-primary hover:underline">info@wonderlandke.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
import { BRAND } from '../config';

interface LegalProps {
  type: 'privacy' | 'terms' | 'risk' | 'disclaimer' | 'cookie';
}

const content: Record<string, { title: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      { heading: 'Introduction', body: `${BRAND.name} ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information.` },
      { heading: 'Information We Collect', body: 'We collect information you provide directly, such as name, email address, and account details. We may also collect usage data, device information, and cookies.' },
      { heading: 'How We Use Your Information', body: 'We use your information to provide and improve our services, communicate with you, process transactions, and comply with legal obligations.' },
      { heading: 'Data Security', body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, or destruction.' },
      { heading: 'Your Rights', body: 'You have the right to access, correct, or delete your personal information. Contact us at winemicapital@gmail.com to exercise these rights.' },
      { heading: 'Contact', body: `For privacy-related inquiries, contact us at ${BRAND.email} or write to us in Accra, Ghana.` },
    ],
  },
  terms: {
    title: 'Terms of Service',
    sections: [
      { heading: 'Acceptance of Terms', body: `By accessing or using ${BRAND.name}'s services, you agree to be bound by these terms.` },
      { heading: 'Services', body: 'We provide financial education, research, and informational content. Our services do not constitute personalized financial advice.' },
      { heading: 'User Responsibilities', body: 'You are responsible for maintaining the confidentiality of your account and for all activities under your account.' },
      { heading: 'Intellectual Property', body: `All content on this platform is the property of ${BRAND.name} and is protected by applicable copyright and intellectual property laws.` },
      { heading: 'Limitation of Liability', body: `${BRAND.name} shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.` },
      { heading: 'Governing Law', body: 'These terms are governed by the laws of Ghana. Any disputes shall be resolved in the courts of Ghana.' },
    ],
  },
  risk: {
    title: 'Risk Disclosure',
    sections: [
      { heading: 'General Risk Warning', body: 'Investment and trading activities involve substantial risk of loss and are not suitable for all investors. You should carefully consider whether such activities are appropriate for you.' },
      { heading: 'Market Risk', body: 'Financial markets are subject to volatility. Values can decrease as well as increase. Past performance is not indicative of future results.' },
      { heading: 'Trading Risk', body: 'Trading financial instruments can result in the loss of your entire investment. Leverage can magnify both gains and losses.' },
      { heading: 'No Guarantees', body: `${BRAND.name} does not guarantee any specific investment returns. No representation is made that any strategy will achieve its objectives.` },
      { heading: 'Educational Content', body: 'All educational content is for informational purposes only and does not constitute financial advice. You should consult a qualified financial advisor.' },
      { heading: 'Your Responsibility', body: 'You are solely responsible for your investment decisions. We recommend only investing capital you can afford to lose.' },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    sections: [
      { heading: 'General Disclaimer', body: `The information provided by ${BRAND.name} is for general informational and educational purposes only.` },
      { heading: 'Not Financial Advice', body: 'Nothing on this website constitutes financial, investment, legal, or tax advice. Always seek the advice of qualified professionals.' },
      { heading: 'No Endorsement', body: 'References to third-party websites, products, or services do not constitute endorsement or recommendation.' },
      { heading: 'Accuracy of Information', body: 'While we strive for accuracy, we make no warranties about the completeness, reliability, or accuracy of information on this website.' },
      { heading: 'External Links', body: 'We are not responsible for the content or practices of external websites linked from our platform.' },
      { heading: 'Changes', body: `${BRAND.name} reserves the right to modify this disclaimer at any time without prior notice.` },
    ],
  },
  cookie: {
    title: 'Cookie Policy',
    sections: [
      { heading: 'What Are Cookies', body: 'Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience.' },
      { heading: 'How We Use Cookies', body: 'We use essential cookies for website functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings.' },
      { heading: 'Managing Cookies', body: 'You can control cookies through your browser settings. Note that disabling cookies may affect website functionality.' },
      { heading: 'Third-Party Cookies', body: 'Some cookies are placed by third-party services that appear on our pages. We do not control these cookies.' },
      { heading: 'Updates', body: 'We may update this cookie policy periodically. Changes will be posted on this page.' },
      { heading: 'Contact', body: `For questions about our cookie policy, contact us at ${BRAND.email}.` },
    ],
  },
};

export default function Legal({ type }: LegalProps) {
  const page = content[type];

  return (
    <section className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-[800px] mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-accent/70 mb-4">Legal</p>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ivory mb-12">
          {page.title}
        </h1>

        <div className="space-y-10">
          {page.sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-medium text-ivory mb-3">{section.heading}</h2>
              <p className="text-sm text-ivory/60 leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5">
          <p className="text-xs text-ivory/40">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-xs text-ivory/40 mt-2">
            © {new Date().getFullYear()} {BRAND.name} All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}

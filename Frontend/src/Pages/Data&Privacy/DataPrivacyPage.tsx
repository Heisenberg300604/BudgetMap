import React, { useState } from 'react';
import { Lock, Shield, Database, FileText, Users, Server, ChevronDown, ChevronUp } from 'lucide-react';

const DataPrivacyPage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const securityFeatures = [
    {
      icon: <Lock className="text-green-700 w-12 h-12 mb-4" />,
      title: 'End-to-End Encryption',
      description: 'All your financial data is encrypted using advanced 256-bit AES encryption, ensuring that your sensitive information remains completely confidential.'
    },
    {
      icon: <Shield className="text-green-700 w-12 h-12 mb-4" />,
      title: 'Zero Data Sharing',
      description: 'We never sell, rent, or share your personal or financial data with third parties. Your information stays strictly confidential within BudgetMap.'
    },
    {
      icon: <Database className="text-green-700 w-12 h-12 mb-4" />,
      title: 'Secure Data Storage',
      description: 'Your data is stored on secure, redundant servers with multiple layers of physical and digital security protocols.'
    }
  ];

  const privacyCommitments = [
    {
      icon: <FileText className="text-green-700 w-12 h-12 mb-4" />,
      title: 'Transparent Privacy Policy',
      description: 'We maintain a clear, comprehensive privacy policy that outlines exactly how your data is collected, used, and protected.'
    },
    {
      icon: <Users className="text-green-700 w-12 h-12 mb-4" />,
      title: 'Anonymous Data Handling',
      description: 'Personal identifiers are anonymized and separated from financial data, providing an additional layer of privacy protection.'
    },
    {
      icon: <Server className="text-green-700 w-12 h-12 mb-4" />,
      title: 'Regular Security Audits',
      description: 'We conduct frequent third-party security audits to ensure our systems meet the highest standards of data protection.'
    }
  ];

  const privacyPolicySections = [
    {
      title: 'Data Collection',
      content: 'BudgetMap collects only essential personal and financial information necessary for providing our service. This includes your name, email, financial transactions, and account details. We collect data directly from you during account creation and through your interactions with our platform.'
    },
    {
      title: 'Data Usage',
      content: 'We use your data solely to provide and improve our financial tracking services. This includes personalizing your experience, processing transactions, generating financial insights, and ensuring platform security. We do not use your data for marketing or sell it to third parties.'
    },
    {
      title: 'User Consent & Control',
      content: 'By using BudgetMap, you provide explicit consent for data processing. You can review, export, or delete your data at any time through your account settings. We provide complete transparency about data usage and give you full control over your personal information.'
    },
    {
      title: 'Data Protection Measures',
      content: 'We implement multi-layered security protocols including 256-bit AES encryption, secure cloud storage, two-factor authentication, and regular security audits. All financial data is encrypted in transit and at rest, ensuring maximum protection against unauthorized access.'
    },
    {
      title: 'Third-Party Interactions',
      content: 'BudgetMap may integrate with banks or financial institutions to provide enhanced services. These interactions are strictly governed by secure API protocols, and we ensure no unnecessary data is shared. Any third-party service adheres to our rigorous privacy standards.'
    }
  ];

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-700 mb-4">
            Your Data, Your Privacy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At BudgetMap, we understand that your financial data is deeply personal. 
            We are committed to providing the highest level of security and privacy protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-8">Security Features</h2>
            <div className="space-y-6">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start bg-white p-6 rounded-lg shadow-md">
                  <div className="mr-6">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-700 mb-8">Privacy Commitments</h2>
            <div className="space-y-6">
              {privacyCommitments.map((commitment, index) => (
                <div key={index} className="flex items-start bg-white p-6 rounded-lg shadow-md">
                  <div className="mr-6">{commitment.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">{commitment.title}</h3>
                    <p className="text-gray-600">{commitment.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
            Comprehensive Privacy Policy
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {privacyPolicySections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <div 
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 p-4 rounded-lg"
                  onClick={() => toggleSection(section.title)}
                >
                  <h3 className="text-xl font-semibold text-green-800">{section.title}</h3>
                  {expandedSection === section.title ? (
                    <ChevronUp className="text-green-700" />
                  ) : (
                    <ChevronDown className="text-green-700" />
                  )}
                </div>
                {expandedSection === section.title && (
                  <p className="text-gray-600 p-4 pt-0">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPrivacyPage;
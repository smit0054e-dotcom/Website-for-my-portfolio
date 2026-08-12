import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  Mail, 
  Phone, 
  Handshake, 
  Github, 
  MapPin, 
  Check, 
  Copy, 
  Send, 
  MessageSquare, 
  Sparkles,
  ExternalLink,
  Clock
} from 'lucide-react';

interface ContactSectionProps {
  profile: StudentProfile;
  darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'General Collaboration',
    subject: 'Web Project Collaboration Inquiry',
    message: ''
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmitCollaboration = (e: React.FormEvent) => {
    e.preventDefault();

    const recipient = profile.email || 'smit0054e@gmail.com';
    const emailSubject = encodeURIComponent(`[${formData.projectType}] ${formData.subject || 'Collaboration Request'}`);
    
    const bodyContent = `Hi ${profile.name},

I would love to collaborate with you on a web project!

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Project Type: ${formData.projectType}

Message:
${formData.message || 'I saw your portfolio and would love to discuss a web development opportunity.'}

Best regards,
${formData.name || 'Visitor'}`;

    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${encodeURIComponent(bodyContent)}`;

    // Trigger Mailto email client!
    window.location.href = mailtoUrl;

    setStatusMessage('Opening your email client to send message to ' + recipient + '...');
    setTimeout(() => setStatusMessage(null), 6000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Get In Touch</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            darkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Contact & Collaboration
          </h2>
          <p className={`text-base sm:text-lg ${
            darkMode ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Have a project in mind, an open-source idea, or an internship opportunity? Reach out directly via email or phone, or submit a collaboration request below!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Contact Cards & Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Email Address
                    </h3>
                    <a
                      href={`mailto:${profile.email}`}
                      className={`text-lg font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(profile.email, 'email')}
                  className={`p-2 rounded-lg border transition-colors ${
                    darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Copy email address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-500" />}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Response time: &lt; 24 hrs
                </span>
                <a
                  href={`mailto:${profile.email}?subject=Direct Portfolio Inquiry`}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>Open Email Client</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Phone Number
                    </h3>
                    <a
                      href={`tel:${profile.phone}`}
                      className={`text-lg font-bold hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(profile.phone, 'phone')}
                  className={`p-2 rounded-lg border transition-colors ${
                    darkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                  title="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-emerald-500" />}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </span>
                <a
                  href={`tel:${profile.phone}`}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Click to Call</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* GitHub Profile Card */}
            <div className={`p-6 rounded-2xl border transition-all ${
              darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-md">
                    <Github className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      GitHub Profile
                    </h3>
                    <p className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      View Source Repositories
                    </p>
                  </div>
                </div>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Side: Interactive Collaboration Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-3xl border shadow-2xl relative ${
              darkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h3 className={`text-2xl font-bold flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                    <Handshake className="w-6 h-6 text-indigo-500" />
                    <span>Let's Collaborate</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Fills out a structured message and opens your default mail client directly!
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                  Mailto Integration
                </span>
              </div>

              {statusMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmitCollaboration} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                        darkMode
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                        darkMode
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                        darkMode
                          ? 'bg-slate-950 border-slate-800 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    >
                      <option value="Freelance Web Project">Freelance Web Project</option>
                      <option value="Open Source Collaboration">Open Source Collaboration</option>
                      <option value="Internship / Junior Role">Internship / Junior Role</option>
                      <option value="Mentorship & Learning">Mentorship & Learning</option>
                      <option value="General Collaboration">General Query</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${
                      darkMode ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Inquiry Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                        darkMode
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Collaboration Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, timeframe, or ideas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all ${
                      darkMode
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Submit Collaboration Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2"
                  id="submit-collaboration-form-btn"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Request via Email Client ({profile.email})</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

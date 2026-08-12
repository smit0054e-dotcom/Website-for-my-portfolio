import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { 
  X, 
  Send, 
  Mail, 
  Phone, 
  Copy, 
  Check, 
  Handshake, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface CollaborationModalProps {
  profile: StudentProfile;
  darkMode: boolean;
  onClose: () => void;
}

export const CollaborationModal: React.FC<CollaborationModalProps> = ({
  profile,
  darkMode,
  onClose,
}) => {
  const [subject, setSubject] = useState('Web Project Collaboration');
  const [category, setCategory] = useState('Open Source / Freelance');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');

  const handleLaunchEmailClient = (e: React.FormEvent) => {
    e.preventDefault();
    const emailTo = profile.email || 'smit0054e@gmail.com';
    const fullSubject = encodeURIComponent(`[${category}] ${subject}`);
    const bodyText = encodeURIComponent(
      `Hi ${profile.name},\n\nI came across your portfolio website and would like to discuss a collaboration.\n\nProject Type: ${category}\n\nDetails:\n${message || 'I would love to connect with you regarding web development opportunities.'}\n\nBest regards,`
    );

    const mailtoUrl = `mailto:${emailTo}?subject=${fullSubject}&body=${bodyText}`;
    window.location.href = mailtoUrl;

    setStatus(`Opening email client to send to ${emailTo}...`);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className={`w-full max-w-xl rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md">
              <Handshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold">Let's Collaborate</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct email connector to {profile.name} ({profile.email})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border transition-colors ${
              darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Quick Copy email bar */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            darkMode ? 'bg-slate-950 border-slate-800' : 'bg-indigo-50/70 border-indigo-200'
          }`}>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-indigo-500" />
              <div>
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Target Email Address
                </div>
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-300">
                  {profile.email}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                darkMode ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-indigo-500" />}
              <span>{copied ? 'Copied' : 'Copy Email'}</span>
            </button>
          </div>

          {status && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{status}</span>
            </div>
          )}

          <form onSubmit={handleLaunchEmailClient} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">Collaboration Type</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Open Source / Freelance">Open Source / Freelance</option>
                  <option value="Student Project Partner">Student Project Partner</option>
                  <option value="Internship Inquiry">Internship Inquiry</option>
                  <option value="Web Mentorship">Web Mentorship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry Subject"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-indigo-500 ${
                    darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Your Message or Ideas</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a brief note to attach to the email..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-medium focus:ring-2 focus:ring-indigo-500 ${
                  darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Direct Mailto Launcher */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                id="modal-launch-mailto-btn"
              >
                <Send className="w-4 h-4" />
                <span>Open Mail Client Now</span>
              </button>

              <a
                href={`tel:${profile.phone}`}
                className={`px-4 py-3.5 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 ${
                  darkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-200' : 'border-slate-300 hover:bg-slate-100 text-slate-800'
                }`}
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>Call Phone</span>
              </a>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

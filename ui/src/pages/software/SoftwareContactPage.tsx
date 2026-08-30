import React, { useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import '../../styles/software.css';

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const SoftwareContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const body = [
      `Name: ${fullName}`,
      `Email: ${formData.email}`,
      '',
      formData.message,
    ].join('\n');

    const emailRecipient = 'nhucanada0628@gmail.com';
    const encodedSubject = encodeURIComponent(formData.subject);
    const encodedBody = encodeURIComponent(body);
    const mailtoUrl = `mailto:${emailRecipient}?subject=${encodedSubject}&body=${encodedBody}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="sw-site">
      <section className="sw-body">
        <div className="sw-section-header">
          <h2 className="sw-section-title">Contact</h2>
          <div className="sw-section-rule" />
        </div>

        <div className="sw-contact-layout">
          <div className="sw-contact-form-column">
            <p className="sw-contact-intro">
              Have a project in mind, a question, or just want to connect? Send a message
              and I&apos;ll get back to you.
            </p>
            <form className="sw-contact-form" onSubmit={handleSubmit}>
              <div className="sw-name-row">
                <label className="sw-input-group">
                  <span className="sw-input-label">First Name</span>
                  <input
                    className="sw-input"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Nathan"
                    required
                  />
                </label>
                <label className="sw-input-group">
                  <span className="sw-input-label">Last Name</span>
                  <input
                    className="sw-input"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Hu"
                    required
                  />
                </label>
              </div>
              <label className="sw-input-group">
                <span className="sw-input-label">Email</span>
                <input
                  className="sw-input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="sw-input-group">
                <span className="sw-input-label">Subject</span>
                <input
                  className="sw-input"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="What's this about?"
                  required
                />
              </label>
              <label className="sw-input-group">
                <span className="sw-input-label">Message</span>
                <textarea
                  className="sw-textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  required
                />
              </label>
              <button type="submit" className="sw-btn-primary" style={{ justifySelf: 'start' }}>
                Send Message
              </button>
            </form>
          </div>

          <div className="sw-contact-social-col">
            <a
              className="sw-social-row"
              href="https://github.com/Nhucanada"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sw-social-icon"><GitHubIcon /></span>
              <div>
                <div className="sw-social-label">GitHub</div>
                <div className="sw-social-handle">@Nhucanada</div>
              </div>
            </a>
            <a
              className="sw-social-row"
              href="https://www.linkedin.com/in/nhucanada/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sw-social-icon"><LinkedInIcon /></span>
              <div>
                <div className="sw-social-label">LinkedIn</div>
                <div className="sw-social-handle">/in/nhucanada</div>
              </div>
            </a>
            <a
              className="sw-social-row"
              href="mailto:nhucanada0628@gmail.com"
            >
              <span className="sw-social-icon"><EmailIcon /></span>
              <div>
                <div className="sw-social-label">Email</div>
                <div className="sw-social-handle">nhucanada0628@gmail.com</div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareContactPage;

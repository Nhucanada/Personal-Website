import React, { useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../../styles/photography.css';

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const PhotographyContactPage: React.FC = () => {
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
    <div className="photo-site">
      <section className="photo-body photo-contact-layout">
        <div className="photo-contact-form-column">
          <form className="photo-contact-form" onSubmit={handleSubmit}>
            <div className="photo-name-row">
              <label className="photo-input-group">
                <span className="photo-input-label">First Name</span>
                <input
                  className="photo-input"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </label>
              <label className="photo-input-group">
                <span className="photo-input-label">Last Name</span>
                <input
                  className="photo-input"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  type="text"
                  required
                />
              </label>
            </div>
            <label className="photo-input-group">
              <span className="photo-input-label">Email</span>
              <input
                className="photo-input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                required
              />
            </label>
            <label className="photo-input-group">
              <span className="photo-input-label">Subject</span>
              <input
                className="photo-input"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                type="text"
                required
              />
            </label>
            <label className="photo-input-group">
              <span className="photo-input-label">Message</span>
              <textarea
                className="photo-input photo-textarea"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </label>
            <button type="submit" className="photo-submit">
              Submit
            </button>
          </form>
        </div>
        <div className="photo-contact-links-column">
          <a
            className="photo-social-link"
            href="https://www.instagram.com/nhucanada/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon fontSize="large" />
          </a>
          <a
            className="photo-social-link"
            href="https://www.linkedin.com/in/nhucanada/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon fontSize="large" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default PhotographyContactPage;

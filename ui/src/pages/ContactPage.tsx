import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
  Link
} from '@mui/material';
import {
  ContactMail as ContactIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  LocationOn as LocationIcon,
  Send as SendIcon
} from '@mui/icons-material';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactElement;
  label: string;
  value: string;
  link?: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const contactInfo: ContactInfo[] = [
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: 'nhucanada0628@gmail.com',
      link: 'mailto:nhucanada0628@gmail.com'
    },
    {
      icon: <EmailIcon />,
      label: 'McGill Email',
      value: 'nathan.hu@mail.mcgill.ca',
      link: 'mailto:nathan.hu@mail.mcgill.ca'
    },
    {
      icon: <LinkedInIcon />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/nhucanada',
      link: 'https://www.linkedin.com/in/nhucanada/'
    },
    {
      icon: <GitHubIcon />,
      label: 'GitHub',
      value: 'github.com/Nhucanada',
      link: 'https://github.com/Nhucanada'
    },
    {
      icon: <LocationIcon />,
      label: 'Location',
      value: 'Oakville, Ontario, Canada'
    }
  ];

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real application, you would send the form data to your backend
      console.log('Form submitted:', formData);

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <ContactIcon sx={{ mr: 2, fontSize: '2rem', color: 'primary.main' }} />
            <Typography variant="h3" component="h1">
              Contact Me
            </Typography>
          </Box>

          <Typography variant="body1" paragraph color="text.secondary">
            Feel free to contact me at nhucanada0628@gmail.com or nathan.hu@mail.mcgill.ca.
            I'm always interested in new opportunities, collaborations, and conversations about
            software development, DevOps, and machine learning!
          </Typography>

          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Send a Message
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="name"
                          label="Full Name"
                          fullWidth
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="email"
                          label="Email Address"
                          type="email"
                          fullWidth
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="subject"
                          label="Subject"
                          fullWidth
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="message"
                          label="Message"
                          multiline
                          rows={4}
                          fullWidth
                          required
                          value={formData.message}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          placeholder="Tell me about your project, opportunity, or just say hello!"
                        />
                      </Grid>
                    </Grid>

                    {submitStatus === 'success' && (
                      <Alert severity="success" sx={{ mt: 2 }}>
                        Thank you for your message! I'll get back to you soon.
                      </Alert>
                    )}

                    {submitStatus === 'error' && (
                      <Alert severity="error" sx={{ mt: 2 }}>
                        Sorry, there was an error sending your message. Please try again or contact me directly.
                      </Alert>
                    )}

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : <SendIcon />}
                        disabled={!isFormValid || isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Get in Touch
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Connect with me through these professional networks:
                  </Typography>
                  <List>
                    {contactInfo.map((contact, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: 'primary.main' }}>
                          {contact.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={contact.label}
                          secondary={
                            contact.link ? (
                              <Link
                                href={contact.link}
                                target={contact.link.startsWith('http') ? '_blank' : undefined}
                                rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                underline="hover"
                              >
                                {contact.value}
                              </Link>
                            ) : (
                              contact.value
                            )
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              <Card elevation={2} sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Professional Networks
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Connect with me on LinkedIn to discuss opportunities and collaborations.
                    Check out my GitHub profile to see my latest projects and code.
                  </Typography>
                </CardContent>
              </Card>

              <Card elevation={2} sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Let's Connect
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Whether you're looking to discuss a project, explore collaboration opportunities,
                    or just want to chat about technology, I'd love to hear from you.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<LinkedInIcon />}
                      component={Link}
                      href="https://www.linkedin.com/in/nhucanada/"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      component={Link}
                      href="https://github.com/Nhucanada"
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                    >
                      GitHub
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ContactPage;
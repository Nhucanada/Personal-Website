import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ContactPage from './ContactPage';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>,
  );
};

describe('ContactPage', () => {
  test('renders main heading', () => {
    renderWithTheme(<ContactPage />);
    expect(screen.getByRole('heading', { level: 1, name: /contact me/i })).toBeInTheDocument();
  });

  test('displays contact form', () => {
    renderWithTheme(<ContactPage />);
    expect(screen.getByRole('heading', { name: /send a message/i })).toBeInTheDocument();

    // Check form fields
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  test('displays contact information', () => {
    renderWithTheme(<ContactPage />);
    expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();

    // Check contact info items (allowing multiple occurrences)
    expect(screen.getAllByText(/Email/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/nhucanada0628@gmail.com/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/nathan.hu@mail.mcgill.ca/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/LinkedIn/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/GitHub/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Location/i).length).toBeGreaterThan(0);
  });

  test('form validation works correctly', () => {
    renderWithTheme(<ContactPage />);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Button should be disabled when form is empty
    expect(submitButton).toBeDisabled();
  });

  test('enables submit button when form is filled', () => {
    renderWithTheme(<ContactPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message content' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    expect(submitButton).toBeEnabled();
  });

  test('handles form submission', async () => {
    renderWithTheme(<ContactPage />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/subject/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message content' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Should show loading state
    expect(screen.getByText(/sending.../i)).toBeInTheDocument();

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('displays professional networks information', () => {
    renderWithTheme(<ContactPage />);
    expect(screen.getAllByText(/Professional Networks/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Connect with me on LinkedIn/i).length).toBeGreaterThan(0);
  });

  test('shows social media links', () => {
    renderWithTheme(<ContactPage />);
    const linkedinLinks = screen.getAllByText(/LinkedIn/i);
    const githubLinks = screen.getAllByText(/GitHub/i);

    expect(linkedinLinks.length).toBeGreaterThan(0);
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  test('has proper form accessibility', () => {
    renderWithTheme(<ContactPage />);

    // Check that form elements are properly labeled
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/subject/i)).toHaveAttribute('required');
    expect(screen.getByLabelText(/message/i)).toHaveAttribute('required');
  });

  test('renders contact cards with proper structure', () => {
    renderWithTheme(<ContactPage />);
    const cards = document.querySelectorAll('.MuiCard-root');
    expect(cards.length).toBeGreaterThan(0);
  });

  test('form clears after successful submission', async () => {
    renderWithTheme(<ContactPage />);

    const nameField = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailField = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const subjectField = screen.getByLabelText(/subject/i) as HTMLInputElement;
    const messageField = screen.getByLabelText(/message/i) as HTMLInputElement;

    // Fill out the form
    fireEvent.change(nameField, { target: { value: 'John Doe' } });
    fireEvent.change(emailField, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectField, { target: { value: 'Test Subject' } });
    fireEvent.change(messageField, { target: { value: 'Test message content' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    // Wait for success and form reset
    await waitFor(() => {
      expect(nameField.value).toBe('');
    }, { timeout: 3000 });

    expect(emailField.value).toBe('');
    expect(subjectField.value).toBe('');
    expect(messageField.value).toBe('');
  });
});

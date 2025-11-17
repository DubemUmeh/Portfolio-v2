// Contact form validation schema
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const validateContactForm = (data: ContactFormData) => {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Name must be less than 100 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = "Subject is required";
  } else if (data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  } else if (data.subject.trim().length > 200) {
    errors.subject = "Subject must be less than 200 characters";
  }

  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  } else if (data.message.trim().length > 5000) {
    errors.message = "Message must be less than 5000 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove < and >
    .slice(0, 5000); // Limit length
};

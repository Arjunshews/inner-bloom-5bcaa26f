import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Get these values from your EmailJS dashboard: https://dashboard.emailjs.com
export const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',      // Replace with your EmailJS service ID
  templateId: 'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
  publicKey: 'YOUR_PUBLIC_KEY',      // Replace with your EmailJS public key
};

// Initialize EmailJS
export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

// Send email using EmailJS
export const sendEmail = async (templateParams) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return { success: false, error };
  }
};

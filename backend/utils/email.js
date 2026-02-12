import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send contact form notification
export const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission - Hotel Chandamama',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        ${contactData.email ? `<p><strong>Email:</strong> ${contactData.email}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${contactData.message}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send catering enquiry notification
export const sendCateringNotification = async (cateringData) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Catering Enquiry - Hotel Chandamama',
      html: `
        <h2>New Catering Enquiry</h2>
        <p><strong>Name:</strong> ${cateringData.name}</p>
        <p><strong>Phone:</strong> ${cateringData.phone}</p>
        ${cateringData.email ? `<p><strong>Email:</strong> ${cateringData.email}</p>` : ''}
        ${cateringData.eventDate ? `<p><strong>Event Date:</strong> ${new Date(cateringData.eventDate).toLocaleDateString()}</p>` : ''}
        ${cateringData.guestCount ? `<p><strong>Guest Count:</strong> ${cateringData.guestCount}</p>` : ''}
        ${cateringData.eventType ? `<p><strong>Event Type:</strong> ${cateringData.eventType}</p>` : ''}
        <p><strong>Requirements:</strong></p>
        <p>${cateringData.requirements || cateringData.message}</p>
        <p><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

// Send order confirmation
export const sendOrderConfirmation = async (orderData) => {
  try {
    if (!orderData.customerEmail) return { success: false };

    const transporter = createTransporter();

    const itemsList = orderData.items.map(item => 
      `<li>${item.name} x ${item.quantity} - ₹${item.subtotal}</li>`
    ).join('');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: orderData.customerEmail,
      subject: `Order Confirmation - ${orderData.orderNumber}`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Dear ${orderData.customerName},</p>
        <p>Your order has been received and is being processed.</p>
        
        <h3>Order Details:</h3>
        <p><strong>Order Number:</strong> ${orderData.orderNumber}</p>
        <p><strong>Order Type:</strong> ${orderData.orderType}</p>
        
        <h3>Items:</h3>
        <ul>${itemsList}</ul>
        
        <h3>Total: ₹${orderData.totalAmount}</h3>
        
        <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
        <p><strong>Status:</strong> ${orderData.status}</p>
        
        ${orderData.notes ? `<p><strong>Notes:</strong> ${orderData.notes}</p>` : ''}
        
        <p>We'll notify you when your order is ready.</p>
        
        <p>Thank you for choosing Hotel Chandamama!</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};

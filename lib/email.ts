import { Resend } from 'resend';
import { IBooking } from '@/models/Booking';
import { IRoom } from '@/models/Room';

const resend = new Resend(process.env.RESEND_API_KEY);

interface BookingEmailData {
  booking: IBooking;
  room: IRoom;
}

export async function sendBookingConfirmationEmail({ booking, room }: BookingEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  const checkInDate = new Date(booking.checkInDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const checkOutDate = new Date(booking.checkOutDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const nights = Math.ceil(
    (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) /
    (1000 * 60 * 60 * 24)
  );

  const guestEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Villa Shanti</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .total { background: #FF6B35; color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 18px; font-weight: bold; }
        .footer { text-align: center; margin-top: 30px; color: #666; }
        .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏨 Villa Shanti</h1>
          <h2>Booking Confirmation</h2>
          <p>Thank you for choosing Villa Shanti!</p>
        </div>
        
        <div class="content">
          <p>Dear ${booking.name},</p>
          
          <p>We're delighted to confirm your reservation at Villa Shanti. Your booking details are below:</p>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span><strong>Booking ID:</strong></span>
              <span>${booking.bookingId}</span>
            </div>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${room.name}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${checkInDate}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${checkOutDate}</span>
            </div>
            <div class="detail-row">
              <span><strong>Nights:</strong></span>
              <span>${nights}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guests:</strong></span>
              <span>${booking.numberOfGuests}</span>
            </div>
            ${booking.specialRequest ? `
            <div class="detail-row">
              <span><strong>Special Request:</strong></span>
              <span>${booking.specialRequest}</span>
            </div>
            ` : ''}
          </div>
          
          <div class="total">
            Total Amount: $${booking.totalAmount}
          </div>
          
          <h3>What's Next?</h3>
          <ul>
            <li>You'll receive a payment link shortly to complete your reservation</li>
            <li>Check-in time: 3:00 PM</li>
            <li>Check-out time: 11:00 AM</li>
            <li>Free cancellation up to 24 hours before check-in</li>
          </ul>
          
          <h3>Contact Information</h3>
          <p>
            <strong>Villa Shanti</strong><br>
            14 Suffren Street, White Town<br>
            Puducherry, India 605001<br>
            Phone: +91 413 233 9999<br>
            Email: info@villashanti.com
          </p>
          
          <div class="footer">
            <p>We look forward to welcoming you to Villa Shanti!</p>
            <p><em>Experience luxury and tranquility in our heritage property</em></p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const hotelEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Booking - Villa Shanti</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .alert { background: #e74c3c; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏨 Villa Shanti - New Booking</h1>
          <p>Booking ID: ${booking.bookingId}</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>Action Required:</strong> New booking received - Please review and confirm
          </div>
          
          <div class="booking-details">
            <h3>Guest Information</h3>
            <div class="detail-row">
              <span><strong>Name:</strong></span>
              <span>${booking.name}</span>
            </div>
            <div class="detail-row">
              <span><strong>Email:</strong></span>
              <span>${booking.email}</span>
            </div>
            <div class="detail-row">
              <span><strong>Phone:</strong></span>
              <span>${booking.phone}</span>
            </div>
          </div>
          
          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span><strong>Room:</strong></span>
              <span>${room.name} (${room.roomId})</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-in:</strong></span>
              <span>${checkInDate}</span>
            </div>
            <div class="detail-row">
              <span><strong>Check-out:</strong></span>
              <span>${checkOutDate}</span>
            </div>
            <div class="detail-row">
              <span><strong>Nights:</strong></span>
              <span>${nights}</span>
            </div>
            <div class="detail-row">
              <span><strong>Guests:</strong></span>
              <span>${booking.numberOfGuests}</span>
            </div>
            <div class="detail-row">
              <span><strong>Total Amount:</strong></span>
              <span>$${booking.totalAmount}</span>
            </div>
            ${booking.specialRequest ? `
            <div class="detail-row">
              <span><strong>Special Request:</strong></span>
              <span>${booking.specialRequest}</span>
            </div>
            ` : ''}
          </div>
          
          <p><strong>Status:</strong> ${booking.status}</p>
          <p><strong>Payment Status:</strong> ${booking.paymentStatus}</p>
          <p><strong>Booking Time:</strong> ${new Date(booking.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send confirmation email to guest
    const guestEmail = await resend.emails.send({
      from: 'Villa Shanti <bookings@villashanti.com>',
      to: [booking.email],
      subject: `Booking Confirmation - ${booking.bookingId}`,
      html: guestEmailHtml,
    });

    // Send notification email to hotel
    const hotelEmail = await resend.emails.send({
      from: 'Villa Shanti <bookings@villashanti.com>',
      to: ['reservations@villashanti.com'],
      subject: `New Booking - ${booking.bookingId}`,
      html: hotelEmailHtml,
    });

    return {
      success: true,
      guestEmailId: guestEmail.data?.id,
      hotelEmailId: hotelEmail.data?.id
    };

  } catch (error) {
    console.error('Error sending booking emails:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send emails'
    };
  }
}

export async function sendContactFormEmail(contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured, skipping email');
    return { success: false, error: 'Email service not configured' };
  }

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Form Submission - Villa Shanti</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .contact-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .message-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #FF6B35; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏨 Villa Shanti - Contact Form</h1>
          <p>New message received</p>
        </div>
        
        <div class="content">
          <div class="contact-details">
            <h3>Contact Information</h3>
            <div class="detail-row">
              <strong>Name:</strong> ${contactData.name}
            </div>
            <div class="detail-row">
              <strong>Email:</strong> ${contactData.email}
            </div>
            <div class="detail-row">
              <strong>Subject:</strong> ${contactData.subject}
            </div>
            <div class="detail-row">
              <strong>Submitted:</strong> ${new Date().toLocaleString()}
            </div>
          </div>
          
          <div class="message-box">
            <h3>Message</h3>
            <p>${contactData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p><em>Please respond to this inquiry promptly.</em></p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: 'Villa Shanti <contact@villashanti.com>',
      to: ['dhiwagar555@gmail.com'],
      replyTo: contactData.email,
      subject: `Contact Form: ${contactData.subject}`,
      html: emailHtml,
    });

    return {
      success: true,
      emailId: result.data?.id
    };

  } catch (error) {
    console.error('Error sending contact email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}
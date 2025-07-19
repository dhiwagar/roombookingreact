import { IBooking } from '@/models/Booking';
import { IRoom } from '@/models/Room';

export function generateBookingId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `VS-${timestamp}-${randomStr}`.toUpperCase();
}

export function calculateTotalAmount(
  room: IRoom, 
  checkInDate: Date, 
  checkOutDate: Date
): number {
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return room.price * nights;
}

export function validateBookingDates(
  checkInDate: Date, 
  checkOutDate: Date
): { isValid: boolean; error?: string } {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  if (checkInDate < today) {
    return { isValid: false, error: 'Check-in date cannot be in the past' };
  }
  
  if (checkOutDate <= checkInDate) {
    return { isValid: false, error: 'Check-out date must be after check-in date' };
  }
  
  const maxAdvanceBooking = new Date();
  maxAdvanceBooking.setFullYear(maxAdvanceBooking.getFullYear() + 1);
  
  if (checkInDate > maxAdvanceBooking) {
    return { isValid: false, error: 'Cannot book more than 1 year in advance' };
  }
  
  return { isValid: true };
}

export function isRoomAvailable(
  existingBookings: IBooking[],
  checkInDate: Date,
  checkOutDate: Date
): boolean {
  return !existingBookings.some(booking => {
    if (booking.status === 'cancelled') return false;
    
    const bookingCheckIn = new Date(booking.checkInDate);
    const bookingCheckOut = new Date(booking.checkOutDate);
    
    // Check for date overlap
    return (
      (checkInDate >= bookingCheckIn && checkInDate < bookingCheckOut) ||
      (checkOutDate > bookingCheckIn && checkOutDate <= bookingCheckOut) ||
      (checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut)
    );
  });
}

export function formatBookingConfirmation(booking: IBooking, room: IRoom) {
  const nights = Math.ceil(
    (new Date(booking.checkOutDate).getTime() - new Date(booking.checkInDate).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  return {
    bookingId: booking.bookingId,
    guestName: booking.name,
    roomName: room.name,
    checkIn: booking.checkInDate.toLocaleDateString(),
    checkOut: booking.checkOutDate.toLocaleDateString(),
    nights,
    guests: booking.numberOfGuests,
    totalAmount: booking.totalAmount,
    specialRequest: booking.specialRequest
  };
}
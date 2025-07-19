'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, Phone, Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';
import { toast } from 'sonner';

interface Room {
  roomId: string;
  name: string;
  price: number;
  maxGuests: number;
  type: string;
  description: string;
}

interface BookingFormProps {
  roomId?: string;
  roomName?: string;
  roomPrice?: number;
  onSuccess?: (booking: any) => void;
}

export function BookingForm({ roomId, roomName, roomPrice, onSuccess }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomId: roomId || '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 2,
    specialRequest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loadingRooms, setLoadingRooms] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { t } = useLanguage();

  // Fetch available rooms
  useEffect(() => {
    if (!roomId) {
      fetchRooms();
    } else if (roomPrice && roomName) {
      setSelectedRoom({
        roomId,
        name: roomName,
        price: roomPrice,
        maxGuests: 2,
        type: 'standard',
        description: ''
      });
    }
  }, [roomId, roomName, roomPrice]);

  const fetchRooms = async () => {
    setLoadingRooms(true);
    try {
      const response = await fetch('/api/rooms');
      const result = await response.json();

      if (result.success) {
        setRooms(result.data);
      } else {
        toast.error('Failed to load rooms');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setLoadingRooms(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Booking created successfully! Check your email for confirmation.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          roomId: roomId || '',
          checkInDate: '',
          checkOutDate: '',
          numberOfGuests: 2,
          specialRequest: ''
        });
        onSuccess?.(result.data);
      } else {
        toast.error(result.error || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred while creating the booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Update selected room when room selection changes
    if (field === 'roomId') {
      const room = rooms.find(r => r.roomId === value);
      setSelectedRoom(room || null);
    }
  };

  const calculateNights = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const diffTime = checkOut.getTime() - checkIn.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const currentRoomPrice = selectedRoom?.price || roomPrice || 0;
  const totalAmount = currentRoomPrice * calculateNights();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl gradient-text">
          {roomName ? `Book ${roomName}` : 'Book Your Stay'}
        </CardTitle>
        {currentRoomPrice > 0 && (
          <p className="text-lg text-gray-600 dark:text-gray-300">
            ${currentRoomPrice} per night
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t('name')} *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t('email')} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {t('phone')} *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              required
              placeholder="+1234567890"
            />
          </div>

          {/* Room Selection */}
          {!roomId && (
            <div className="space-y-2">
              <Label htmlFor="roomId">Room *</Label>
              <Select value={formData.roomId} onValueChange={(value) => handleChange('roomId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingRooms ? "Loading rooms..." : "Select a room"} />
                </SelectTrigger>
                <SelectContent>
                  {loadingRooms ? (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading rooms...
                    </div>
                  ) : (
                    rooms.map(room => (
                      <SelectItem key={room.roomId} value={room.roomId}>
                        {room.name} - ${room.price}/night (Max: {room.maxGuests} guests)
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Dates and Guests */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkInDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('checkIn')} *
              </Label>
              <Input
                id="checkInDate"
                type="date"
                value={formData.checkInDate}
                onChange={(e) => handleChange('checkInDate', e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkOutDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t('checkOut')} *
              </Label>
              <Input
                id="checkOutDate"
                type="date"
                value={formData.checkOutDate}
                onChange={(e) => handleChange('checkOutDate', e.target.value)}
                required
                min={formData.checkInDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="numberOfGuests" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t('guests')} *
              </Label>
              <Select
                value={formData.numberOfGuests.toString()}
                onValueChange={(value) => handleChange('numberOfGuests', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: selectedRoom?.maxGuests || 6 }, (_, i) => i + 1).map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequest" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Special Requests
            </Label>
            <Textarea
              id="specialRequest"
              value={formData.specialRequest}
              onChange={(e) => handleChange('specialRequest', e.target.value)}
              placeholder="Any special requests or requirements..."
              rows={3}
            />
          </div>

          {/* Booking Summary */}
          {formData.checkInDate && formData.checkOutDate && currentRoomPrice > 0 && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Booking Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Room:</span>
                  <span>{selectedRoom?.name || roomName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nights:</span>
                  <span>{calculateNights()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate per night:</span>
                  <span>${currentRoomPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>{formData.numberOfGuests}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-coral-500">${totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="btn-primary w-full"
            disabled={isSubmitting || !formData.roomId}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Booking...
              </>
            ) : (
              'Book Now'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
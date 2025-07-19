'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookingForm } from '@/components/booking-form';
import { useLanguage } from '@/hooks/use-language';

export default function BookPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              Book Your Stay
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Complete your reservation at Villa Shanti
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <BookPageContent />
    </Suspense>
  );
}

function BookPageContent() {
  const searchParams = useSearchParams();
  const [roomData, setRoomData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const roomId = mounted ? searchParams.get('roomId') : null;

  useEffect(() => {
    if (roomId && mounted) {
      fetchRoomData(roomId);
    }
  }, [roomId, mounted]);

  const fetchRoomData = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/rooms/${id}`);
      const result = await response.json();

      if (result.success) {
        setRoomData(result.data);
      }
    } catch (error) {
      console.error('Error fetching room data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = (booking: any) => {
    // Redirect to confirmation page or show success message
    console.log('Booking successful:', booking);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            {t('book')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Complete your reservation at Villa Shanti
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading room details...</p>
          </div>
        ) : (
          <BookingForm
            roomId={roomData?.roomId}
            roomName={roomData?.name}
            roomPrice={roomData?.price}
            onSuccess={handleBookingSuccess}
          />
        )}
      </div>
    </div>
  );
}
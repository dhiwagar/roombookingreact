import { HeroSection } from '@/components/hero-section';
import { BookingWidget } from '@/components/booking-widget';
import { RoomsSection } from '@/components/rooms-section';
import { RestaurantSection } from '@/components/restaurant-section';
import { GallerySection } from '@/components/gallery-section';
import { NewsSection } from '@/components/news-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="px-4 sm:px-6 lg:px-8">
        <BookingWidget />
      </div>
      <RoomsSection />
      {/* <RestaurantSection /> */}
      <GallerySection />
      {/* <NewsSection /> */}
    </>
  );
}
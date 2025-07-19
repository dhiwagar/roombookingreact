'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

const galleryImages = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'exterior',
    title: 'Heritage Facade',
    description: 'The beautiful colonial architecture of Villa Shanti'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'rooms',
    title: 'Deluxe Room',
    description: 'Spacious and elegantly furnished guest rooms'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/210265/pexels-photo-210265.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'restaurant',
    title: 'Fine Dining',
    description: 'Exquisite culinary experiences in our restaurant'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'rooms',
    title: 'Premium Suite',
    description: 'Luxurious suites with traditional charm'
  },
  {
    id: 5,
    url: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'restaurant',
    title: 'Local Cuisine',
    description: 'Authentic South Indian flavors and international dishes'
  },
  {
    id: 6,
    url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'amenities',
    title: 'Garden View',
    description: 'Peaceful garden spaces and outdoor areas'
  },
  {
    id: 7,
    url: 'https://images.pexels.com/photos/1308524/pexels-photo-1308524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'amenities',
    title: 'Wellness Center',
    description: 'Spa and wellness facilities for relaxation'
  },
  {
    id: 8,
    url: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'restaurant',
    title: 'Fresh Seafood',
    description: 'Daily catch from local fishermen'
  },
  {
    id: 9,
    url: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    category: 'exterior',
    title: 'Courtyard',
    description: 'Traditional courtyard with modern amenities'
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'exterior', name: 'Exterior' },
  { id: 'rooms', name: 'Rooms' },
  { id: 'restaurant', name: 'Restaurant' },
  { id: 'amenities', name: 'Amenities' }
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useLanguage();

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('galleryTitle')}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('gallerySubtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-coral-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-coral-100 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="relative overflow-hidden rounded-lg cursor-pointer hover-lift group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                  <h4 className="font-bold text-lg mb-2">{image.title}</h4>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <img
              src={filteredImages[selectedImage].url}
              alt={filteredImages[selectedImage].title}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
              <h4 className="font-bold text-xl">{filteredImages[selectedImage].title}</h4>
              <p className="text-sm opacity-75 mb-2">{filteredImages[selectedImage].description}</p>
              <p className="text-xs opacity-60">
                {selectedImage + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
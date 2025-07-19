'use client';

import { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Filter, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';

const newsArticles = [
  {
    id: 1,
    title: 'Villa Shanti Wins Heritage Hotel of the Year Award',
    slug: 'heritage-hotel-award-2024',
    excerpt: 'We are thrilled to announce that Villa Shanti has been recognized as the Heritage Hotel of the Year 2024 by the Indian Heritage Hotels Association.',
    content: `We are absolutely delighted to share that Villa Shanti has been honored with the prestigious "Heritage Hotel of the Year 2024" award by the Indian Heritage Hotels Association. This recognition celebrates our commitment to preserving the rich cultural heritage of Puducherry while providing world-class hospitality.

The award ceremony took place in New Delhi, where our General Manager received the honor on behalf of our entire team. This achievement reflects the dedication of our staff and the trust our guests have placed in us over the years.

Our heritage property, originally built in the 18th century, has been meticulously restored to maintain its colonial charm while incorporating modern amenities. The award specifically recognized our efforts in:

- Preserving original architectural elements
- Sustainable tourism practices
- Cultural heritage programs for guests
- Community engagement initiatives
- Excellence in hospitality services

We extend our heartfelt gratitude to all our guests, partners, and team members who have made this achievement possible. This award motivates us to continue our mission of providing authentic heritage experiences while contributing to the preservation of Puducherry's unique cultural identity.`,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    date: '2024-01-20',
    author: 'Villa Shanti Management',
    category: 'Awards',
    readTime: '3 min read',
    featured: true,
    tags: ['Award', 'Heritage', 'Recognition']
  },
  {
    id: 2,
    title: 'New Heritage Wing Opening - 10 Additional Luxury Suites',
    slug: 'new-heritage-wing-opening',
    excerpt: 'Experience enhanced luxury with our newly opened heritage wing featuring 10 additional suites that blend traditional architecture with contemporary comfort.',
    content: `We are excited to announce the grand opening of our new Heritage Wing, featuring 10 exquisitely designed luxury suites that represent the perfect marriage of traditional Puducherry architecture and contemporary luxury.

The new wing has been under construction for the past 18 months, with careful attention paid to preserving the authentic colonial aesthetic while incorporating modern amenities that today's discerning travelers expect.

Key Features of the New Heritage Wing:

**Architectural Excellence:**
- Restored 19th-century facade with original lime mortar
- Traditional Athangudi tiles throughout
- Antique wooden shutters and period furniture
- High ceilings with original wooden beams

**Modern Amenities:**
- Smart room controls and high-speed WiFi
- Luxury marble bathrooms with rain showers
- Individual climate control systems
- Premium bedding and furnishings

**Suite Categories:**
- 6 Heritage Deluxe Suites (45 sqm)
- 3 Heritage Premium Suites (60 sqm)
- 1 Presidential Heritage Suite (85 sqm)

Each suite offers unique views of either our heritage courtyard or the bustling streets of White Town. The Presidential Suite features a private terrace with panoramic views of the Bay of Bengal.

The opening ceremony will take place on February 1st, 2024, with special inaugural rates available for the first month. We invite you to experience the enhanced Villa Shanti and discover the perfect blend of heritage and luxury.`,
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    date: '2024-01-15',
    author: 'Architecture Team',
    category: 'Property Updates',
    readTime: '5 min read',
    featured: true,
    tags: ['Expansion', 'Luxury', 'Heritage']
  },
  {
    id: 3,
    title: 'Seasonal Menu Launch - Farm to Table Experience',
    slug: 'seasonal-menu-farm-to-table',
    excerpt: 'Our executive chef unveils a new seasonal menu featuring fresh local ingredients sourced directly from organic farms in the region.',
    content: `Chef Priya Krishnan, our Executive Chef, is proud to introduce Villa Shanti's new seasonal menu, emphasizing our commitment to sustainable dining and supporting local farmers.

The "Farm to Table" initiative connects us directly with organic farms within a 50-kilometer radius of Puducherry, ensuring the freshest ingredients while supporting the local agricultural community.

**Seasonal Highlights:**

**Appetizers:**
- Organic Beetroot Carpaccio with goat cheese and microgreens
- Coastal Prawns with curry leaves and coconut
- Heritage Tomato Bruschetta with basil oil

**Main Courses:**
- Chettinad Chicken with farm-fresh vegetables
- Grilled Pomfret with seasonal vegetables
- Quinoa Buddha Bowl with local organic produce

**Desserts:**
- Seasonal Fruit Tart with vanilla bean custard
- Traditional Payasam with organic jaggery
- Dark Chocolate Mousse with local honey

**Sustainability Initiatives:**
- Zero-waste kitchen practices
- Composting program for organic waste
- Seasonal ingredient sourcing
- Support for local farming communities

The menu changes quarterly to reflect seasonal availability and ensure peak freshness. Our sommelier has also curated wine pairings featuring organic and biodynamic wines that complement the seasonal flavors.

Join us for a culinary journey that celebrates the rich agricultural heritage of Tamil Nadu while supporting sustainable farming practices.`,
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    date: '2024-01-10',
    author: 'Chef Priya Krishnan',
    category: 'Culinary',
    readTime: '4 min read',
    featured: false,
    tags: ['Menu', 'Sustainability', 'Local']
  },
  {
    id: 4,
    title: 'Wellness Retreat Program - Mind, Body & Soul',
    slug: 'wellness-retreat-program',
    excerpt: 'Discover inner peace with our comprehensive wellness retreat program combining yoga, meditation, Ayurvedic treatments, and mindful living practices.',
    content: `Villa Shanti is pleased to introduce our comprehensive Wellness Retreat Program, designed to rejuvenate mind, body, and soul in the tranquil setting of our heritage property.

Developed in collaboration with renowned wellness experts and Ayurvedic practitioners, our retreat program offers a holistic approach to well-being that combines ancient wisdom with modern wellness practices.

**Program Components:**

**Daily Yoga & Meditation:**
- Morning Hatha Yoga sessions in our heritage courtyard
- Evening meditation by the fountain
- Pranayama (breathing exercises) workshops
- Yoga philosophy discussions

**Ayurvedic Treatments:**
- Personalized consultations with certified practitioners
- Traditional Abhyanga (oil massage) therapy
- Shirodhara (oil pouring) treatments
- Herbal steam baths and detox therapies

**Mindful Living Workshops:**
- Stress management techniques
- Mindful eating practices
- Digital detox guidance
- Work-life balance strategies

**Wellness Cuisine:**
- Sattvic meal preparations
- Detox juice cleanses
- Ayurvedic cooking classes
- Herbal tea ceremonies

**Retreat Packages:**

**Weekend Wellness (2 days/1 night):**
- 4 yoga sessions
- 2 Ayurvedic treatments
- Wellness consultation
- All meals included

**Week-long Transformation (7 days/6 nights):**
- Daily yoga and meditation
- Complete Ayurvedic assessment
- 8 therapeutic treatments
- Cooking workshops
- Personal wellness plan

**Monthly Immersion (30 days):**
- Comprehensive lifestyle transformation
- Daily treatments and sessions
- Personal wellness coach
- Long-term wellness planning

Our wellness center features a dedicated yoga pavilion, treatment rooms with garden views, and a meditation garden designed according to Vastu principles.

Bookings are now open for our inaugural retreats starting February 15th, 2024. Early bird discounts available for the first 50 participants.`,
    image: 'https://images.pexels.com/photos/1308524/pexels-photo-1308524.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    date: '2024-01-05',
    author: 'Wellness Team',
    category: 'Wellness',
    readTime: '6 min read',
    featured: false,
    tags: ['Wellness', 'Yoga', 'Ayurveda']
  },
  {
    id: 5,
    title: 'Cultural Heritage Festival - Celebrating Puducherry\'s Rich History',
    slug: 'cultural-heritage-festival',
    excerpt: 'Join us for a three-day cultural festival celebrating the unique Franco-Tamil heritage of Puducherry with art, music, dance, and culinary experiences.',
    content: `Villa Shanti proudly presents the inaugural Cultural Heritage Festival, a three-day celebration of Puducherry's unique Franco-Tamil heritage, taking place from March 15-17, 2024.

This festival aims to showcase the rich cultural tapestry that makes Puducherry unique, bringing together local artists, historians, musicians, and culinary experts to create an immersive cultural experience.

**Festival Highlights:**

**Day 1 - Historical Heritage:**
- Guided heritage walks through White Town
- Colonial architecture photography workshop
- Historical lecture series by local historians
- Traditional craft demonstrations

**Day 2 - Arts & Culture:**
- Classical Tamil dance performances
- French colonial music concerts
- Local artist exhibitions
- Poetry readings in Tamil and French

**Day 3 - Culinary Heritage:**
- Franco-Tamil fusion cooking demonstrations
- Traditional recipe sharing sessions
- Heritage food tasting tours
- Culinary history presentations

**Special Events:**

**Heritage Market:**
- Local artisan stalls
- Traditional handicrafts
- Vintage book collections
- Heritage photography exhibitions

**Cultural Workshops:**
- Pottery making with local artisans
- Traditional textile weaving
- French language basics
- Tamil calligraphy sessions

**Evening Performances:**
- Classical Bharatanatyam recitals
- French chanson performances
- Fusion music concerts
- Storytelling sessions

**Guest Speakers:**
- Dr. Kamala Devi - Heritage Conservation Expert
- Pierre Dubois - French Cultural Historian
- Meera Rajagopalan - Classical Dance Guru
- Chef Antoine Martin - Franco-Indian Cuisine Expert

The festival is open to hotel guests and the general public, with special packages available for those wishing to stay at Villa Shanti during the festival period.

Registration is now open with early bird pricing available until February 15th. Join us in celebrating the unique cultural heritage that makes Puducherry a truly special destination.`,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    date: '2023-12-28',
    author: 'Cultural Events Team',
    category: 'Events',
    readTime: '5 min read',
    featured: false,
    tags: ['Culture', 'Festival', 'Heritage']
  },
  {
    id: 6,
    title: 'Sustainability Initiative - Going Carbon Neutral by 2025',
    slug: 'sustainability-carbon-neutral-2025',
    excerpt: 'Villa Shanti announces ambitious sustainability goals including carbon neutrality by 2025 through renewable energy, waste reduction, and conservation programs.',
    content: `Villa Shanti is proud to announce our comprehensive sustainability initiative with the ambitious goal of achieving carbon neutrality by 2025, reinforcing our commitment to environmental stewardship and sustainable tourism.

Our sustainability roadmap encompasses energy efficiency, waste reduction, water conservation, and community engagement, setting new standards for heritage hospitality in India.

**Key Sustainability Initiatives:**

**Renewable Energy Transition:**
- Installation of 100kW solar panel system
- LED lighting conversion throughout the property
- Energy-efficient HVAC systems
- Smart energy management systems

**Waste Reduction Program:**
- Zero single-use plastic policy
- Comprehensive recycling program
- Organic waste composting facility
- Partnerships with local waste management cooperatives

**Water Conservation:**
- Rainwater harvesting systems
- Greywater recycling for gardens
- Low-flow fixtures and smart irrigation
- Guest education programs

**Sustainable Sourcing:**
- Local supplier preference program
- Organic and fair-trade product sourcing
- Seasonal menu planning to reduce food miles
- Support for local artisan communities

**Carbon Offset Programs:**
- Tree plantation drives in local communities
- Support for renewable energy projects
- Carbon footprint tracking and reporting
- Guest carbon offset options

**Community Engagement:**
- Environmental education programs
- Local school sustainability workshops
- Beach and heritage site cleanup drives
- Support for local conservation projects

**Certifications and Partnerships:**
- Green Key certification process
- Partnership with WWF India
- Collaboration with local environmental NGOs
- Participation in sustainable tourism networks

**Progress Tracking:**
We will publish quarterly sustainability reports tracking our progress toward carbon neutrality, including:
- Energy consumption reduction metrics
- Waste diversion rates
- Water usage optimization
- Carbon footprint measurements

**Guest Participation:**
Guests can participate in our sustainability efforts through:
- Optional towel and linen reuse programs
- Participation in local conservation activities
- Carbon offset options for travel
- Educational workshops and nature walks

Our sustainability initiative reflects our belief that luxury hospitality and environmental responsibility can coexist harmoniously. We invite our guests to join us on this journey toward a more sustainable future.

For detailed information about our sustainability practices and how you can contribute, visit our dedicated sustainability page or speak with our Green Team members during your stay.`,
    image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    date: '2023-12-20',
    author: 'Sustainability Team',
    category: 'Sustainability',
    readTime: '7 min read',
    featured: false,
    tags: ['Sustainability', 'Environment', 'Carbon Neutral']
  }
];

const categories = [
  { id: 'all', name: 'All News' },
  { id: 'Awards', name: 'Awards' },
  { id: 'Property Updates', name: 'Property Updates' },
  { id: 'Culinary', name: 'Culinary' },
  { id: 'Wellness', name: 'Wellness' },
  { id: 'Events', name: 'Events' },
  { id: 'Sustainability', name: 'Sustainability' }
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const { t } = useLanguage();

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openArticle = (articleId: number) => {
    setSelectedArticle(articleId);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  const selectedArticleData = selectedArticle ? newsArticles.find(a => a.id === selectedArticle) : null;

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-coral-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('newsTitle')}</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {t('newsSubtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-64">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 gradient-text">Featured News</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="hover-lift overflow-hidden cursor-pointer" onClick={() => openArticle(article.id)}>
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-coral-500 text-white">
                      Featured
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                      {article.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="group">
                      {t('readMore')}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section>
          <h2 className="text-3xl font-bold mb-8 gradient-text">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularArticles.map((article) => (
              <Card key={article.id} className="hover-lift overflow-hidden cursor-pointer" onClick={() => openArticle(article.id)}>
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-800">
                    {article.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="group">
                    {t('readMore')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No articles found</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Article Modal */}
      {selectedArticleData && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedArticleData.image}
                alt={selectedArticleData.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <button
                onClick={closeArticle}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 right-4">
                <Badge className="bg-coral-500 text-white mb-2">
                  {selectedArticleData.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {selectedArticleData.title}
                </h1>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedArticleData.date)}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {selectedArticleData.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedArticleData.readTime}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedArticleData.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                {selectedArticleData.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith(':**')) {
                    return (
                      <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-coral-500">
                        {paragraph.replace(/\*\*/g, '').replace(':', '')}
                      </h3>
                    );
                  } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h4 key={index} className="text-lg font-semibold mt-4 mb-2">
                        {paragraph.replace(/\*\*/g, '')}
                      </h4>
                    );
                  } else if (paragraph.startsWith('- ')) {
                    const listItems = paragraph.split('\n').filter(item => item.startsWith('- '));
                    return (
                      <ul key={index} className="list-disc list-inside space-y-1 mb-4">
                        {listItems.map((item, itemIndex) => (
                          <li key={itemIndex}>{item.substring(2)}</li>
                        ))}
                      </ul>
                    );
                  } else {
                    return (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  }
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button onClick={closeArticle} className="btn-primary">
                  Close Article
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/hooks/use-language';
import { useRouter } from 'next/navigation';

export function BookingWidget() {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const { t } = useLanguage();
  const router = useRouter();

  const handleSearch = () => {
    // Navigate to rooms page with search parameters
    const params = new URLSearchParams();
    if (checkIn) params.append('checkIn', checkIn);
    if (checkOut) params.append('checkOut', checkOut);
    if (guests) params.append('guests', guests);

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <Card className="glass-card shadow-2xl max-w-4xl mx-auto -mt-16 relative z-10">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold text-center mb-6 gradient-text">
          {t('bookingTitle')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t('checkIn')}
            </Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {t('checkOut')}
            </Label>
            <Input
              id="checkout"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {t('guests')}
            </Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger>
                <SelectValue placeholder="Select guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Guest</SelectItem>
                <SelectItem value="2">2 Guests</SelectItem>
                <SelectItem value="3">3 Guests</SelectItem>
                <SelectItem value="4">4 Guests</SelectItem>
                <SelectItem value="5">5+ Guests</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={handleSearch} className="btn-primary w-full">
              <Search className="w-4 h-4 mr-2" />
              {t('search')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
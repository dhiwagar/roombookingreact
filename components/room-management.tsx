'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface Room {
  _id: string;
  roomId: string;
  name: string;
  type: 'deluxe' | 'suite' | 'premium' | 'standard';
  price: number;
  maxGuests: number;
  size: string;
  amenities: string[];
  images: string[];
  description: string;
  features: string[];
  isAvailable: boolean;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export function RoomManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [roomForm, setRoomForm] = useState({
    name: '',
    type: 'standard' as Room['type'],
    price: 0,
    maxGuests: 2,
    size: '',
    amenities: [''],
    images: [''],
    description: '',
    features: [''],
    isAvailable: true,
    rating: 4.5
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/rooms');
      const data = await response.json();

      if (data.success) {
        setRooms(data.data);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleRoomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingRoom
        ? `/api/rooms/${editingRoom._id}`
        : '/api/rooms';

      const method = editingRoom ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...roomForm,
          amenities: roomForm.amenities.filter(a => a.trim()),
          images: roomForm.images.filter(i => i.trim()),
          features: roomForm.features.filter(f => f.trim())
        })
      });

      const result = await response.json();
      if (result.success) {
        toast.success(editingRoom ? 'Room updated successfully' : 'Room added successfully');
        setShowRoomForm(false);
        resetRoomForm();
        fetchRooms();
      } else {
        toast.error('Failed to save room');
      }
    } catch (error) {
      console.error('Error saving room:', error);
      toast.error('Failed to save room');
    }
  };

  const deleteRoom = async (roomId: string) => {
    if (!confirm('Are you sure you want to delete this room?')) return;

    try {
      const response = await fetch(`/api/rooms/${roomId}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Room deleted successfully');
        fetchRooms();
      } else {
        toast.error('Failed to delete room');
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      toast.error('Failed to delete room');
    }
  };

  const editRoom = (room: Room) => {
    setEditingRoom(room);
    setRoomForm({
      name: room.name,
      type: room.type,
      price: room.price,
      maxGuests: room.maxGuests,
      size: room.size,
      amenities: room.amenities.length > 0 ? room.amenities : [''],
      images: room.images.length > 0 ? room.images : [''],
      description: room.description,
      features: room.features.length > 0 ? room.features : [''],
      isAvailable: room.isAvailable,
      rating: room.rating
    });
    setShowRoomForm(true);
  };

  const resetRoomForm = () => {
    setRoomForm({
      name: '',
      type: 'standard',
      price: 0,
      maxGuests: 2,
      size: '',
      amenities: [''],
      images: [''],
      description: '',
      features: [''],
      isAvailable: true,
      rating: 4.5
    });
    setEditingRoom(null);
  };

  const addArrayField = (field: 'amenities' | 'images' | 'features') => {
    setRoomForm(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateArrayField = (field: 'amenities' | 'images' | 'features', index: number, value: string) => {
    setRoomForm(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const removeArrayField = (field: 'amenities' | 'images' | 'features', index: number) => {
    setRoomForm(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500"></div>
        <span className="ml-2">Loading rooms...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Room Management</h3>
        <Dialog open={showRoomForm} onOpenChange={setShowRoomForm}>
          <DialogTrigger asChild>
            <Button onClick={() => resetRoomForm()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRoomSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Room Name</Label>
                  <Input
                    id="name"
                    value={roomForm.name}
                    onChange={(e) => setRoomForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Room Type</Label>
                  <Select
                    value={roomForm.type}
                    onValueChange={(value: Room['type']) => setRoomForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price per Night</Label>
                  <Input
                    id="price"
                    type="number"
                    value={roomForm.price}
                    onChange={(e) => setRoomForm(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxGuests">Max Guests</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    min="1"
                    max="10"
                    value={roomForm.maxGuests}
                    onChange={(e) => setRoomForm(prev => ({ ...prev, maxGuests: parseInt(e.target.value) || 1 }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="size">Room Size</Label>
                  <Input
                    id="size"
                    value={roomForm.size}
                    onChange={(e) => setRoomForm(prev => ({ ...prev, size: e.target.value }))}
                    placeholder="e.g., 25m²"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={roomForm.description}
                  onChange={(e) => setRoomForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label>Amenities</Label>
                {roomForm.amenities.map((amenity, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={amenity}
                      onChange={(e) => updateArrayField('amenities', index, e.target.value)}
                      placeholder="e.g., WiFi, TV, Air Conditioning"
                    />
                    {roomForm.amenities.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('amenities', index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayField('amenities')}
                >
                  Add Amenity
                </Button>
              </div>

              <div>
                <Label>Features</Label>
                {roomForm.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateArrayField('features', index, e.target.value)}
                      placeholder="e.g., Ocean View, Balcony"
                    />
                    {roomForm.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('features', index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayField('features')}
                >
                  Add Feature
                </Button>
              </div>

              <div>
                <Label>Image URLs</Label>
                {roomForm.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={image}
                      onChange={(e) => updateArrayField('images', index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                    {roomForm.images.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('images', index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayField('images')}
                >
                  Add Image URL
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={roomForm.rating}
                    onChange={(e) => setRoomForm(prev => ({ ...prev, rating: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isAvailable"
                    checked={roomForm.isAvailable}
                    onCheckedChange={(checked) => setRoomForm(prev => ({ ...prev, isAvailable: checked }))}
                  />
                  <Label htmlFor="isAvailable">Available for booking</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowRoomForm(false);
                    resetRoomForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRoom ? 'Update Room' : 'Add Room'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {rooms.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No rooms found
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <Card key={room._id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{room.name}</h3>
                      <p className="text-sm text-gray-600">{room.roomId}</p>
                    </div>
                    <Badge variant={room.isAvailable ? "default" : "secondary"}>
                      {room.isAvailable ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Type: {room.type.charAt(0).toUpperCase() + room.type.slice(1)}</p>
                    <p>Price: ${room.price}/night</p>
                    <p>Size: {room.size}</p>
                    <p>Max Guests: {room.maxGuests}</p>
                    <p>Rating: {room.rating}/5</p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editRoom(room)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteRoom(room._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 
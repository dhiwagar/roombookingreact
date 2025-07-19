// Simple test script to verify API endpoints
// Run with: node test-api.js

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing Villa Shanti API endpoints...\n');

  try {
    // Test 1: Seed the database
    console.log('1. Seeding database...');
    const seedResponse = await fetch(`${BASE_URL}/seed`, { method: 'POST' });
    const seedResult = await seedResponse.json();
    console.log('✅ Database seeded:', seedResult.success ? 'Success' : 'Failed');
    console.log(`   Rooms created: ${seedResult.count || 0}\n`);

    // Test 2: Get all rooms
    console.log('2. Fetching rooms...');
    const roomsResponse = await fetch(`${BASE_URL}/rooms`);
    const roomsResult = await roomsResponse.json();
    console.log('✅ Rooms fetched:', roomsResult.success ? 'Success' : 'Failed');
    console.log(`   Available rooms: ${roomsResult.count || 0}\n`);

    // Test 3: Create a booking
    console.log('3. Creating a test booking...');
    const bookingData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      roomId: 'RM001',
      checkInDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      checkOutDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 days from now
      numberOfGuests: 2,
      specialRequest: 'Early check-in if possible'
    };

    const bookingResponse = await fetch(`${BASE_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    const bookingResult = await bookingResponse.json();
    console.log('✅ Booking created:', bookingResult.success ? 'Success' : 'Failed');
    if (bookingResult.success) {
      console.log(`   Booking ID: ${bookingResult.data.bookingId}`);
      console.log(`   Total Amount: $${bookingResult.data.totalAmount}`);
    } else {
      console.log(`   Error: ${bookingResult.error}`);
    }
    console.log('');

    // Test 4: Submit contact form
    console.log('4. Submitting contact form...');
    const contactData = {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      subject: 'General Inquiry',
      message: 'I would like to know more about your hotel services and amenities.'
    };

    const contactResponse = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    const contactResult = await contactResponse.json();
    console.log('✅ Contact form submitted:', contactResult.success ? 'Success' : 'Failed');
    if (contactResult.success) {
      console.log(`   Contact ID: ${contactResult.data._id}`);
    } else {
      console.log(`   Error: ${contactResult.error}`);
    }
    console.log('');

    // Test 5: Get bookings
    console.log('5. Fetching bookings...');
    const bookingsResponse = await fetch(`${BASE_URL}/bookings`);
    const bookingsResult = await bookingsResponse.json();
    console.log('✅ Bookings fetched:', bookingsResult.success ? 'Success' : 'Failed');
    console.log(`   Total bookings: ${bookingsResult.pagination?.total || 0}\n`);

    // Test 6: Get contacts
    console.log('6. Fetching contact submissions...');
    const contactsResponse = await fetch(`${BASE_URL}/contact`);
    const contactsResult = await contactsResponse.json();
    console.log('✅ Contacts fetched:', contactsResult.success ? 'Success' : 'Failed');
    console.log(`   Total contacts: ${contactsResult.pagination?.total || 0}\n`);

    console.log('🎉 All tests completed!');
    console.log('\n📝 Note: Email functionality requires RESEND_API_KEY to be configured in .env.local');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   1. The development server is running (npm run dev)');
    console.log('   2. MongoDB is connected');
    console.log('   3. All environment variables are set in .env.local');
  }
}

// Run the tests
testAPI(); 
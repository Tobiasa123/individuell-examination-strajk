import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post(
    "https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com",
    async ({ request }) => {
      try {
        const requestBody = await request.json();
  
        console.log("Booking info:", requestBody);
  
        const { when, lanes, people, shoes } = requestBody;
  
        const pricePerPerson = 120; 
        const pricePerLane = 100;   
  
        const totalPrice = (parseInt(people, 10) * pricePerPerson) + (parseInt(lanes, 10) * pricePerLane);
  
        const bookingId = "BLA454SFAS"

        const response = {
          success: true,
          when,
          lanes,
          people,
          shoes,
          price: totalPrice,
          id: bookingId,
          active: true
        };
  
        return HttpResponse.json(response);

      } catch (error) {
        return HttpResponse.json({ success: false, message: "Invalid data" });
      }
    }
  ),
];
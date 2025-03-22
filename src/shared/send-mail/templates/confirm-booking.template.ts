export function confirmBooking(
  username: string,
  bookingDate: string,
  departureTime: string,
  departure: string,
  destination: string,
  seatNumber: string,
  bookingReference: string,
) {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bus Ticket Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #007bff;
            color: white;
            padding: 15px;
            text-align: center;
            font-size: 20px;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            font-size: 16px;
            color: #333;
        }
        .ticket-details {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 8px;
            margin-top: 10px;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #666;
        }
        .btn {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Bus Ticket Confirmation
        </div>
        <div class="content">
            <p>Dear <strong>${username}</strong>,</p>
            <p>Your bus ticket has been successfully booked. Below are the details of your journey:</p>
            <div class="ticket-details">
                <p><strong>Departure:</strong>${departure}</p>
                <p><strong>Destination:</strong>${destination}</p>
                <p><strong>Date:</strong>${bookingDate}</p>
                <p><strong>Time:</strong>${departureTime}</p>
                <p><strong>Seat Number:</strong>${seatNumber}</p>
                <p><strong>Booking Reference:</strong>${bookingReference}</p>
            </div>
            <a href="#" class="btn">View Ticket</a>
        </div>
        <div class="footer">
            &copy; 2025 Bus Company. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
}

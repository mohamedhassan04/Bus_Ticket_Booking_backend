export function reminderBooking(
  username: string,
  bookingDate: string,
  departureTime: string,
  location: string,
) {
  return `
    <!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Booking Reminder</title>
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
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background: #007bff;
            padding: 15px;
            color: #ffffff;
            font-size: 22px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
            color: #333;
        }
        .content h2 {
            color: #007bff;
        }
        .button {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 15px;
            font-size: 16px;
            color: #ffffff;
            background: #007bff;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background: #0056b3;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            Booking Reminder
        </div>
        <div class="content">
            <h2>Dear ${username},</h2>
            <p>This is a reminder for your upcoming booking with us.</p>
            <p><strong>Booking Details:</strong></p>
            <p>Date: <strong>${bookingDate}</strong></p>
            <p>Time: <strong>${departureTime}</strong></p>
            <p>Location: <strong>${location}</strong></p>
        </div>
        <div class="footer">
            &copy; 2024 Your Company Name. All rights reserved.
        </div>
    </div>
</body>
</html>
  `;
}

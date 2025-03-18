export function resetPwdTemplate(resetpwdlink: string): string {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirm Your Account</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #fff;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        
        .header {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }
        
        .content {
            padding: 20px;
        }
        
        .button {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        
        .button:hover {
            background-color: #3e8e41;
        }
        
        .footer {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px;
            border-radius: 0 0 10px 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Confirm Your Account</h2>
        </div>
        <div class="content">
            <p>Dear [User Name],</p>
            <p>Thank you for signing up with our Bus Ticket Booking Web App.</p>
            <p>To complete your registration, please click the confirmation button below:</p>
            <a href="${resetpwdlink}">
                <button class="button">Confirm Account</button>
            </a>
            <p>If you have any issues, please don't hesitate to contact us at [Support Email].</p>
        </div>
        <div class="footer">
            <p>&copy; [Year] [Web App Name]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
  `;
}

# Anonymous Messaging Web Application

This project is a web application that allows users to send and receive messages anonymously. It features secure authentication, OTP verification for sign-up, and a responsive dashboard for viewing received messages.

**Send me an anonymous message here: [https://anonymous-msg-one.vercel.app/u/parshav143](https://anonymous-msg-one.vercel.app/u/parshav143)**


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)

## Features
- **Anonymous Messaging**: Send and receive messages without revealing your identity.
- **OTP Verification**: Secure sign-up process using OTP verification via email.
- **Authentication**: Robust user authentication and session management with NextAuth/Auth.js.
- **Schema Validation**: Ensure data integrity with Zod.
- **Responsive Dashboard**: View received messages on a user-friendly and responsive interface.

## Technologies Used
- **Frontend**: Next.js
- **Authentication**: NextAuth/Auth.js
- **Schema Validation**: Zod
- **Email Service**: Resend email API (due to custome domain problem latter i used nodemailer)

## Usage
- **Sign Up**: Create an account using your email. An OTP will be sent to your email for verification.
- **Sign In**: Log in to your account.
- **Send Message**: Send anonymous messages to other users.
- **View Messages**: Access your dashboard to view the messages you have received anonymously.



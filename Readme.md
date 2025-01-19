# MinifyURL Project

## About This Project

MinifyURL is a URL shortening service built with AdonisJS, TypeScript, and MongoDB. It allows users to shorten long URLs, track analytics, and provides secure authentication through Google Sign-In. The application also features rate limiting, audience data logging, Redis caching for improved performance, and comprehensive error handling. 
[API Documentation](https://k-b-yudheess-organization.gitbook.io/minifyurl)


### Key Features:
- **User Authentication**: Implement user registration and login endpoints with Google Sign-In for secure sessions.
- **Short URL APIs**: Create, redirect, and retrieve analytics for shortened URLs, with rate limiting to prevent abuse.
- **Data Modeling**: Design database schema for URL storage, user data, and analytics, with mock data for testing purposes.
- **Audience Data Storage**: Log each redirect event with detailed audience data such as IP address, user agent, operating system, device type, and geolocation.
- **Caching Implementation**: Use Redis for caching short and long URLs to improve API performance.
- **Testing & Error Handling**: Integration tests for all endpoints with comprehensive error handling.
- **Deployment & Documentation**: Dockerized the application and deployed it on a free hosting service. Detailed API documentation is available in the GitHub repository.

## User Authentication

This project uses Google Sign-In for secure user authentication. The authentication flow is as follows:
1. User registers/login via Google.
2. A session is established using JWT (JSON Web Tokens).
3. Protected API endpoints require authentication via bearer tokens.

## Short URL APIs

The project provides the following URL shortening features:
- **Create Short URL**: Generate a short URL by submitting a long URL.
- **Redirect Short URL**: Short URLs redirect users to the original long URLs.
- **Analytics for Short URLs**: Retrieve click statistics, unique users, device types, and operating systems.

Rate limiting is applied to prevent abuse of the API.

## Data Modeling

The database schema is designed with the following collections:
- **Users**: Stores user data such as name, email, and authentication tokens.
- **URLs**: Stores shortened URLs and their corresponding long URLs.
- **Analytics**: Logs data for each shortened URL including the number of clicks, unique users, and audience data (IP, OS, device type, etc.).

Mock data is provided for testing purposes.

## Audience Data Storage

Each redirect event logs detailed audience data, which includes:
- **IP Address**
- **User Agent**
- **Operating System (OS)**
- **Device Type (e.g., web, mobile)**
- **Geolocation** (based on IP address)

This information is crucial for the analytics of each short URL.

## Caching Implementation

Redis is used for caching short and long URLs to speed up the response time. The caching mechanism ensures that repeated requests for the same URLs do not result in redundant database queries.

## Testing & Error Handling

The application includes integration tests to ensure the reliability of each endpoint. The API also includes comprehensive error handling, returning appropriate status codes and messages in case of errors such as invalid tokens, missing parameters, or internal server issues.

## Deployment & Documentation

The application is Dockerized and deployed on a free hosting service. Detailed API documentation can be found here:

[API Documentation](https://k-b-yudheess-organization.gitbook.io/minifyurl)

### Prerequisites:
- Docker
- Redis Cloud
- MongoDB Database

## How to Run Locally

1 .Clone the repository:

```bash
git clone https://github.com/yudhees/MinifyUrl.git

```
2 .Navigate to the project directory:
``` bash
bash cd minifyurl

```
3 .Install dependencies:
``` bash
bash npm install

```
4 .Start the application:
``` bash
bash npm run dev

```

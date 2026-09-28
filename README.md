# AI-Powered Personal Diet Planner with Cloud Storage

## 1. Project Overview

AI-Powered Personal Diet Planner is a cloud-connected web application that helps users create personalized educational diet plans based on their profile, dietary preference, and wellness goal.

The application demonstrates Cloud Computing concepts including:

- Cloud Authentication
- Cloud Database
- REST API
- Backend Services
- AI/Rule-Based Processing
- User-specific data access
- Cloud deployment architecture
- File management
- Security rules
- Scalable web application design

> Disclaimer: The generated plans are for educational and general wellness purposes only and are not medical advice.

---

## 2. Technology Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Authentication
- Firebase Authentication
- Email/Password authentication

### Cloud Database
- Firebase Firestore

### Backend
- Python
- Flask
- Flask-CORS
- REST API

### AI Engine
- Local rule-based diet generation
- Designed with a fallback architecture for an external AI API

### File Management
- Browser-based file demonstration
- Firebase Cloud Storage planned as the production object-storage layer

---

## 3. System Architecture

```text
                    USER
                     |
                     v
              React Web App
                     |
          +----------+----------+
          |                     |
          v                     v
 Firebase Authentication    Flask REST API
          |                     |
          v                     v
      Firestore          Local AI / Rule Engine
          |                     |
          +----------+----------+
                     |
                     v
              Generated Plan
                     |
                     v
                 Dashboard
```

## 4. Cloud Computing Concepts Demonstrated
### Cloud Computing
The application uses cloud services to provide authentication and persistent application data.

### SaaS
The completed web application can be accessed through a browser without requiring users to install the complete application locally.

### PaaS
Firebase provides managed application services such as Authentication and Firestore.

### IaaS
The project architecture can be extended to deploy the Python backend on a cloud infrastructure service.

### Cloud Database
Firestore stores:
  User profiles
  Generated diet plans
  Daily tracking information
  
### Authentication
Firebase Authentication manages user registration and login.

### REST API
The React frontend communicates with the Python Flask backend through:

```text POST /api/generate-plan
```
### Client-Server Architecture
```text
React Client
     |
     | HTTP Request
     v
Flask Server
     |
     v
Diet Generation Engine
     |
     v
HTTP Response
     |
     v
React Client
```
## Security
Firestore security rules restrict users to their own data.

Example:
```text
request.auth.uid == userId
```
This prevents one authenticated user from directly accessing another user's protected documents.

## 5. Database Structure
### users

Stores user profile information.

Example fields:
```text
name
age
height
weight
activityLevel
dietaryPreference
goal
allergies
email
updatedAt
```

### diet_plans
Stores generated diet plans.

Example fields:
```text
userId
dietaryPreference
goal
breakfast
lunch
snack
dinner
hydration
nutritionSummary
createdAt
```

### daily_trackers
Stores daily meal and hydration tracking information.

Example fields:
```text
userId
date
meals
water
updatedAt
```
## 6. AI Diet Generation

The current implementation uses a local rule-based engine.

### The backend receives:
```text
{
  "dietaryPreference": "Vegetarian",
  "goal": "Balanced eating"
}
```
The Flask API processes the request and returns a structured diet plan.

### Current architecture:
```text
User Input
    |
    v
React
    |
    v
Flask API
    |
    v
Rule-Based Diet Engine
    |
    v
Generated Diet Plan
```
The architecture can later be extended with an external AI API while keeping the API key on the backend.

## 7. Cloud Storage Status

Firebase Cloud Storage was evaluated for the project.

In the current Firebase project, Cloud Storage requires the Blaze billing plan.

To keep the student project free, billing was not enabled.

Therefore, the current implementation provides a browser-based file-management demonstration instead of claiming to use Firebase Cloud Storage.

### Current implementation

Users can:

Select files
View uploaded filenames
View file size
View MIME type

### Production extension

For a fully cloud-based production implementation, Firebase Cloud Storage can be connected as the object-storage layer.

Architecture:
```text
React
  |
  v
Firebase Storage
  |
  +---- Diet documents
  |
  +---- Images
  |
  +---- Exported plans
```
  
## 8. Application Features
Authentication
User registration
User login
Logout
Profile
Personal information
Activity level
Dietary preference
Wellness goal
Allergies/preferences
Diet Planning
Generate diet plan
Breakfast
Lunch
Snack
Dinner
Hydration
Nutrition summary
Saved Plans
Store generated plans in Firestore
View previous plans
Download plan information
Daily Tracker
Meal tracking
Hydration tracking
Daily progress
Progress Dashboard
Meal completion
Hydration progress
Number of tracked days
Saved plan count
Recent tracking history
Cloud Files
File selection
File information display
Cloud-storage architecture demonstration

## 9. Security

The application uses Firebase Authentication and Firestore security rules.

Users must be authenticated to access protected data.

User-specific documents use the authenticated user's UID.

Example security principle:

Authenticated User UID
        =
Document User ID

This provides user-level data isolation.

API keys for future external AI services should be stored as environment variables and must never be exposed in frontend source code.

## 10. Error Handling

The application handles common failures including:

Invalid login
Registration errors
Missing profile
Backend API failure
Failed diet-plan generation
Firestore errors
Missing data

The Flask backend also exposes:

GET /api/health

for health checking.

## 11. Testing

The following workflows have been tested:

User registration
User login
Profile creation
Diet plan generation
Flask API communication
Firestore plan storage
Saved plans
Daily tracking
Progress dashboard
Cloud Files interface
Logout and login

Backend health endpoint:
```text
http://127.0.0.1:5000/api/health
```
Expected response:
```text
{
  "status": "healthy",
  "service": "diet-planner-backend"
}
```

## 12. Free-Tier Design Decision

The project was intentionally developed without enabling paid billing.

Implemented using available free services:

Firebase Authentication
Firebase Firestore
React/Vite
Python Flask
Local rule-based AI engine

Firebase Cloud Storage was not enabled because it requires the Blaze billing plan in the current project configuration.

This limitation is explicitly documented rather than presenting the browser file demonstration as actual cloud object storage.

## 13. Future Enhancements

Possible future improvements include:

Firebase Cloud Storage integration
External AI API integration
Cloud deployment of the Flask backend
AI-generated meal recommendations
Downloadable PDF diet plans
Coach role
Advanced analytics
Cloud monitoring and logging
Automated CI/CD deployment
Multi-device cloud file synchronization

## 14. Project Learning Outcomes

This project demonstrates practical understanding of:

Cloud Computing
Firebase
Authentication
Firestore
REST APIs
Flask
React
Client-server architecture
Database security
API communication
AI fallback architecture
Cloud storage concepts
Error handling
Deployment architecture
GitHub-based project documentation

## 15. Project Status
Completed
 React frontend
 Firebase Authentication
 User registration/login
 User profile
 Firestore database
 Diet plan generation
 Flask REST API
 Local rule-based AI engine
 Saved diet plans
 Daily tracker
 Progress dashboard
 Cloud Files interface
 Firestore security rules
 Error handling
 Project documentation
Optional / Future
 Firebase Cloud Storage
 External AI API
 Cloud deployment of Flask backend
 CI/CD pipeline
 Advanced monitoring

## 16. Disclaimer

This project is an educational Cloud Computing project.

Generated diet plans are intended only for general wellness and educational demonstration purposes. They are not medical advice, diagnosis, or treatment recommendations.


# Dynamic Form Generator with MERN

This project consists of a NestJS backend and a React js frontend that work together.

## Backend (NestJS)

### Prerequisites

- Node.js v16
- npm or yarn
- MongoDB

### Setup Instructions

1. **Install Dependencies**

```
  cd backend
  npm install # or yarn install
```

2. **Environment Variables**

Create a .env file in the root of the backend directory and add the following:

```
 PORT=4000
 MONGO_URI=your_mongodb_uri
```

3. **Start the Server**

   ```
    yarn start:dev
    The backend server should now be running on http://localhost:4000.
   ```

## Frontend (React)

### Prerequisites

- Node.js v16
- npm or yarn

1. **Install Dependencies**

```
  cd frontend
  npm install # or yarn install
```

2. **Environment Variables**

Create a .env file in the root of the frontend directory and add the following:

```
    REACT_APP_REST_API_URL=http://localhost:4000/
```

3. **Start the React project**

```
 npm run start # or yarn start
 The frontend  should now be running on http://localhost:3000.
```

4. **Libraries used**

- react-form-builder2
- react-share-social
- react-query

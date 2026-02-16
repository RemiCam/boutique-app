# Glacier Gear API Documentation

## Overview

The Glacier Gear API is a RESTful API that provides full CRUD (Create, Read, Update, Delete) operations for managing winter gear items in the e-commerce application.

---

## Base URL

http://localhost:3000/api

---

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Middleware:** CORS, body-parser

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (MongoDB Compass or MongoDB Atlas)
- npm or yarn

### Installation

# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file with:
PORT=3000
MONGODB_URI=mongodb://localhost:27017/boutique_app

# Start the server
npm run dev

### Verify Server is Running

GET http://localhost:3000/

**Response:**
{
  "message": "Glacier Gear API is running"
}

---

## Database Schema

### Item Model

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique identifier (MongoDB) |
| `name` | String | Yes | - | Item name |
| `description` | String | Yes | - | Item description |
| `price` | Number | Yes | - | Item price (in dollars) |
| `image` | String | Yes | - | Image filename |
| `category` | String | No | "General" | Item category |
| `inStock` | Boolean | No | true | Availability status |
| `createdAt` | Date | Auto | - | Creation timestamp |
| `updatedAt` | Date | Auto | - | Last update timestamp |

**Example Document:**
{
  "_id": "65abc123def456789",
  "name": "Insulated Ski Jacket",
  "description": "Stay warm and dry on the slopes with our top-rated insulated ski jacket.",
  "price": 299,
  "image": "ski_jacket.jpg",
  "category": "Jackets",
  "inStock": true,
  "createdAt": "2026-02-15T20:30:00.000Z",
  "updatedAt": "2026-02-15T20:30:00.000Z",
  "__v": 0
}

---

## API Endpoints

### 1. Get All Items

Retrieve a list of all items in the database.

**Endpoint:** `GET /api/items`

**Headers:** None required

**Query Parameters:** None

**Success Response (200 OK):**
[
  {
    "_id": "65abc123def456789",
    "name": "Insulated Ski Jacket",
    "description": "Stay warm and dry on the slopes with our top-rated insulated ski jacket.",
    "price": 299,
    "image": "ski_jacket.jpg",
    "category": "Jackets",
    "inStock": true,
    "createdAt": "2026-02-15T20:30:00.000Z",
    "updatedAt": "2026-02-15T20:30:00.000Z",
    "__v": 0
  },
  {
    "_id": "65abc456def789012",
    "name": "Thermal Base Layers",
    "description": "Our thermal base layers provide unmatched warmth and comfort.",
    "price": 59,
    "image": "thermal_layers.jpg",
    "category": "Base Layers",
    "inStock": true,
    "createdAt": "2026-02-15T20:30:00.000Z",
    "updatedAt": "2026-02-15T20:30:00.000Z",
    "__v": 0
  }
]

**Error Response (500 Internal Server Error):**
{
  "message": "Error message details"
}

**cURL Example:**
curl -X GET http://localhost:3000/api/items

---

### 2. Get Single Item

Retrieve details of a specific item by its ID.

**Endpoint:** `GET /api/items/:id`

**URL Parameters:**
- `id` (required) - MongoDB ObjectId of the item

**Headers:** None required

**Success Response (200 OK):**
{
  "_id": "65abc123def456789",
  "name": "Insulated Ski Jacket",
  "description": "Stay warm and dry on the slopes with our top-rated insulated ski jacket.",
  "price": 299,
  "image": "ski_jacket.jpg",
  "category": "Jackets",
  "inStock": true,
  "createdAt": "2026-02-15T20:30:00.000Z",
  "updatedAt": "2026-02-15T20:30:00.000Z",
  "__v": 0
}

**Error Response (404 Not Found):**
{
  "message": "Item not found"
}

**Error Response (500 Internal Server Error):**
{
  "message": "Error message details"
}

**cURL Example:**
curl -X GET http://localhost:3000/api/items/65abc123def456789

---

### 3. Create New Item

Add a new item to the database.

**Endpoint:** `POST /api/items`

**Headers:**
Content-Type: application/json

**Request Body:**
{
  "name": "Waterproof Gloves",
  "description": "Premium waterproof gloves with thermal insulation for extreme cold weather.",
  "price": 79,
  "image": "gloves.jpg",
  "category": "Accessories",
  "inStock": true
}

**Required Fields:**
- `name` (string) - Item name
- `description` (string) - Item description
- `price` (number) - Item price
- `image` (string) - Image filename

**Optional Fields:**
- `category` (string) - Item category (default: "General")
- `inStock` (boolean) - Availability (default: true)

**Success Response (201 Created):**
{
  "_id": "65abc789ghi012345",
  "name": "Waterproof Gloves",
  "description": "Premium waterproof gloves with thermal insulation for extreme cold weather.",
  "price": 79,
  "image": "gloves.jpg",
  "category": "Accessories",
  "inStock": true,
  "createdAt": "2026-02-15T21:00:00.000Z",
  "updatedAt": "2026-02-15T21:00:00.000Z",
  "__v": 0
}

**Error Response (400 Bad Request):**
{
  "message": "Validation error message"
}

**cURL Example:**
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Waterproof Gloves",
    "description": "Premium waterproof gloves with thermal insulation.",
    "price": 79,
    "image": "gloves.jpg",
    "category": "Accessories",
    "inStock": true
  }'

---

### 4. Update Item

Update an existing item's information.

**Endpoint:** `PUT /api/items/:id`

**URL Parameters:**
- `id` (required) - MongoDB ObjectId of the item

**Headers:**
Content-Type: application/json

**Request Body (all fields optional):**
{
  "name": "Waterproof Winter Gloves",
  "price": 89,
  "description": "Premium waterproof gloves with thermal insulation. Now on sale!",
  "inStock": false
}

**Success Response (200 OK):**
{
  "_id": "65abc789ghi012345",
  "name": "Waterproof Winter Gloves",
  "description": "Premium waterproof gloves with thermal insulation. Now on sale!",
  "price": 89,
  "image": "gloves.jpg",
  "category": "Accessories",
  "inStock": false,
  "createdAt": "2026-02-15T21:00:00.000Z",
  "updatedAt": "2026-02-15T21:15:00.000Z",
  "__v": 0
}

**Error Response (404 Not Found):**
{
  "message": "Item not found"
}

**Error Response (400 Bad Request):**
{
  "message": "Validation error message"
}

**cURL Example:**
curl -X PUT http://localhost:3000/api/items/65abc789ghi012345 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 89,
    "inStock": false
  }'

---

### 5. Delete Item

Remove an item from the database.

**Endpoint:** `DELETE /api/items/:id`

**URL Parameters:**
- `id` (required) - MongoDB ObjectId of the item

**Headers:** None required

**Success Response (200 OK):**
{
  "message": "Item deleted successfully"
}

**Error Response (404 Not Found):**
{
  "message": "Item not found"
}

**Error Response (500 Internal Server Error):**
{
  "message": "Error message details"
}

**cURL Example:**
curl -X DELETE http://localhost:3000/api/items/65abc789ghi012345

---

## HTTP Status Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request body or parameters |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error occurred |

---

## Error Handling

All errors return a JSON object with a `message` field:

{
  "message": "Descriptive error message"
}

### Common Errors

**Invalid MongoDB ObjectId:**
{
  "message": "Cast to ObjectId failed for value \"invalid-id\" at path \"_id\""
}

**Missing Required Fields:**
{
  "message": "Item validation failed: name: Path `name` is required."
}

**Database Connection Error:**
{
  "message": "Failed to connect to MongoDB"
}

---

## Testing with Postman

### Import Collection

1. Open Postman
2. Click **Import**
3. Select `Glacier_Gear_API.postman_collection.json`
4. Collection will appear in your sidebar

### Setup

1. **Start MongoDB** - Open MongoDB Compass and ensure connection is active
2. **Start Backend Server:**
   cd backend
   npm run dev
3. **Verify Server:**
   - Open Postman
   - Send GET request to `http://localhost:3000/`
   - Should return: `{"message": "Glacier Gear API is running"}`

### Test Sequence

1. **GET All Items** - Verify initial data
2. **POST Create Item** - Add a new item, save the returned `_id`
3. **GET Single Item** - Retrieve the item you just created
4. **PUT Update Item** - Modify the item
5. **GET Single Item** - Verify changes
6. **DELETE Item** - Remove the item
7. **GET All Items** - Verify deletion

---

## Frontend Integration

### Fetch API Example

// Get all items
const fetchItems = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/items');
    const items = await response.json();
    console.log(items);
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Create new item
const createItem = async (itemData) => {
  try {
    const response = await fetch('http://localhost:3000/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const newItem = await response.json();
    console.log('Created:', newItem);
  } catch (error) {
    console.error('Error creating item:', error);
  }
};

// Update item
const updateItem = async (id, updates) => {
  try {
    const response = await fetch(`http://localhost:3000/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const updatedItem = await response.json();
    console.log('Updated:', updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
  }
};

// Delete item
const deleteItem = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/items/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

### Redux Thunk Example

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchItems = createAsyncThunk('items/fetch', async () => {
  const response = await fetch('http://localhost:3000/api/items');
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
});

export const createItem = createAsyncThunk('items/create', async (newItem) => {
  const response = await fetch('http://localhost:3000/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) throw new Error('Failed to create item');
  return response.json();
});

---

## Validation with Zod

### Item Schema Example

import { z } from 'zod';

export const itemSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  image: z.string().min(1, "Image is required"),
  category: z.string().default("General"),
  inStock: z.boolean().default(true),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const itemsArraySchema = z.array(itemSchema);

// Usage
const validateItems = (data) => {
  const result = itemsArraySchema.safeParse(data);
  if (!result.success) {
    console.error('Validation errors:', result.error);
    return null;
  }
  return result.data;
};

---

## Security Considerations

### Current Implementation (Development)

- ✅ CORS enabled for all origins (for development)
- ✅ JSON body parsing
- ✅ MongoDB connection string in `.env`
- ❌ No authentication/authorization
- ❌ No rate limiting
- ❌ No input sanitization

### Production Recommendations

1. **Authentication:** Implement JWT or OAuth
2. **CORS:** Restrict to specific origins
3. **Rate Limiting:** Use `express-rate-limit`
4. **Input Validation:** Sanitize user inputs
5. **HTTPS:** Use TLS/SSL certificates
6. **Environment Variables:** Use secure environment management
7. **Logging:** Implement proper logging (Winston, Morgan)

---

## Troubleshooting

### Server Won't Start

**Issue:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:** Port 3000 is already in use

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill

### MongoDB Connection Failed

**Issue:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:** Ensure MongoDB is running
- Open MongoDB Compass
- Check connection status
- Verify `MONGODB_URI` in `.env`

### CORS Errors

**Issue:** `Access to fetch at 'http://localhost:3000' from origin 'http://localhost:8081' has been blocked by CORS policy`

**Solution:** Already configured in `server.js` - ensure `app.use(cors())` is present

### Invalid ObjectId

**Issue:** `Cast to ObjectId failed`

**Solution:** Ensure you're using valid MongoDB ObjectId format (24-character hex string)

---

## Development Workflow

### Making Changes

1. **Modify code** in `routes/items.js` or `models/Item.js`
2. **Save file** - nodemon will auto-restart server
3. **Test endpoint** in Postman
4. **Check logs** in terminal for errors

### Adding New Endpoints

1. **Add route** in `routes/items.js`
2. **Test with Postman**
3. **Update this documentation**
4. **Export updated Postman collection**

### Database Changes

1. **Modify schema** in `models/Item.js`
2. **Restart server** (nodemon will detect changes)
3. **Update existing documents** in MongoDB Compass if needed
4. **Test CRUD operations**

---

## Project Structure

backend/
├── models/
│   └── Item.js              # Mongoose schema
├── routes/
│   └── items.js             # CRUD route handlers
├── api/
│   ├── API_DOCUMENTATION.md # This file
│   └── Glacier_Gear_API.postman_collection.json
├── .env                     # Environment variables (gitignored)
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                # Express server setup

---

## Future Enhancements

### Planned Features

- [ ] User authentication (JWT)
- [ ] Item categories filtering
- [ ] Pagination for large datasets
- [ ] Search functionality
- [ ] Image upload endpoint
- [ ] Review/rating system
- [ ] Inventory management
- [ ] Order processing

### API Versioning

Future versions may include:
- `/api/v2/items` - Enhanced endpoints
- Breaking changes will be documented

---

## Support & Contact

For questions or issues:
- **GitHub Issues:** [Create an issue](https://github.com/RemiCam/boutique-app/issues)
- **Developer:** RemiCam

---

## License

This project is part of an academic assignment.

---

## Changelog

### Version 1.0.0 (2026-02-15)
- ✅ Initial API release
- ✅ Full CRUD operations for items
- ✅ MongoDB integration
- ✅ Postman collection
- ✅ Complete documentation

---

**Last Updated:** February 15, 2026  
**API Version:** 1.0.0
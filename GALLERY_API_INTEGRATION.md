# Gallery API Integration

## Changes Made

### Backend (API)

✅ Created `models/gallery.model.js` - MongoDB schema for gallery images
✅ Created `controllers/galleryController.js` - CRUD operations with Cloudinary integration
✅ Created `routes/gallery.route.js` - API endpoints with authentication
✅ Updated `app.js` - Registered gallery routes

### Frontend (Admin)

✅ Updated `Gallery.jsx` - Integrated with API, added loading states and error handling
✅ Updated `GalleryItemModal.jsx` - Proper FormData handling for file uploads

## API Endpoints

Base URL: `http://localhost:4005/api/gallery`

### 1. Get All Images

- **Method**: GET
- **Endpoint**: `/api/gallery`
- **Auth**: Not required
- **Response**: `{ images: [...] }`

### 2. Create Image

- **Method**: POST
- **Endpoint**: `/api/gallery`
- **Auth**: Required (Bearer token)
- **Body**: FormData with `image` field
- **Response**: Created image object

### 3. Update Image

- **Method**: PUT
- **Endpoint**: `/api/gallery/:id`
- **Auth**: Required (Bearer token)
- **Body**: FormData with `image` field
- **Response**: Updated image object

### 4. Delete Image

- **Method**: DELETE
- **Endpoint**: `/api/gallery/:id`
- **Auth**: Required (Bearer token)
- **Response**: `{ message: "Gallery item deleted successfully" }`

## Features Implemented

### UI Improvements

- Loading states for all operations
- Error handling with user-friendly messages
- Empty state when no images exist
- Disabled buttons during operations
- Hover effects on gallery items
- File validation (type and size)
- Drag and drop support
- Image preview before upload

### Backend Features

- Cloudinary integration for image storage
- Automatic cleanup of old images on update/delete
- JWT authentication for protected routes
- Proper error handling
- Image validation

## Usage

1. **Add Image**: Click "Add New Image" → Select/drag image → Click "Save"
2. **Edit Image**: Hover over image → Click edit icon → Select new image → Click "Save"
3. **Delete Image**: Hover over image → Click delete icon → Confirm deletion

## Notes

- Images are stored in Cloudinary
- Maximum file size: 5MB
- Supported formats: PNG, JPG, GIF
- Authentication token is stored in localStorage

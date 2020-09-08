# ShopifyChallenge
Image Repo web application for Shopify Challenge

## Features
* Upload one/many images
* Delete images
  * Users can only delete their own images
  * Admins can delete all images
* Users with authorization and authentication
  * API is secured to prevent unauthorized access
* Filter images by name

## Requirements
* Maven
* node.js and npm

## Starting backend server

### Required configuration
In `application.properties` the following properties need to be configured:
* `upload.location` - A location on your disk to store all images that are uploaded
* `file.server.url` - URL to basic HTTP server (localhost)
* `file.server.port` - port to basic HTTP server

### Build and run backend
1. `cd` to project root
2. Execute `mvn spring-boot:run`

## Starting frontend server

### Installing dependencies
1. `cd challenge-frontend`
2. Execute `npm install`

### Install http-server
`npm install http-server -g`

### Start http-server
1. `cd` to `upload.location` set in `application.properties`
2. Execute `http-server -p port` where port is your `file.server.port`

### Compile and run frontend
1. `cd challenge-frontend`
2. Execute `npm start`

## Using the application
1. Navigate to localhost:3000 (or wherever you started the frontend server)
2. Enter login information **username (case-sensitive)**: `Wolverine`, **password**: `password`. Default user information can be found in PopulateDB.java
3. Click `Upload Images` and select any image files you want to upload

From here you could:
* Try to search bar to filter your images
* Click on an image to expand
* Delete an image using the delete icon
* Login as another user

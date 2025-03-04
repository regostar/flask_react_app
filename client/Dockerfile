# Use the official Nginx image
FROM nginx:alpine

# Copy the build output to the Nginx html directory
COPY build /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# Use the official Node.js image from the Docker Hub
FROM node:14

# Create and set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Set environment variables (optional, recommended to use a .env file)
ENV TOKEN=EAANHQqBZCeVMBOyqcXPF0uLZB97k7UWu4c9XXmcRDqRPbxQXdPJZAZAEWMrajZAjucpxlkou1VsO1tgNKpHCR65yALPVgXVxzyNpXqvlXFTDC0ZBAmb8ZBAAmXBa0ZBp7xvnV8q4yKQc1jw60TJoPLxU4XWDQAZBpX6NmNmhpQvVm0S78RgbkmTxDcWawXJZBce9sCdnVhcVPPkZCZC1vecDwnl2gD4b1ipMuIS1
ENV MYTOKEN=EAANHQqBZCeVMBOyqcXPF0uLZB97k7UWu4c9XXmcRDqRPbxQXdPJZAZAEWMrajZAjucpxlkou1VsO1tgNKpHCR65yALPVgXVxzyNpXqvlXFTDC0ZBAmb8ZBAAmXBa0ZBp7xvnV8q4yKQc1jw60TJoPLxU4XWDQAZBpX6NmNmhpQvVm0S78RgbkmTxDcWawXJZBce9sCdnVhcVPPkZCZC1vecDwnl2gD4b1ipMuIS1
ENV PORT=3000

# Run the application
CMD ["node", "index.js"]

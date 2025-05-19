FROM mcr.microsoft.com/playwright:v1.44.0-focal

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm install

# Copy only the necessary files
COPY playwright.config.ts ./
COPY tsconfig.json ./
COPY src/ ./src/

# This is a testing project, so we don't need to expose ports
# EXPOSE 3000 - Not needed for test projects

# Command to run UI tests
CMD ["npm", "run", "test:ui"]
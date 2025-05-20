FROM mcr.microsoft.com/playwright:v1.44.0-focal

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Explicitly install the matching Playwright version
RUN npm install && \
    npm install @playwright/test@1.44.0 && \
    npx playwright install

# Copy only the necessary files
COPY playwright.config.ts ./
COPY tsconfig.json ./
COPY src/ ./src/

# Install http-server for serving the report
RUN npm install -g http-server

# Command to run UI tests and then serve the report (in proper JSON format)
CMD ["sh", "-c", "npm run test:ui && http-server /app/playwright-report -p 9323 --cors -a 0.0.0.0"]
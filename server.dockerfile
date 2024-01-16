# ---- Build Stage ----
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Install TypeScript globally
RUN npm install -g typescript

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies including 'devDependencies'
RUN npm install

# copy prisma and generate migration
COPY prisma ./prisma/

RUN npx prisma generate

# Copy the source code of the application
COPY . .

# Run the TypeScript compiler
RUN npm run build

# ---- Production Stage ----
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# copy prisma and generate migration
COPY prisma ./prisma/

RUN npx prisma generate


# Copy the compiled JavaScript and generated Prisma client from the build stage
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Expose the port the app runs on
EXPOSE 8888

# Start the application
CMD [ "node", "build/server.js" ]

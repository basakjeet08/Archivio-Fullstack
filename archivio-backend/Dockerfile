# Stage 1 : Build the Application
FROM eclipse-temurin:21-jdk-alpine AS build

# Metadata
LABEL maintainer="Anirban Basak jeetbasak2002@gmail.com" \
      description="Library Management System"

# Set working directory
WORKDIR /app

# Copy the gradle files separately for better caching
COPY gradle gradle
COPY build.gradle settings.gradle gradlew ./
RUN chmod +x gradlew

# Download dependencies to optimize caching
RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon

# Copy the whole project
COPY . .

# Build the Spring boot jar
RUN ./gradlew bootJar --no-daemon

# Stage 2 : Create the runtime image
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy the generated JAR file from the build stage
COPY --from=build /app/build/libs/*.jar /app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java","-jar","/app.jar"]
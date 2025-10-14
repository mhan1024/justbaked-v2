# Stage 1: Build the JAR
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the Maven project files
COPY pom.xml .
COPY src ./src

# Package the application (skip tests for faster build)
RUN mvn clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy only the built jar from the previous stage
COPY --from=build /app/target/*.jar app.jar

# ✅ Copy the Firebase service account key into the image
COPY /src/main/resources/serviceAccountKey.json /app/serviceAccountKey.json

# ✅ Set the environment variable to point to the file
ENV FIREBASE_CONFIG=/app/serviceAccountKey.json

# Expose the port your app runs on (default Spring Boot is 8080)
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]

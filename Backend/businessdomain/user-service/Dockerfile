FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copia solo los archivos del user-service
COPY ./user-service/mvnw .
COPY ./user-service/pom.xml .
COPY ./user-service/.mvn ./.mvn
COPY ./user-service/src ./src

# Construye el proyecto
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

EXPOSE 8081

CMD ["java", "-jar", "target/user-service-0.0.1-SNAPSHOT.jar"]
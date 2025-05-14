FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copia los archivos DESDE EL DIRECTORIO ACTUAL (user-service/)
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
COPY src ./src

# Construye el proyecto
RUN chmod +x mvnw && ./mvnw clean package -DskipTests

EXPOSE 8082

CMD ["java", "-jar", "target/template-service-0.0.1-SNAPSHOT.jar"]

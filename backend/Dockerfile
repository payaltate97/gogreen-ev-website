FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY pom.xml .

COPY src ./src

RUN chmod +x mvnw 2>/dev/null || true

RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD java -Dserver.port=${PORT:-8080} -jar target/*.jar

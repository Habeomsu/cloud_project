FROM openjdk:21-jdk-slim

WORKDIR /app

# JAR 파일을 /app/music.jar로 복사합니다.
COPY target/musicServer-0.0.1-SNAPSHOT.jar /app/music.jar

# ENTRYPOINT에서 JAR 파일과 JVM 옵션을 올바르게 지정합니다.
ENTRYPOINT ["java", "-Dspring.profiles.active=prod","-jar", "music.jar"]
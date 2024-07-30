FROM gradle:jdk21 AS build
WORKDIR /app
COPY --chown=gradle:gradle . /app
RUN ./gradlew build --no-daemon -x test
FROM openjdk:21-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar /app/spring-boot-application.jar
COPY --from=build /app/gradlew /app/gradlew
COPY --from=build /app/gradle /app/gradle
COPY --from=build /app/settings.gradle /app/settings.gradle
COPY --from=build /app/build.gradle /app/build.gradle
ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]
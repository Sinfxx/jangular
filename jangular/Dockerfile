####################################
# Build stage — Ubuntu + Maven + JDK 25
####################################
FROM ubuntu:24.04 AS build

ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /opt

# Install tools
RUN apt-get update && \
    apt-get install -y wget tar unzip curl zip maven ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Download Amazon Corretto 25 (arm64 compatible)
RUN wget -O corretto25.tar.gz https://corretto.aws/downloads/latest/amazon-corretto-25-aarch64-linux-jdk.tar.gz && \
    tar -xzf corretto25.tar.gz && \
    mv amazon-corretto-25* /opt/jdk25

ENV JAVA_HOME=/opt/jdk25
ENV PATH=$JAVA_HOME/bin:$PATH

# Verify Java
RUN java -version

# Build application
WORKDIR /app
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

####################################
# Runtime stage — minimal Corretto 25
####################################
FROM ubuntu:24.04

WORKDIR /opt

# Copy prebuilt JDK
COPY --from=build /opt/jdk25 /opt/jdk25

ENV JAVA_HOME=/opt/jdk25
ENV PATH=$JAVA_HOME/bin:$PATH

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

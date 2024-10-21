FROM maven:3.8.5-openjdk-17

WORKDIR /app

VOLUME /tmp

COPY . /app

EXPOSE 8080

CMD ["mvn", "compile"]

#ENTRYPOINT ["tail", "-f", "/dev/null"] #debugging purposes
#ENTRYPOINT ["mvn", "clean", "spring-boot:run"]
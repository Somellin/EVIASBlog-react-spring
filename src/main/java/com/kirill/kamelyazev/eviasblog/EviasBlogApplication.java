package com.kirill.kamelyazev.eviasblog;

import com.kirill.kamelyazev.eviasblog.model.Post;
import com.kirill.kamelyazev.eviasblog.model.User;
import com.kirill.kamelyazev.eviasblog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EviasBlogApplication {

    public static void main(String[] args) {
        SpringApplication.run(EviasBlogApplication.class, args);
    }
}

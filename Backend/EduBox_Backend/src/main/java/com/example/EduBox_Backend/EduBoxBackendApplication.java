package com.example.EduBox_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("com.example.EduBox_Backend.Repository")
public class EduBoxBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EduBoxBackendApplication.class, args);
	}

}

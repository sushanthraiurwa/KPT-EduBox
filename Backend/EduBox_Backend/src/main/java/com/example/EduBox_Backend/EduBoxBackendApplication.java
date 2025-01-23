package com.example.EduBox_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("com.example.EduBox_Backend.Repository")
//@ComponentScan(basePackages = "com.example.EduBox_Backend.config") // Make sure CloudinaryConfig is in this package
public class EduBoxBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EduBoxBackendApplication.class, args);
	}

}

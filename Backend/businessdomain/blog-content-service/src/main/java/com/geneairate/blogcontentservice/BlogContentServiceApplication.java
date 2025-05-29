package com.geneairate.blogcontentservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BlogContentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogContentServiceApplication.class, args);
	}

}

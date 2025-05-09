package com.geneairate.template_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
public class TemplateServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(TemplateServiceApplication.class, args);
	}

}

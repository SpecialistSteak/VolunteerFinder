package org.drivenbysteak.VolunteerFinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class VolunteerFinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(VolunteerFinderApplication.class, args);
	}

//	@Override
//	public void run() {
//		 TODO Auto-generated method stub
//	}

	@GetMapping("/")
	public String home() {
		return "Hello World!";
	}

	@GetMapping("/test")
	public String test() {
		return "Hello World!";
	}
}

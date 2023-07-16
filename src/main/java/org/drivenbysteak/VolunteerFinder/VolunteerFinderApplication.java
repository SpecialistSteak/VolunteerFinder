package org.drivenbysteak.VolunteerFinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class VolunteerFinderApplication implements Runnable {

    public static void main(String[] args) {
        SpringApplication.run(VolunteerFinderApplication.class, args);
    }

    @Override
    public void run() {
//		 TODO Auto-generated method stub
    }

    @GetMapping("/")
    public String home() {
        return "Hello World!";
    }
}
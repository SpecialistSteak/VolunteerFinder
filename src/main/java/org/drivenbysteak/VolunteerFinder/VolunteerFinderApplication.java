package org.drivenbysteak.VolunteerFinder;

import com.google.gson.GsonBuilder;
import org.drivenbysteak.VolunteerFinder.UserInput.QueryGenerator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import static org.drivenbysteak.VolunteerFinder.WebScraper.Scraper.sendRequest;

@SpringBootApplication
@RestController
public class VolunteerFinderApplication implements Runnable {

    public static void main(String[] args) {
        SpringApplication.run(VolunteerFinderApplication.class, args);
    }

    @Override
    public void run() {}

    @PostMapping("/query")
    public String query(@RequestParam String city, @RequestParam String country, @RequestParam String[] keywords) {
        GsonBuilder gsonBuilder = new GsonBuilder()
                .setPrettyPrinting();
        return gsonBuilder.create().toJson(QueryGenerator.testQueryGenerator(city, country, keywords));
    }

    @GetMapping("/results")
    public String results(@RequestParam String query) {
        GsonBuilder gsonBuilder = new GsonBuilder()
                .setPrettyPrinting();
        return gsonBuilder.create().toJson(sendRequest(query));
    }

    @GetMapping("/test")
    public String test() {
        return "Hello World!";
    }
}
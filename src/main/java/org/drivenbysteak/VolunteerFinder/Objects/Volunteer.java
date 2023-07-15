package org.drivenbysteak.VolunteerFinder.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.net.URL;

@Data
@AllArgsConstructor
public class Volunteer {
    String url;
    String name;
    String description;
    String location;
    String image;

    public Volunteer() {
        this.url = "No relevant URL available.";
        this.name = "No name available.";
        this.description = "No description available.";
        this.location = "No location available.";
        this.image = "No image available.";
    }
}
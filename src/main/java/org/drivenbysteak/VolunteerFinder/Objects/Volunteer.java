package org.drivenbysteak.VolunteerFinder.Objects;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Volunteer {
    String url;
    String name;
    String description;
    String image;
    String phone;

    public Volunteer() {
        this.url = "No relevant URL available.";
        this.name = "No name available.";
        this.description = "No description available.";
        this.image = "No image available.";
        this.phone = "No phone number available.";
    }

    public String toString() {
        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .create();
        return gson.toJson(this);
    }
}
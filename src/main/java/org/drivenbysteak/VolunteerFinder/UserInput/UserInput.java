package org.drivenbysteak.VolunteerFinder.UserInput;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInput {

    String city;
    String country;
    String[] keywords;

    public UserInput() {
        this.city = " ";
        this.country = " ";
        this.keywords = new String[]{};
    }
}
package org.drivenbysteak.VolunteerFinder.UserInput;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInput {

    String city;
    String area;
    String[] keywords;

    public UserInput() {
        this.city = " ";
        this.area = " ";
        this.keywords = new String[]{};
    }
}
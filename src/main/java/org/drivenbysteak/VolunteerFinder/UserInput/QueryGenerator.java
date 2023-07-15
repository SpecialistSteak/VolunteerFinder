package org.drivenbysteak.VolunteerFinder.UserInput;

public class QueryGenerator {
    public static String UserInputToQuery(UserInput ui){
        StringBuilder query = new StringBuilder();
        query.append("https://www.google.com/search?q=");
        for (String keyword : ui.getKeywords()) {
            query.append(keyword);
            query.append("+");
        }
        query.append("volunteer+in+");
        query.append(ui.getCity());
        query.append("+");
        query.append(ui.getCountry());
        return query.toString();
    }

    public static String testQueryGenerator(String city, String country, String[] keywords){
        UserInput ui = new UserInput(city, country, keywords);
        return UserInputToQuery(ui);
    }

    public static void main(String[] args) {
        UserInput ui = new UserInput("London", "England", new String[]{"dog", "cat"});
        System.out.println(UserInputToQuery(ui));
    }
}

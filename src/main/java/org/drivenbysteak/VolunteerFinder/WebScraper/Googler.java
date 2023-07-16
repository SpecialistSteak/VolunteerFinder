package org.drivenbysteak.VolunteerFinder.WebScraper;

import lombok.experimental.UtilityClass;
import org.drivenbysteak.VolunteerFinder.Objects.Volunteer;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

@UtilityClass
public class Googler {
    public static void main(String[] args) {
//        String query = testQueryGenerator("London", "England", new String[]{"dog", "cat"});
//        System.out.println(query);
//        var x = sendGoogleRequest(query);
//        System.out.println(x.toString());
        searchWebsiteForLocation("https://www.hslm.ca/volunteer/", "London");
    }


    public static void searchWebsiteForLocation(String websiteUrl, String location) {
        try {
            Document document = Jsoup.connect(websiteUrl).get();

            Elements locationElements = document.getElementsContainingText(location);

            // Process or display the found location instances
            for (Element element : locationElements) {
                String foundLocation = element.text();
                System.out.println("Found location: " + foundLocation);
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    // Should trim the string, but I don't see how this could be run over the output of searchWebsiteForLocation
    // Perhaps its sleep deprivation
    public static String locationExtractor(Element element) {
        Element locationElement = element.selectFirst("section:has(div:last-child)");
        String location = locationElement != null ? locationElement.text().trim() : "";

        return location;
    }

    public static Volunteer[] sendGoogleRequest(String query) {
        try {
            Document response = Jsoup.connect(query).get();
            Elements searchItems = response.select(".g");
            Volunteer[] volunteers = new Volunteer[20];
            int index = 0;
            for (Element searchItem : searchItems) {
                if (index >= 20) {
                    break;
                }

                // Way to clean this shit up? Ugly ahh
                Element linkElement = searchItem.selectFirst("a");
                String url = linkElement != null ? linkElement.attr("href") : "";

                Element titleElement = searchItem.selectFirst("h3");
                String name = titleElement != null ? titleElement.text() : "";

                Element descriptionElement = searchItem.selectFirst(".s");
                String description = descriptionElement != null ? descriptionElement.text() : "";

                Element imageElement = searchItem.selectFirst("img");
                String image = imageElement != null ? imageElement.attr("src") : "";

                //search through website for the location they are based in (if it exists)
                // by searching for all instances of the location the user added

                /* Volunteer object
                String url;
                String name;
                String description;
                String location;
                String image;
                 */
                String location = "";
                Volunteer volunteer = new Volunteer(url, name, description, location, image);
                for (Volunteer volunteer1 : volunteers) {
                    //dosmthn
                }
                // Need to process the volunteer array, for loop on god
            }
            return volunteers;
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return null;
    }
    // this should be the parser
    // idk if we need to filter shit after this, maybe for description :pain:
    // then we need to store the data in an array or and object or some shit
    // that should be it
}

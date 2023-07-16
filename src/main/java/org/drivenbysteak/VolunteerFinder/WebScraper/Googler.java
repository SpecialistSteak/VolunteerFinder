package org.drivenbysteak.VolunteerFinder.WebScraper;

import lombok.experimental.UtilityClass;
import org.drivenbysteak.VolunteerFinder.Objects.Volunteer;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@UtilityClass
public class Googler {
    public static void main(String[] args) {
        String query = "https://www.google.com/search?q=dog+shelter+volunteer,+near+London+England";
        Volunteer[] volunteers = sendGoogleRequest(query);
        for (Volunteer e : volunteers) {
            System.out.println(e == null ? "null" : e.toString());
        }
    }

    //    DO NOT TOUCH!!! (No idea why this works)
    public static String GRAB_TELLY(String weburl) {
        String text = "";
        try {
            Document document = Jsoup.connect(weburl).get();
            String html = document.html();
            Pattern pattern = Pattern.compile("(?:(?:(\\s*\\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\)?\\s*(?:[.-]\\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})");
            Matcher matcher = pattern.matcher(html);
            if (matcher.find()) {
                text = matcher.group();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return text;
    }

    public static String searchWebsiteForLocation(String websiteUrl) {
        String location = "";
        try {
            Document document = Jsoup.connect(websiteUrl).get();
            Elements locationElements = document.select(".address, .location");

            for (Element element : locationElements) {
                location = locationExtractor(element);
                break;
            }

        } catch (Exception e) {
            System.out.println("Error. " + e.getMessage());
        }
        return location;
    }

    public static String GRAB_LOCAY(String weburl) {
        String text = "";
        try {
            Document document = Jsoup.connect(weburl).get();
            String html = document.html();
            Pattern pattern = Pattern.compile("\\b\\d+\\s+\\w+\\s+(?:Road|Street|Avenue|Lane|Drive|Court|Place|Boulevard)\\b");
            Matcher matcher = pattern.matcher(html);
            if (matcher.find()) {
                text = matcher.group();
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return text;
    }

    public static String locationExtractor(Element element) {
        Element locationElement = element.selectFirst("ul.address, ul.location");

        String location = locationElement != null ? locationElement.text().trim() : "";

        String pattern = "\\b\\d+\\s+\\w+\\s+(?:Road|Street|Avenue|Lane|Drive|Court|Place|Boulevard)\\b";
        Pattern regexPattern = Pattern.compile(pattern);
        Matcher matcher = regexPattern.matcher(location);

        String address = "";
        if (matcher.find()) {
            address = matcher.group().trim();
        }
        return address;
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

                Element linkElement = searchItem.selectFirst("a");
                String url = linkElement != null ? linkElement.attr("href") : "";

                Element titleElement = searchItem.selectFirst("h3");
                String name = titleElement != null ? titleElement.text() : "";

                Document doc = Jsoup.connect(url).get();
                String description = doc.select("meta[name=description]").attr("content");

                String image = findImage2(url);

                String phone = GRAB_TELLY(url);

                String location = GRAB_LOCAY(url);
                Volunteer volunteer = new Volunteer(url, name, description, location, image, phone);

                volunteers[index + 1] = volunteer;

                System.out.println("Created volunteer: " + volunteer.getName());

                index++;
            }
            System.out.println("Number of volunteers found: " + index);
            return volunteers;
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return null;
    }

    public static String imgCheck(String image) {
        image = (image.isEmpty() ? "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png" : image);
        image = (image.contains("http") ? image : "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png");
        return image;
    }

    private static String findImage2(String url) {
        Document doc = null;
        try {
            doc = Jsoup.connect(url).get();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Elements images = doc.select("img[src^=http:]");
        images.addAll(doc.select("img[src^=https:]"));
        String src = "";
        for (Element image : images) {
            src = image.attr("src");
            if (!src.contains("logo")) {
                System.out.println(src);
                break;
            }
        }
        src = (src.isEmpty() ? "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png" : src);
        src = imgCheck(src);
        return src;
    }
}
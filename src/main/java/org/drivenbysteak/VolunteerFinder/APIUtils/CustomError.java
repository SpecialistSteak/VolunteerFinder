package org.drivenbysteak.VolunteerFinder.APIUtils;

public class CustomError extends RuntimeException {
    public CustomError(String errorMessage) {
        super(errorMessage);
    }
}
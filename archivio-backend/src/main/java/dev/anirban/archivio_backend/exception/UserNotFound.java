package dev.anirban.archivio_backend.exception;

public class UserNotFound extends RuntimeException {
    public UserNotFound(String email) {
        super("User with the email " + email + " is not found !!");
    }
}
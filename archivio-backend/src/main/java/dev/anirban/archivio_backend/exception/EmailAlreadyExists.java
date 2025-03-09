package dev.anirban.archivio_backend.exception;

public class EmailAlreadyExists extends RuntimeException {
    public EmailAlreadyExists(String email) {
        super("The Provided Email : " + email + " already exists !!");
    }
}
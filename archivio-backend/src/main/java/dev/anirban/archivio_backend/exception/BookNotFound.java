package dev.anirban.archivio_backend.exception;

public class BookNotFound extends RuntimeException {
    public BookNotFound(String id) {
        super("Book with the given ID : " + id + " is not present !!");
    }
}
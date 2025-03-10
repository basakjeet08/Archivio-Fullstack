package dev.anirban.archivio_backend.exception;

public class UnAuthorizedRequest extends RuntimeException {
    public UnAuthorizedRequest() {
        super("Your are not authorized to make this api call !!");
    }
}
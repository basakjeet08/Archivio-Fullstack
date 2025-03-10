package dev.anirban.archivio_backend.exception;

import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Handling the global exception. This handles any and all exceptions thrown in the backend
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseWrapper<String>> handleException(Exception exception) {
        ResponseWrapper<String> response = new ResponseWrapper<>(exception.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handling unauthorized api calls exception. Occurs when the user doesn't have the permission for the api call
    @ExceptionHandler(UnAuthorizedRequest.class)
    public ResponseEntity<ResponseWrapper<String>> handleUnAuthorizedException(UnAuthorizedRequest exception) {
        ResponseWrapper<String> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }

    // Handling User not found Exception
    @ExceptionHandler(UserNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleUserNotFoundException(UserNotFound exception) {
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    // Handling Book not found exception
    @ExceptionHandler(BookNotFound.class)
    public ResponseEntity<ResponseWrapper<Void>> handleBookNotFoundException(BookNotFound exception) {
        ResponseWrapper<Void> response = new ResponseWrapper<>(exception.getMessage(), null);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }
}

package dev.anirban.archivio_backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping("/")
    public String handleRootRequest() {
        return "Hello Welcome to Archivio Backend Root URL";
    }
}

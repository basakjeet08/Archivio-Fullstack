package dev.anirban.archivio_backend.controllers;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RootController {

    @GetMapping(UrlConstants.PUBLIC_ROOT)
    public ResponseWrapper<Void> handlePublicRootRequest() {
        return new ResponseWrapper<>("Hello Welcome to Archivio Backend Public Root URL", null);
    }

    @GetMapping(UrlConstants.PRIVATE_ROOT)
    public ResponseWrapper<Void> handlePrivateRootRequest() {
        return new ResponseWrapper<>("Hello !! Welcome to Archivio Backend Private Root URL", null);
    }
}

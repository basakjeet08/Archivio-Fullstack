package dev.anirban.archivio_backend.controllers;

import dev.anirban.archivio_backend.constants.UrlConstants;
import dev.anirban.archivio_backend.dto.response.ResponseWrapper;
import dev.anirban.archivio_backend.dto.response.stats.StatsDto;
import dev.anirban.archivio_backend.service.StatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class StatsController {

    private final StatService service;

    // This function handles the stats request from a librarian
    @GetMapping(UrlConstants.LIBRARIAN_STATS)
    public ResponseWrapper<StatsDto> handleLibrarianStatRequest() {
        StatsDto statsDto = service.fetchLibrarianStats();
        return new ResponseWrapper<>("Librarian Statistics fetched Successfully !!", statsDto);
    }

    // This function handles the stats requests from a member
    @GetMapping(UrlConstants.MEMBER_STATS)
    public ResponseWrapper<StatsDto> handleMemberStatsRequest() {
        StatsDto statsDto = service.fetchMemberStats();
        return new ResponseWrapper<>("Member Statistics fetched Successfully !!", statsDto);
    }

    // This function handles the stats requests from an admin
    @GetMapping(UrlConstants.ADMIN_STATS)
    public ResponseWrapper<StatsDto> handleAdminStatsRequest() {
        StatsDto statsDto = service.fetchAdminStats();
        return new ResponseWrapper<>("Admin Statistics fetched Successfully !!", statsDto);
    }
}
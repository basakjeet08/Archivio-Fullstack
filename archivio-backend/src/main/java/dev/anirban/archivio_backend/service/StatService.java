package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.response.stats.BookStats;
import dev.anirban.archivio_backend.dto.response.stats.LibrarianStats;
import dev.anirban.archivio_backend.dto.response.stats.MemberStats;
import dev.anirban.archivio_backend.dto.response.stats.StatsDto;
import dev.anirban.archivio_backend.entity.Book;
import dev.anirban.archivio_backend.entity.Librarian;
import dev.anirban.archivio_backend.entity.Member;
import dev.anirban.archivio_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatService {

    private final BookService bookService;
    private final MemberService memberService;
    private final LibrarianService librarianService;

    // This function adds the Book Stats in the Object
    private void generateBookStats(StatsDto statsDto) {

        // Fetching all the books from the database
        List<Book> bookList = bookService.findAllByOrderByTimesRequestedDesc();

        // Generating the total number of books and the most 3 popular books
        int totalBooks = bookList.size();
        String mostRequestedBook = "None";

        if (totalBooks != 0)
            mostRequestedBook = bookList
                    .stream()
                    .limit(1)
                    .map(Book::getTitle)
                    .toList()
                    .getFirst();

        // Setting the book stats to the response object
        BookStats bookStats = BookStats
                .builder()
                .totalBooks(totalBooks)
                .mostRequestedBook(mostRequestedBook)
                .build();
        statsDto.setBookStats(bookStats);
    }

    // This function adds the member stats in the Object
    private void generateMemberStats(StatsDto statsDto) {

        // Fetching all the members from the database
        List<Member> memberList = memberService.findAllByOrderByBookRequestCountDesc();

        // Generating the total members and the most frequent requesters
        int totalMember = memberList.size();
        String mostFrequentMember = "None";
        if (totalMember != 0)
            mostFrequentMember = memberList
                    .stream()
                    .limit(3)
                    .map(User::getName)
                    .toList()
                    .getFirst();

        // Setting the member stats to the response object
        MemberStats memberStats = MemberStats
                .builder()
                .totalMembers(totalMember)
                .mostFrequentMember(mostFrequentMember)
                .build();
        statsDto.setMemberStats(memberStats);
    }

    // This function adds the librarian stats in the Object
    private void generateLibrarianStats(StatsDto statsDto) {

        // Fetching all the librarian from the database
        List<Librarian> librarianList = librarianService.findAllByOrderByRequestsApprovedDesc();

        // Generating the total number and the most active librarian
        int totalLibrarian = librarianList.size();
        String mostActiveLibrarian = "None";
        if (totalLibrarian != 0)
            mostActiveLibrarian = librarianList
                    .stream()
                    .limit(1)
                    .map(User::getName)
                    .toList()
                    .getFirst();

        // Setting the librarian stats to the response object
        LibrarianStats librarianStats = LibrarianStats
                .builder()
                .totalLibrarians(totalLibrarian)
                .mostActiveLibrarian(mostActiveLibrarian)
                .build();
        statsDto.setLibrarianStats(librarianStats);
    }

    // This function returns the stats for the member dashboard
    public StatsDto fetchMemberStats() {
        // Creating a new Response Object which will be passed to all the stat generation functions
        StatsDto statsDto = new StatsDto();

        // Adding the Book Stats
        generateBookStats(statsDto);

        return statsDto;
    }

    // This function returns the stats for the librarian dashboard
    public StatsDto fetchLibrarianStats() {
        // Creating a new Response Object which will be passed to all the stat generation functions
        StatsDto statsDto = new StatsDto();

        // Adding the Book Stats and member stats
        generateBookStats(statsDto);
        generateMemberStats(statsDto);

        return statsDto;
    }

    // This function returns the stats for the admin dashboard
    public StatsDto fetchAdminStats() {
        // Creating a new Response Object which will be passed to all the stat generation functions
        StatsDto statsDto = new StatsDto();

        // Adding the Book Stats , member stats and the librarian stats
        generateBookStats(statsDto);
        generateMemberStats(statsDto);
        generateLibrarianStats(statsDto);

        return statsDto;
    }
}
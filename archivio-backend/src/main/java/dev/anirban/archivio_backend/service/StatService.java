package dev.anirban.archivio_backend.service;

import dev.anirban.archivio_backend.dto.response.stats.BookStats;
import dev.anirban.archivio_backend.dto.response.stats.MemberStats;
import dev.anirban.archivio_backend.dto.response.stats.StatsDto;
import dev.anirban.archivio_backend.entity.Book;
import dev.anirban.archivio_backend.entity.Member;
import dev.anirban.archivio_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatService {

    /**
     * Librarian Stats :-
     * .. Total Number of Librarians
     * .. Each Librarian Number of approves
     * .. Each librarian number of rejects
     */
    private final BookService bookService;
    private final MemberService memberService;

    // This function adds the Book Stats in the Object
    private void generateBookStats(StatsDto statsDto) {

        // Fetching all the books from the database
        List<Book> bookList = bookService.findAllByOrderByTimesRequestedDesc();

        // Generating the total number of books and the most 3 popular books
        Integer totalBooks = bookList.size();
        String mostRequestedBook = bookList
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
        Integer totalMember = memberList.size();
        String mostFrequentMember = memberList
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
}
package dev.anirban.archivio_backend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Member_DB")
public class Member extends User {

    @Column(name = "book_request_count", nullable = false)
    private Integer bookRequestCount;

    public void incrementRequestCount() {
        this.bookRequestCount++;
    }
}

package com.example.EduBox_Backend.Repository;

import com.example.EduBox_Backend.Model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NoteRepository extends MongoRepository<Note, Long> {
    // Method to filter subjects by branch and semester
    List<Note> findByBranchAndSemester(String branch, String semester);
}

package com.example.EduBox_Backend.Service;

import com.example.EduBox_Backend.Model.Note;
import com.example.EduBox_Backend.Repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    // Fetch subjects by branch and semester
    public List<Note> getSubjects(String branch, String semester) {
        return noteRepository.findByBranchAndSemester(branch, semester);
    }

    // Add a new subject
    public Note addSubject(Note note) {
        return noteRepository.save(note);
    }

    // Delete a subject by ID
    public void deleteSubject(String id) {
        noteRepository.deleteById(id);
    }
}

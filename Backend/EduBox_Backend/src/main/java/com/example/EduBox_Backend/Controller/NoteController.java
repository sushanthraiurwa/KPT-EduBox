package com.example.EduBox_Backend.Controller;

import com.example.EduBox_Backend.Model.Note;
import com.example.EduBox_Backend.Service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/subjects")
public class NoteController {

    @Autowired
    private NoteService noteService;

    // Endpoint to get subjects by branch and semester
    @GetMapping
    public List<Note> getSubjects(@RequestParam String branch, @RequestParam String semester) {
        return noteService.getSubjects(branch, semester);
    }

    // Endpoint to add a new subject
    @PostMapping
    public Note addSubject(@RequestBody Note note) {
        return noteService.addSubject(note);
    }

    // Endpoint to delete a subject by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable String id) {
        noteService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}

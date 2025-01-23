package com.example.EduBox_Backend.Controller;

import  com.example.EduBox_Backend.Model.QuestionPaper;
import com.example.EduBox_Backend.Service.QuestionPaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/questionpapers")
public class QuestionPaperController {

    @Autowired
    private QuestionPaperService service;

    // GET method to fetch filtered question papers based on branch, semester, and year
    @GetMapping
    public List<QuestionPaper> getFilteredQuestionPapers(
            @RequestParam String branch,
            @RequestParam String sem,
            @RequestParam int year) {
        return service.getFilteredQuestionPapers(branch, sem, year);
    }

    // POST method to add a new question paper
    @PostMapping
    public QuestionPaper addQuestionPaper(@RequestBody QuestionPaper questionPaper) {
        return service.addQuestionPaper(questionPaper);
    }

    // DELETE method to remove a question paper by ID
    @DeleteMapping("/{id}")
    public void deleteQuestionPaper(@PathVariable Long id) {
        service.deleteQuestionPaper(id);
    }
}

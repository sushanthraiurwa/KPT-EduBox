package com.example.EduBox_Backend.Service;

import com.example.EduBox_Backend.Model.QuestionPaper;
import com.example.EduBox_Backend.Repository.QuestionPaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class QuestionPaperService {

    @Autowired
    private QuestionPaperRepository repository;

    // Fetch filtered question papers based on branch, semester, and year
    public List<QuestionPaper> getFilteredQuestionPapers(String branch, String sem, int year) {
        return repository.findByBranchAndSemAndYear(branch, sem, year);
    }

    // Add a new question paper
    public QuestionPaper addQuestionPaper(QuestionPaper questionPaper) {
        return repository.save(questionPaper);
    }

    // Delete a question paper by ID
    public void deleteQuestionPaper(Long id) {
        repository.deleteById(id);
    }
}

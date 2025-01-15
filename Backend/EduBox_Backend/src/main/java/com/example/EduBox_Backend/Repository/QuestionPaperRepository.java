package com.example.EduBox_Backend.Repository;

import com.example.EduBox_Backend.Model.QuestionPaper;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionPaperRepository extends MongoRepository<QuestionPaper, Long> {
    List<QuestionPaper> findByBranchAndSemAndYear(String branch, String sem, int year);
}

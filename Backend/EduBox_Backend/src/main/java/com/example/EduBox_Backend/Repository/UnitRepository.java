package com.example.EduBox_Backend.Repository;

import com.example.EduBox_Backend.Model.Unit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnitRepository extends MongoRepository<Unit, String> {

    // Custom query to find Units by branch, semester, and subject
    List<Unit> findByBranchAndSemesterAndSubject(String branch, String semester, String subject);
}

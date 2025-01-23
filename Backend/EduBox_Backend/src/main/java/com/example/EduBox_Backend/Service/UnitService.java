package com.example.EduBox_Backend.Service;

import com.example.EduBox_Backend.Model.Unit;
import com.example.EduBox_Backend.Repository.UnitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitService {

    @Autowired
    private UnitRepository unitRepository;

    // Method to fetch Units by branch, semester, and subject
    public List<Unit> getUnitsByBranchSemesterSubject(String branch, String semester, String subject) {
        return unitRepository.findByBranchAndSemesterAndSubject(branch, semester, subject);
    }

    // Method to save a new Unit (Module)
    public Unit saveUnit(Unit unit) {
        return unitRepository.save(unit);
    }

    // Method to delete a Unit by ID
    public void deleteUnit(String id) {
        unitRepository.deleteById(id);
    }
}

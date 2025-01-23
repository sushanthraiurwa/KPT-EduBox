package com.example.EduBox_Backend.Controller;

import com.example.EduBox_Backend.Model.Unit;
import com.example.EduBox_Backend.Service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RestController
@RequestMapping("/api/unit") // Base URL for Unit-related endpoints
public class UnitController {

    @Autowired
    private UnitService unitService;

    // GET method to fetch Units by branch, semester, and subject
    @GetMapping
    public List<Unit> getFilteredUnits(
            @RequestParam String branch,
            @RequestParam String semester,
            @RequestParam String subject) {
        return unitService.getUnitsByBranchSemesterSubject(branch, semester, subject);
    }

    // POST method to add a new Unit (Module)
    @PostMapping
    public Unit addUnit(@RequestBody Unit unit) {
        try {
            // Save the Unit in MongoDB
            return unitService.saveUnit(unit);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to add unit. Please try again.");
        }
    }

    // DELETE method to remove a unit by ID
    @DeleteMapping("/{id}")
    public void deleteUnit(@PathVariable String id) {
        unitService.deleteUnit(id);
    }
}

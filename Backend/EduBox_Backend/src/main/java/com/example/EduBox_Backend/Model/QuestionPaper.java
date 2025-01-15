package com.example.EduBox_Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;



@Document
public class QuestionPaper {

    @Id
    private String id;
    private String branch;
    private String sem;
    private String subjectName;
    private String cie1; // Now a String to store link for CIE1
    private String cie2; // Now a String to store link for CIE2
    private String cie3; // Now a String to store link for CIE3
    private String see;  // Now a String to store link for SEE
    private int year;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSem() {
        return sem;
    }

    public void setSem(String sem) {
        this.sem = sem;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getCie1() {
        return cie1;
    }

    public void setCie1(String cie1) {
        this.cie1 = cie1;
    }

    public String getCie2() {
        return cie2;
    }

    public void setCie2(String cie2) {
        this.cie2 = cie2;
    }

    public String getCie3() {
        return cie3;
    }

    public void setCie3(String cie3) {
        this.cie3 = cie3;
    }

    public String getSee() {
        return see;
    }

    public void setSee(String see) {
        this.see = see;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}

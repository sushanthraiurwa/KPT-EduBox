    package com.example.EduBox_Backend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

    @Document
    public class Unit {
    
        @Id
        private String id;
    
        private String branch;
        private String semester;
        private String subject;
        private String moduleNo;
        private String moduleName;
        private String pdfLink;
    
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
    
        public String getSemester() {
            return semester;
        }
    
        public void setSemester(String semester) {
            this.semester = semester;
        }
    
        public String getSubject() {
            return subject;
        }
    
        public void setSubject(String subject) {
            this.subject = subject;
        }
    
        public String getModuleNo() {
            return moduleNo;
        }
    
        public void setModuleNo(String moduleNo) {
            this.moduleNo = moduleNo;
        }
    
        public String getModuleName() {
            return moduleName;
        }
    
        public void setModuleName(String moduleName) {
            this.moduleName = moduleName;
        }
    
        public String getPdfLink() {
            return pdfLink;
        }
    
        public void setPdfLink(String pdfLink) {
            this.pdfLink = pdfLink;
        }
    }

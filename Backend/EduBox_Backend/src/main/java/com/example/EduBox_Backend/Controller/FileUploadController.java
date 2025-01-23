package com.example.EduBox_Backend.Controller;

import com.example.EduBox_Backend.Service.CloudinaryService;

import java.io.IOException;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api") // Base URL for file upload endpoints
@CrossOrigin(origins = "http://localhost:3000")
public class FileUploadController {

    @Autowired
    private CloudinaryService cloudinaryService;

    // POST method to upload a PDF file and return the URL
    @PostMapping("/uploadPdf")
    public ResponseEntity<?> uploadPdf(@RequestParam("file") MultipartFile file) {
        try {
            // Upload the PDF to Cloudinary and get the URL
            String pdfLink = cloudinaryService.uploadPdf(file);
            return ResponseEntity.ok(new PdfResponse(pdfLink)); // Return the PDF link in the response
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Only PDF files are allowed.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.SC_INTERNAL_SERVER_ERROR)
                                 .body("Failed to upload PDF. Please try again.");
        }
    }

    // Response DTO class for the PDF link
    public static class PdfResponse {
        private String pdfLink;

        public PdfResponse(String pdfLink) {
            this.pdfLink = pdfLink;
        }

        public String getPdfLink() {
            return pdfLink;
        }

        public void setPdfLink(String pdfLink) {
            this.pdfLink = pdfLink;
        }
    }
}

package com.example.EduBox_Backend.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService() {
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dkobdfhtm", // Replace with your Cloudinary cloud name
                "api_key", "695886672674188",       // Replace with your API key
                "api_secret", "Ypsgt7uG6qp6o4K85QN_3YVPKH0" // Replace with your API secret
        ));
    }

    public String uploadPdf(MultipartFile file) throws IOException {
        // Ensure the file is a PDF and handle it accordingly
        if (file.getContentType() != null && !file.getContentType().equals("application/pdf")) {
            throw new IllegalArgumentException("Only PDF files are allowed.");
        }

        // Upload the file to Cloudinary with the correct parameters
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "resource_type", "image" // For PDF files, use 'raw' as resource_type
        ));

        // Return the secure URL of the uploaded file
        return uploadResult.get("secure_url").toString();
    }
}

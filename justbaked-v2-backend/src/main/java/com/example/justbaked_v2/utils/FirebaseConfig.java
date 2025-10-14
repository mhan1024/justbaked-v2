package com.example.justbaked_v2.utils;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;

import java.io.FileInputStream;

@Configuration
public class FirebaseConfig {
	
	@PostConstruct
    public void initialize() {
        try {
            String firebaseCreds = System.getenv("FIREBASE_CONFIG");
            if (firebaseCreds == null) {
                throw new IllegalStateException("FIREBASE_CONFIG not set");
            }

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(new FileInputStream(firebaseCreds)))
                    .build();

            FirebaseApp.initializeApp(options);
            System.out.println("✅ Firebase initialized successfully");
        } catch (Exception e) {
            throw new RuntimeException("❌ Failed to initialize Firebase", e);
        }
        
	}

}

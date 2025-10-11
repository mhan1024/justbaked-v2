package com.example.justbaked_v2.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.justbaked_v2.model.*;
import com.example.justbaked_v2.repository.*;
import com.example.justbaked_v2.utils.*;
import java.util.*;
import jakarta.transaction.Transactional;
import java.io.IOException;

@Service
public class ImageDataService {
	
	private ImageDataRepository idr;
	
	public ImageDataService(ImageDataRepository idr) {
        this.idr = idr;
    }
	
	public ImageData uploadImage(MultipartFile file) throws IOException {
		return idr.save(ImageData.builder()
				.name(file.getOriginalFilename())
				.type(file.getContentType())
				.imageData(ImageUtil.compressImage(file.getBytes())).build());
		 
	}
	
	@Transactional
	public ImageData getInfoByImageByName(String name) {
		Optional<ImageData> dbImage = idr.findByName(name);
		
		return ImageData.builder()
				.name(dbImage.get().getName())
				.type(dbImage.get().getType())
				.imageData(ImageUtil.decompressImage(dbImage.get().getImageData())).build();
	}
	
	@Transactional
	public byte[] getImage(String name) {
		Optional<ImageData> dbImage = idr.findByName(name);
		byte[] image = ImageUtil.decompressImage(dbImage.get().getImageData());
		return image;
	}
	
	public void deleteImageByName(String name) {
		Optional<ImageData> dbImage = idr.findByName(name);
		
		idr.deleteById(dbImage.get().getId());
	}
}

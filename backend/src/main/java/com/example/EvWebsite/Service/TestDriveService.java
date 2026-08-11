package com.example.EvWebsite.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.EvWebsite.entity.TestDrive;
import com.example.EvWebsite.repo.TestDriveRepo;
import com.example.EvWebsite.repo.evrepo;

@Service
public class TestDriveService {

    private final TestDriveRepo testDriveRepo;
    private final evrepo userRepo;

    public TestDriveService(TestDriveRepo testDriveRepo, evrepo userRepo) {
        this.testDriveRepo = testDriveRepo;
        this.userRepo = userRepo;
    }

    public TestDrive bookTestDrive(TestDrive testDrive) {

        if (!userRepo.findByEmail(testDrive.getEmail()).isPresent()) {
            return null;
        }

        testDrive.setStatus("PENDING");

        return testDriveRepo.save(testDrive);
    }

    public List<TestDrive> getAllBookings() {

        return testDriveRepo.findAll();
    }

    public TestDrive updateStatus(Long id, String status) {

        TestDrive booking = testDriveRepo.findById(id).orElse(null);

        if (booking == null) {
            return null;
        }

        booking.setStatus(status);

        return testDriveRepo.save(booking);
    }
}
package com.example.EvWebsite.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.EvWebsite.Service.TestDriveService;
import com.example.EvWebsite.entity.TestDrive;

@CrossOrigin(origins = "http://127.0.0.1:5501")
@RestController
@RequestMapping("/api/testdrive")
public class TestDriveController 
{

    private final TestDriveService testDriveService;

    public TestDriveController(TestDriveService testDriveService) {
        this.testDriveService = testDriveService;
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookTestDrive(@RequestBody TestDrive testDrive) {

        TestDrive booking = testDriveService.bookTestDrive(testDrive);

        if (booking == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Please login before booking a test drive.");
        }

        return ResponseEntity.ok(booking);
    }


    @GetMapping("/all")
    public ResponseEntity<List<TestDrive>> getAllBookings() {

        return ResponseEntity.ok(
                testDriveService.getAllBookings()
        );
    }


    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmBooking(@PathVariable Long id) {

        TestDrive booking =
                testDriveService.updateStatus(id, "CONFIRMED");

        if (booking == null) 
        {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Booking not found.");
        }

        return ResponseEntity.ok(booking);
    }


    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {

        TestDrive booking =
                testDriveService.updateStatus(id, "CANCELLED");

        if (booking == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Booking not found.");
        }

        return ResponseEntity.ok(booking);
    }
}
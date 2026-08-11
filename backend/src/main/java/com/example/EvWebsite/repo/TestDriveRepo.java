package com.example.EvWebsite.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EvWebsite.entity.TestDrive;

public interface TestDriveRepo extends JpaRepository<TestDrive, Long> 
{

}
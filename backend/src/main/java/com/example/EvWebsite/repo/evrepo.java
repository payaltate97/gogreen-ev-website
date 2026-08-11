package com.example.EvWebsite.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EvWebsite.entity.user;

public interface evrepo extends JpaRepository<user, Long> {

    Optional<user> findByEmail(String email);

}
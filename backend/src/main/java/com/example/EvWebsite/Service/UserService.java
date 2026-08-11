package com.example.EvWebsite.Service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.EvWebsite.entity.user;
import com.example.EvWebsite.repo.evrepo;

@Service
public class UserService {

    private final evrepo repo;

    public UserService(evrepo repo) {
        this.repo = repo;
    }

    public user registerUser(user user) {

        Optional<user> existingUser = repo.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            return null;
        }

        return repo.save(user);
    }

    public user loginUser(String email, String password) {

        Optional<user> optionalUser = repo.findByEmail(email);

        if (optionalUser.isPresent()) {

            user user = optionalUser.get();

            if (user.getPassword().equals(password)) {
                return user;
            }
        }

        return null;
    }
}
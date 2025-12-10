package com.budgetbuddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.budgetbuddy.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
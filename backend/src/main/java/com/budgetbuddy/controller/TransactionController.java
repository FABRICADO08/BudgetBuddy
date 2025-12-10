package com.budgetbuddy.controller;

import com.budgetbuddy.entity.Transaction; // Corrected import
import com.budgetbuddy.entity.User;
import com.budgetbuddy.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionRepository transactionRepository;

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(transactionRepository.findAllByUserId(user.getId()));
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction,
            @AuthenticationPrincipal User user) {
        transaction.setUser(user);
        return ResponseEntity.ok(transactionRepository.save(transaction));
    }
}
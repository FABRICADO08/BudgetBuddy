package main.controller;

import main.entity.Transaction;
import main.entity.User;
import main.repository.TransactionRepository;
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
            @AuthenticationPrincipal User user
    ) {
        transaction.setUser(user);
        return ResponseEntity.ok(transactionRepository.save(transaction));
    }
}
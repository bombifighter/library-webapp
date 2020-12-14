package com.botond.librarybackend.controller;

import com.botond.librarybackend.entity.Borrow;
import com.botond.librarybackend.service.BorrowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrows")
public class BorrowController {

    @Autowired
    BorrowService borrowService;

    @GetMapping(path = "/getAllBorrows")
    List<Borrow> fetchBorrows() {
        return borrowService.getAllBorrows();
    }

    @PostMapping("/newBorrow")
    @ResponseStatus(HttpStatus.CREATED)
    void newBorrow(@RequestBody Borrow newBorrow) {
        System.out.println(newBorrow.getBookId());
        borrowService.newBorrow(newBorrow);
    }

    @DeleteMapping("/delete/{id}")
    void deleteBorrow(@PathVariable Long id) {
        borrowService.deleteBorrow(id);
    }

    @PatchMapping("/extendBorrow/{id}")
    void extendBorrow(@PathVariable Long id) {
        borrowService.extendBorrow(id);
    }
}

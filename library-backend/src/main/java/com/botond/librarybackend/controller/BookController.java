package com.botond.librarybackend.controller;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping(path = "/getAllBooks")
    List<Book> fetchBooks() {
        return bookService.getAllBook();
    }

    @PostMapping("/newBook")
    @ResponseStatus(HttpStatus.CREATED)
    void newBook(@RequestBody Book newBook) {
        bookService.addBook(newBook);
    }

    @DeleteMapping("/delete/{id}")
    void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    @PatchMapping("/updateQuantity/{id}")
    void updateQuantity(@PathVariable Long id, @RequestBody Map<String, Long> update) {
        bookService.updateQuantity(id, update.get("quantity"));
    }

    @PatchMapping("/updateDescription/{id}")
    void updateDescription(@PathVariable Long id, @RequestBody Map<String, String> update) {
        bookService.updateDescription(id, update.get("description"));
    }
}

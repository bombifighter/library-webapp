package com.botond.librarybackend.controller;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping(path = "/getAllBooks")
    List<Book> fetchBooks() {
        return bookService.getAllBook();
    }

    @GetMapping(path = "/{id}")
    Book getById(@PathVariable Long id) {
        return bookService.getBookById(id);
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

    @PutMapping("/update/{id}")
    void updateProperties(@PathVariable Long id, @RequestBody Book modifiedBook) {
        bookService.modifyBook(id, modifiedBook);
    }

    @PatchMapping("/updateQuantity/{id}")
    void updateQuantity(@PathVariable Long id, @RequestBody Map<String, Long> update) {
        bookService.updateQuantity(id, update.get("quantity"));
    }

    @PatchMapping("/updateQuantityByOne/{id}")
    void updateQuantity(@PathVariable Long id) {
        bookService.updateQuantityByOne(id);
    }
}

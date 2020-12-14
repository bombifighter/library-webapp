package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    public List<Book> getAllBook() {
        return new ArrayList<>(bookRepository.findAll());
    }

    public void addBook(Book newBook) {
        bookRepository.save(newBook);
    }

    public void deleteBook(Long Id) {
        bookRepository.deleteById(Id);
    }

    public void updateQuantity(Long Id, Long newQuantity) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setQuantity(newQuantity);
                    return bookRepository.save(x);
                    });
    }

    public void updateDescription(Long Id, String newDesc) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setDescription(newDesc);
                    return bookRepository.save(x);
                });
    }
}

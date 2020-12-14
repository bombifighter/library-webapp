package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.error.BookAlreadyExistsException;
import com.botond.librarybackend.error.BookNotFoundException;
import com.botond.librarybackend.error.QuantityMinimumReachedException;
import com.botond.librarybackend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        List<Book> books = getAllBook();
        for (Book book : books) {
            if(newBook.getISBN().equals(book.getISBN())) {
                throw new BookAlreadyExistsException(newBook.getISBN());
            }
        }
        bookRepository.save(newBook);
    }

    public Book getBookById(Long Id) {
        return bookRepository.findById(Id)
                .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void deleteBook(Long Id) {
        List<Book> books = getAllBook();
        for (Book book : books) {
            if(book.getId().equals(Id)) {
                bookRepository.deleteById(Id);
                return;
            }
        }
        throw new BookNotFoundException(Id);
    }

    public void updateQuantity(Long Id, Long newQuantity) {
        if (newQuantity < 0) {
            throw new QuantityMinimumReachedException();
        }
        bookRepository.findById(Id)
                .map(x -> {
                    x.setQuantity(newQuantity);
                    return bookRepository.save(x);
                    })
        .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void updateDescription(Long Id, String newDesc) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setDescription(newDesc);
                    return bookRepository.save(x);
                })
        .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void updateTitle(Long Id, String newTitle) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setTitle(newTitle);
                    return bookRepository.save(x);
                })
                .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void updateAuthor(Long Id, String newAuthor) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setAuthor(newAuthor);
                    return bookRepository.save(x);
                })
                .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void updateGenre(Long Id, Long newGenre) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setGenreId(newGenre);
                    return bookRepository.save(x);
                })
                .orElseThrow(() -> new BookNotFoundException(Id));
    }
}

package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.entity.Borrow;
import com.botond.librarybackend.error.BookAlreadyExistsException;
import com.botond.librarybackend.error.BookNotFoundException;
import com.botond.librarybackend.error.BooksInBorrowException;
import com.botond.librarybackend.error.QuantityMinimumReachedException;
import com.botond.librarybackend.repository.BookRepository;
import com.botond.librarybackend.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    BorrowRepository borrowRepository;

    public List<Book> getAllBook() {
        return new ArrayList<>(bookRepository.findAll());
    }

    public void addBook(Book newBook) {
        if (newBook.getQuantity() < 0) {
            throw new QuantityMinimumReachedException();
        }
        List<Book> books = getAllBook();
        for (Book book : books) {
            if(newBook.getISBN().equals(book.getISBN())) {
                throw new BookAlreadyExistsException(newBook.getISBN());
            }
        }
        newBook.setInborrow(0L);
        bookRepository.save(newBook);
    }

    public Book getBookById(Long Id) {
        return bookRepository.findById(Id)
                .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void deleteBook(Long Id) {
        List<Book> books = new ArrayList<Book>(bookRepository.findAll());
        for (Book book : books) {
            if(book.getId().equals(Id)) {
                List<Borrow> borrows = new ArrayList<Borrow>(borrowRepository.findAll());
                for (Borrow borrow : borrows) {
                    if(Id.equals(borrow.getBookId())) {
                        throw new BooksInBorrowException(Id);
                    }
                }
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

    public void updateQuantityByOne(Long Id) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setQuantity(x.getQuantity() + 1);
                    return bookRepository.save(x);
                })
                .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void reduceInBorrow(Long Id) {
        bookRepository.findById(Id)
                .map(x -> {
                    x.setInborrow(x.getInborrow()-1);
                    return bookRepository.save(x);
                })
                .orElseThrow(() -> new BookNotFoundException(Id));
    }

    public void modifyBook(Long Id, Book modifiedBook) {
        if(modifiedBook.getQuantity() < 0) {
            throw new QuantityMinimumReachedException();
        }
        bookRepository.findById(Id)
                .map(x -> {
                    x.setISBN(modifiedBook.getISBN());
                    x.setTitle(modifiedBook.getTitle());
                    x.setAuthor(modifiedBook.getAuthor());
                    x.setGenre(modifiedBook.getGenre());
                    x.setDescription(modifiedBook.getDescription());
                    x.setQuantity(modifiedBook.getQuantity());
                    return bookRepository.save(x);
                })
                .orElseThrow(() -> new BookNotFoundException(Id));
    }
}

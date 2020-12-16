package com.botond.librarybackend.error;

public class BooksInBorrowException extends RuntimeException {

    public BooksInBorrowException(Long id) {
        super("Delete not possible, book(s) already borrowed of book id: " + id);
    }
}

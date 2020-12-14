package com.botond.librarybackend.error;

public class BookNotFoundException extends RuntimeException{

    public BookNotFoundException(Long id) {
        super("Book with '" + id + "' ID not found");
    }
}

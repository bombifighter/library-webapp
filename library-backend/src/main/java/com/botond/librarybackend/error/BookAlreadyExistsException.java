package com.botond.librarybackend.error;

public class BookAlreadyExistsException extends RuntimeException{

    public BookAlreadyExistsException(String isbn) {
        super("Book with '" + isbn + "' ISBN already exists");
    }
}

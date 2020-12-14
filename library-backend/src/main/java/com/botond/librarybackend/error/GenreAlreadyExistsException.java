package com.botond.librarybackend.error;

public class GenreAlreadyExistsException extends RuntimeException{

    public GenreAlreadyExistsException(String name) {
        super("'" + name + "' genre already exists");
    }
}

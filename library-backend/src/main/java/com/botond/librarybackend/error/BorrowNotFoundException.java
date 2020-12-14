package com.botond.librarybackend.error;

public class BorrowNotFoundException extends RuntimeException {

    public BorrowNotFoundException(Long Id) {
        super("Borrow with id:" + Id + " not found");
    }
}

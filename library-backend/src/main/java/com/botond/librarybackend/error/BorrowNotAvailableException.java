package com.botond.librarybackend.error;

public class BorrowNotAvailableException extends RuntimeException {

    public BorrowNotAvailableException (String bookName) {
        super("Borrow not possible: '" + bookName + "' not in stock");
    }
}

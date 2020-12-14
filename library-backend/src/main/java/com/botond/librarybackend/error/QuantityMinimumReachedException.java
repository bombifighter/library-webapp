package com.botond.librarybackend.error;

public class QuantityMinimumReachedException extends RuntimeException{

    public QuantityMinimumReachedException() {
        super("Book quantity cannot be lower than 0");
    }
}

package com.botond.librarybackend.error;

public class InvalidUsernameException extends RuntimeException{

    public InvalidUsernameException(String username) {
        super("'" + username + "' is not a valid username");
    }
}

package com.botond.librarybackend.error;

public class UserNameNotUniqueException extends RuntimeException{

    public UserNameNotUniqueException(String username) {
        super("'" + username + "' username is not unique");
    }
}

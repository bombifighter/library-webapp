package com.botond.librarybackend.error;


public class CredentialNotFoundException extends RuntimeException{

    public CredentialNotFoundException(Long id) {
        super("No credentials to userID: " + id);
    }
}

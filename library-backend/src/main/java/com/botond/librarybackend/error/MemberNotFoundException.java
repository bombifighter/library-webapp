package com.botond.librarybackend.error;

public class MemberNotFoundException extends RuntimeException{

    public MemberNotFoundException(Long Id) {
        super("Member with id:" + Id + " not found");
    }

    public MemberNotFoundException(String username) {
        super("'" + username + "' username not found");
    }
}

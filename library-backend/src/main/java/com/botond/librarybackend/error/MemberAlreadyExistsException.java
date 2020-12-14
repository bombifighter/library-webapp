package com.botond.librarybackend.error;

public class MemberAlreadyExistsException extends RuntimeException {

    public MemberAlreadyExistsException(Long Id) {
        super("Member already exists with id:" + Id);
    }
}

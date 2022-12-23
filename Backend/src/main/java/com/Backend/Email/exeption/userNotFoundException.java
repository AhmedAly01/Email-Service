package com.Backend.Email.exeption;

public class userNotFoundException extends RuntimeException {
    public userNotFoundException(String s) {
        super(s);
    }
}

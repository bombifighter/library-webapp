package com.botond.librarybackend.entity;


import javax.persistence.*;

@Entity
@Table(name = "CREDS")
public class Credential {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column
    private String password;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

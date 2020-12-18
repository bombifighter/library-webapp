package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Borrow;
import com.botond.librarybackend.entity.Credential;
import com.botond.librarybackend.entity.Member;
import com.botond.librarybackend.error.CredentialNotFoundException;
import com.botond.librarybackend.error.MemberAlreadyExistsException;
import com.botond.librarybackend.error.MemberNotFoundException;
import com.botond.librarybackend.repository.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class CredentialService {

    @Autowired
    CredentialRepository credentialRepository;

    public Credential getMemberCredential(Long memberId) {
        return credentialRepository.findById(memberId)
                .orElseThrow(() -> new CredentialNotFoundException(memberId));
    }

    public void addCredential(Credential credential) {
        credentialRepository.save(credential);
    }

    public void deleteCredential(Long userId) {
        if(credentialRepository.existsById(userId)) {
            credentialRepository.deleteById(userId);
        } else {
            throw new CredentialNotFoundException(userId);
        }
    }

    public void updateCredential(Long userId, String password) {
        credentialRepository.findById(userId)
                .map(x -> {
                    x.setPassword(password);
                    return credentialRepository.save(x);
                })
                .orElseThrow(() -> new CredentialNotFoundException(userId));
    }

}

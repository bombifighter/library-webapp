package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Credential;
import com.botond.librarybackend.error.CredentialNotFoundException;
import com.botond.librarybackend.repository.CredentialRepository;
import com.botond.librarybackend.entity.User;
import com.botond.librarybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CredentialService {

    @Autowired
    MemberService memberService;

    @Autowired
    CredentialRepository credentialRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
            userRepository.deleteById(userId+1);
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
        userRepository.findByUsername(memberService.getMemberById(userId).getUsername())
                .map(x -> {
                    x.setPassword(passwordEncoder.encode(password));
                    return userRepository.save(x);
                });
    }

}

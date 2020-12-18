package com.botond.librarybackend.controller;

import com.botond.librarybackend.entity.Credential;
import com.botond.librarybackend.entity.Member;
import com.botond.librarybackend.entity.PasswordWrapper;
import com.botond.librarybackend.service.CredentialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/credentials")
public class CredentialController {

    @Autowired
    CredentialService credentialService;

    @GetMapping("/{id}")
    Credential getCredential(@PathVariable Long id) {
        return credentialService.getMemberCredential(id);
    }

    @PutMapping("/update/{id}")
    void updateCredential(@PathVariable Long id, @RequestBody PasswordWrapper passwordWrapper) {
        credentialService.updateCredential(id, passwordWrapper.getPassword());
    }
}

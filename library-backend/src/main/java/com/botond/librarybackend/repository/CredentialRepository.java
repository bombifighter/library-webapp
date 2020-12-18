package com.botond.librarybackend.repository;

import com.botond.librarybackend.entity.Credential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialRepository extends JpaRepository<Credential, Long> {
}

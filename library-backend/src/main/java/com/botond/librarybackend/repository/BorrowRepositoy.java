package com.botond.librarybackend.repository;

import com.botond.librarybackend.entity.Borrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowRepositoy extends JpaRepository<Borrow, Long> {
}

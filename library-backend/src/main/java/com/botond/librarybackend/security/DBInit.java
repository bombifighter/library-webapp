package com.botond.librarybackend.security;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.entity.Borrow;
import com.botond.librarybackend.entity.Credential;
import com.botond.librarybackend.entity.Member;
import com.botond.librarybackend.repository.BookRepository;
import com.botond.librarybackend.repository.BorrowRepository;
import com.botond.librarybackend.repository.CredentialRepository;
import com.botond.librarybackend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DBInit implements CommandLineRunner {

    UserRepository userRepository;
    BookRepository bookRepository;
    MemberRepository memberRepository;
    BorrowRepository borrowRepository;
    CredentialRepository credentialRepository;

    PasswordEncoder passwordEncoder;

    public DBInit(UserRepository userRepository,
                  PasswordEncoder passwordEncoder,
                  MemberRepository memberRepository,
                  BorrowRepository borrowRepository,
                  BookRepository bookRepository,
                  CredentialRepository credentialRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
        this.memberRepository = memberRepository;
        this.credentialRepository = credentialRepository;
    }

   @Override
    public void run(String... args) throws Exception {
       this.userRepository.deleteAll();
       this.bookRepository.deleteAll();
       this.memberRepository.deleteAll();
       this.borrowRepository.deleteAll();
       this.credentialRepository.deleteAll();

       User user = new User();
       user.setUsername("admin");
       user.setPassword(passwordEncoder.encode("secret"));
       user.setAuthority(Role.ROLE_ADMIN);
       this.userRepository.save(user);

       User user2 = new User();
       user2.setUsername("elike98");
       user2.setPassword(passwordEncoder.encode("biztonsaglvl100"));
       user2.setAuthority(Role.ROLE_USER);
       this.userRepository.save(user2);

       Book book = new Book();
       book.setISBN("0-7710-0868-6");
       book.setTitle("Oryx and Crake");
       book.setAuthor("Margaret Atwood");
       book.setGenre("fiction");
       book.setDescription("First book of the MaddAdam trilogy");
       book.setQuantity(3L);
       book.setInborrow(0L);
       this.bookRepository.save(book);

       Book book2 = new Book();
       book2.setISBN("978-0-7475-8516-9");
       book2.setTitle("The Year of the Flood");
       book2.setAuthor("Margaret Atwood");
       book2.setGenre("fiction");
       book2.setDescription("Second book of the MaddAdam trilogy");
       book2.setQuantity(1L);
       book2.setInborrow(2L);
       this.bookRepository.save(book2);

       Book book3 = new Book();
       book3.setISBN("0-77100-846-5");
       book3.setTitle("MaddAdam");
       book3.setAuthor("Margaret Atwood");
       book3.setGenre("fiction");
       book3.setDescription("Third book of the MaddAdam trilogy");
       book3.setQuantity(4L);
       book3.setInborrow(0L);
       this.bookRepository.save(book3);

       Member member = new Member();
       member.setUsername("elike98");
       member.setName("Lapos Elemer");
       member.setDateOfBirth("1998-01-01");
       member.setAddress("1000 Budapest, Hosszu ut 8.");
       member.setEmail("lapos.elemer@protonmail.com");
       member.setJoinDate("2020-12-14");
       this.memberRepository.save(member);

       Borrow borrow = new Borrow();
       borrow.setUserId(1L);
       borrow.setBookId(2L);
       borrow.setDate("2020-12-14");
       borrow.setEndDate("2021-01-13");
       this.borrowRepository.save(borrow);

       Borrow borrow2 = new Borrow();
       borrow2.setUserId(1L);
       borrow2.setBookId(2L);
       borrow2.setDate("2020-01-01");
       borrow2.setEndDate("2020-01-31");
       this.borrowRepository.save(borrow2);

       Credential credential = new Credential();
       credential.setUserId(1L);
       credential.setPassword("biztonsaglvl100");
       this.credentialRepository.save(credential);
    }
}

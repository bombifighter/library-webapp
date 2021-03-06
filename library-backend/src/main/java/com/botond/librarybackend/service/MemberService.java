package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.*;
import com.botond.librarybackend.error.InvalidUsernameException;
import com.botond.librarybackend.error.MemberNotFoundException;
import com.botond.librarybackend.error.UserNameNotUniqueException;
import com.botond.librarybackend.repository.MemberRepository;
import com.botond.librarybackend.entity.Role;
import com.botond.librarybackend.entity.User;
import com.botond.librarybackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MemberService {

    public static final String DATE_PATTERN = "yyyy-MM-dd";

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    BorrowService borrowService;

    @Autowired
    CredentialService credentialService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Member> getAllMember() {
        return new ArrayList<>(memberRepository.findAll());
    }

    public Member getMemberById(Long Id) {
        return memberRepository.findById(Id)
                .orElseThrow(() -> new MemberNotFoundException(Id));
    }

    public Member getMemberDataByName(String username) {
        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            if(member.getUsername().equals(username)) {
                return member;
            }
        }
        throw new MemberNotFoundException(username);
    }

    public void addMember(Member newMember, String password) {
        if(newMember.getUsername().equals("")) {
            throw new InvalidUsernameException(newMember.getUsername());
        }
        List<Member> members = getAllMember();
        for(Member member : members) {
            if(member.getUsername().equals(newMember.getUsername())) {
                throw new UserNameNotUniqueException(newMember.getUsername());
            }
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_PATTERN);
        newMember.setJoinDate(simpleDateFormat.format(new Date()));
        memberRepository.save(newMember);
        Credential newCredential = new Credential();
        newCredential.setUserId(newMember.getId());
        newCredential.setPassword(password);
        credentialService.addCredential(newCredential);
        User user = new User();
        user.setUsername(newMember.getUsername());
        user.setPassword(passwordEncoder.encode(password));
        user.setAuthority(Role.ROLE_USER);
        userRepository.save(user);
    }

    public void deleteMember(Long Id) {
        List<Member> members = getAllMember();
        for (Member member : members) {
            if(member.getId().equals(Id)) {
                memberRepository.deleteById(Id);
                credentialService.deleteCredential(Id);
                List<Borrow> borrows = borrowService.getAllBorrows();
                for (Borrow borrow : borrows) {
                    if(Id.equals(borrow.getUserId())) {
                        borrowService.deleteBorrow(borrow.getId());
                    }
                }
                return;
            }
        }
        throw new MemberNotFoundException(Id);
    }

    public void updateMember(Long Id, Member updatedMember) {
        memberRepository.findById(Id)
                .map(x -> {
                    if(!x.getUsername().equals(updatedMember.getUsername())) {
                        List<Member> members = getAllMember();
                        for(Member member : members) {
                            if(member.getUsername().equals(updatedMember.getUsername())) {
                                throw new UserNameNotUniqueException(updatedMember.getUsername());
                            }
                        }
                    }
                    x.setUsername(updatedMember.getUsername());
                    x.setName(updatedMember.getName());
                    x.setAddress(updatedMember.getAddress());
                    x.setEmail(updatedMember.getEmail());
                    x.setDateOfBirth(updatedMember.getDateOfBirth());
                    return memberRepository.save(x);
                })
                .orElseThrow(() -> new MemberNotFoundException(Id));
    }
}

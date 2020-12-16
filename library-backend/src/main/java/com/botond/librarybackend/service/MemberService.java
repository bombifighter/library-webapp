package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.entity.Member;
import com.botond.librarybackend.error.BookNotFoundException;
import com.botond.librarybackend.error.MemberAlreadyExistsException;
import com.botond.librarybackend.error.MemberNotFoundException;
import com.botond.librarybackend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<Member> getAllMember() {
        return new ArrayList<>(memberRepository.findAll());
    }

    public Member getMemberById(Long Id) {
        return memberRepository.findById(Id)
                .orElseThrow(() -> new MemberNotFoundException(Id));
    }

    public void addMember(Member newMember) {
        List<Member> members = getAllMember();
        for(Member member : members) {
            if(member.equals(newMember)) {
                throw new MemberAlreadyExistsException(newMember.getId());
            }
        }
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_PATTERN);
        newMember.setJoinDate(simpleDateFormat.format(new Date()));
        memberRepository.save(newMember);
    }

    public void deleteMember(Long Id) {
        List<Member> members = getAllMember();
        for (Member member : members) {
            if(member.getId().equals(Id)) {
                memberRepository.deleteById(Id);
                return;
            }
        }
        throw new MemberNotFoundException(Id);
    }

    public void updateMember(Long Id, Member member) {
        memberRepository.findById(Id)
                .map(x -> {
                    x.setName(member.getName());
                    x.setAddress(member.getAddress());
                    x.setEmail(member.getEmail());
                    x.setDateOfBirth(member.getDateOfBirth());
                    return memberRepository.save(x);
                })
                .orElseThrow(() -> new MemberNotFoundException(Id));
    }
}

package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Member;
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

    public void addMember(Member newMember) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_PATTERN);
        newMember.setJoinDate(simpleDateFormat.format(new Date()));
        memberRepository.save(newMember);
    }

    public void deleteMember(Long Id) {
        memberRepository.deleteById(Id);
    }
}

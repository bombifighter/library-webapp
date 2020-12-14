package com.botond.librarybackend.controller;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.entity.Member;
import com.botond.librarybackend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    MemberService memberService;

    @GetMapping(path = "/getAllMembers")
    List<Member> fetchMembers() {
        return memberService.getAllMember();
    }

    @PostMapping("/newMember")
    @ResponseStatus(HttpStatus.CREATED)
    void newMember(@RequestBody Member newMember) {
        memberService.addMember(newMember);
    }

    @DeleteMapping("/delete/{id}")
    void deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
    }
}

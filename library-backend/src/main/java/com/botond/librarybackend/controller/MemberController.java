package com.botond.librarybackend.controller;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.entity.Member;
import com.botond.librarybackend.entity.PasswordWrapper;
import com.botond.librarybackend.entity.RequestWrapper;
import com.botond.librarybackend.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/members")
public class MemberController {

    @Autowired
    MemberService memberService;


    @GetMapping(path = "/getAllMembers")
    List<Member> fetchMembers() {
        return memberService.getAllMember();
    }

    @GetMapping(path = "/{id}")
    Member getById(@PathVariable Long id) {
        return memberService.getMemberById(id);
    }

    @PostMapping("/newMember")
    @ResponseStatus(HttpStatus.CREATED)
    void newMember(@RequestBody RequestWrapper requestWrapper) {
        memberService.addMember(requestWrapper.getMember(), requestWrapper.getPassword());
    }

    @DeleteMapping("/delete/{id}")
    void deleteMember(@PathVariable Long id) {
        memberService.deleteMember(id);
    }

    @PutMapping("/update/{id}")
    void updateMember(@PathVariable Long id, @RequestBody Member member) {
        memberService.updateMember(id, member);
    }

    @GetMapping("/mydata")
    Member getMyData(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        return memberService.getMemberDataByName(principal.getName());
    }
}

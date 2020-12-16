package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Book;
import com.botond.librarybackend.entity.Borrow;
import com.botond.librarybackend.error.BorrowNotAvailableException;
import com.botond.librarybackend.error.BorrowNotFoundException;
import com.botond.librarybackend.repository.BookRepository;
import com.botond.librarybackend.repository.BorrowRepository;
import com.botond.librarybackend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class BorrowService {

    public static final String DATE_PATTERN = "yyyy-MM-dd";
    public static final int BORROW_DAYS = 30;

    @Autowired
    BorrowRepository borrowRepository;

    @Autowired
    BookService bookService;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberService memberService;

    public List<Borrow> getAllBorrows() {
        return new ArrayList<>(borrowRepository.findAll());
    }

    public void newBorrow(Borrow newBorrow) {
        memberService.getMemberById(newBorrow.getUserId());
        Book book = bookService.getBookById(newBorrow.getBookId());
        if(book.getQuantity().equals(0L)) {
            throw new BorrowNotAvailableException(book.getTitle());
        }
        bookRepository.findById(book.getId())
                .map(x -> {
                    x.setQuantity(x.getQuantity()-1);
                    x.setInborrow(x.getInborrow()+1);
                    return bookRepository.save(x);
                });
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_PATTERN);
        newBorrow.setDate(simpleDateFormat.format(new Date()));

        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.DATE, BORROW_DAYS);
        Date endDate = calendar.getTime();
        newBorrow.setEndDate(simpleDateFormat.format(endDate));

        borrowRepository.save(newBorrow);
    }

    public void extendBorrow(Long Id) {
        borrowRepository.findById(Id)
                .map(x -> {
                    SimpleDateFormat simpleDateFormat = new SimpleDateFormat(DATE_PATTERN);
                    Date now = null;
                    try {
                        now = simpleDateFormat.parse(x.getEndDate());
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(now);
                    calendar.add(Calendar.DATE, BORROW_DAYS);
                    Date newDate = calendar.getTime();
                    x.setEndDate(simpleDateFormat.format(newDate));
                    return borrowRepository.save(x);
                })
        .orElseThrow(() -> new BorrowNotFoundException(Id));
    }

    public void deleteBorrow(Long Id) {
        List<Borrow> borrows = getAllBorrows();
        for (Borrow borrow : borrows) {
            if(borrow.getId().equals(Id)) {
                borrowRepository.deleteById(Id);
                bookService.updateQuantityByOne(borrow.getBookId());
                bookService.reduceInBorrow(borrow.getBookId());
                return;
            }
        }
        throw new BorrowNotFoundException(Id);
    }

}
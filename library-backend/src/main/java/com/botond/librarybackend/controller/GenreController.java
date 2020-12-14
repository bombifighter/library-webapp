package com.botond.librarybackend.controller;

import com.botond.librarybackend.entity.Genre;
import com.botond.librarybackend.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    @Autowired
    GenreService genreService;

    @GetMapping("/getAllGenres")
    List<Genre> fetchGenres() {
        return genreService.getAllGenres();
    }

    @PostMapping("/newGenre")
    void addNewGenre(@RequestBody Genre newGenre) {
        genreService.newGenre(newGenre);
    }
}

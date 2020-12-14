package com.botond.librarybackend.service;

import com.botond.librarybackend.entity.Genre;
import com.botond.librarybackend.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GenreService {

    @Autowired
    GenreRepository genreRepository;

    public List<Genre> getAllGenres() {
        return new ArrayList<>(genreRepository.findAll());
    }

    public void newGenre(Genre newGenre) {
        genreRepository.save(newGenre);
    }
}

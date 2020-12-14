import { Component, OnInit } from '@angular/core';
import {BooksService} from "../books.service";
import {Book} from "../books/book";
import {ActivatedRoute, Router} from "@angular/router";
import {ModifybookService} from "../modifybook.service";

@Component({
  selector: 'app-modifybook',
  templateUrl: './modifybook.component.html',
  styleUrls: ['./modifybook.component.css']
})
export class ModifybookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private booksService: BooksService,
              private modifyBookService: ModifybookService) { }

  ngOnInit(): void {
    this.booksService.bookById(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe((result) => {
      this.book = result;
    });
  }

  handleSave() {
    this.modifyBookService.saveModification(this.book);
  }

}

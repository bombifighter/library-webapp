export class Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  quantity: number;
  isbn: string;

  constructor(id: number, title: string, author: string, genre: string, description: string, quantity: number, isbn: string) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.description = description;
    this.quantity = quantity;
    this.isbn = isbn;
  }
}

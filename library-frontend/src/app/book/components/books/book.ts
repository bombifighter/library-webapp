export class Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  quantity: number;
  isbn: string;
  inborrow: number

  constructor() {
    this.id = null;
    this.title = null;
    this.author = null;
    this.genre = null;
    this.description = null;
    this.quantity = null;
    this.isbn = null;
    this.inborrow = null;
  }
}

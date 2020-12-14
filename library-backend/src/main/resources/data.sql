INSERT INTO BOOKS
    (ISBN, title, author, genre_id, description, quantity)
VALUES
    ('0-7710-0868-6', 'Oryx and Crake', 'Margaret Atwood', 3, 'First book of the MaddAdam trilogy', 3),
    ('978-0-7475-8516-9', 'The Year of the Flood', 'Margaret Atwood', 3, 'Second book of the MaddAdam trilogy', 1),
    ('0-77100-846-5', 'MaddAdam', 'Margaret Atwood', 3, 'Third book of the MaddAdam trilogy', 4);

INSERT INTO GENRES(name) VALUES
('adventure'),
('fantasy'),
('fiction'),
('history'),
('horror'),
('mistery'),
('thrillers');

INSERT INTO MEMBERS
(name, dob, address, email, join_date)
VALUES
('Lapos Elemér', '1998-01-01', '1000 Budapest Hosszú út 8', 'lapos.elemer@protonmail.com', '2020-12-14');

INSERT INTO BORROWS
(user_id, book_id, date, end_date)
VALUES
(1,2,'2020-12-14','2021-01-13');

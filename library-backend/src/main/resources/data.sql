INSERT INTO BOOKS
    (ISBN, title, author, genre, description, quantity, inborrow)
VALUES
    ('0-7710-0868-6', 'Oryx and Crake', 'Margaret Atwood', 'fiction', 'First book of the MaddAdam trilogy', 3, 0),
    ('978-0-7475-8516-9', 'The Year of the Flood', 'Margaret Atwood', 'fiction', 'Second book of the MaddAdam trilogy', 1, 2),
    ('0-77100-846-5', 'MaddAdam', 'Margaret Atwood', 'fiction', 'Third book of the MaddAdam trilogy', 4, 0);

INSERT INTO MEMBERS
(name, dob, address, email, join_date)
VALUES
('Lapos Elemer', '1998-01-01', '1000 Budapest, Hosszu ut 8.', 'lapos.elemer@protonmail.com', '2020-12-14');

INSERT INTO BORROWS
(user_id, book_id, date, end_date)
VALUES
(1,2,'2020-12-14','2021-01-13'),
(1,2,'2020-01-01','2020-01-31');

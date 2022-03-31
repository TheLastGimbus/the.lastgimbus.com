---
title: "Notatki sql :)"
date: 2022-01-18T21:14:56+01:00
draft: false
---

# SQL notatki

```sql
█░█░█ █▀▀ █▀█ █▀ ░░█ ▄▀█
▀▄▀▄▀ ██▄ █▀▄ ▄█ █▄█ █▀█

\s;
SHOW VARIABLES LIKE '%version%';

█░█ ▀█ █▄█ ▀█▀ █▄▀ █▀█ █░█░█ █▄░█ █ █▄▀
█▄█ █▄ ░█░ ░█░ █░█ █▄█ ▀▄▀▄▀ █░▀█ █ █░█

mysql -u root -p // '-p' dawać jak jest ustawione hasło

CREATE <--OR REPLACE--> USER maks@localhost IDENTIFIED BY 'haslo';
GRANT ALL ON *.* TO maks <--IDENTIFIED BY 'haslo'-->;
//GRANT <przywileje np. USAGE, SELECT, INSERT, UPDATE, DELETE, INDEX, ALTER, CREATE, DROP> ON <tabele np. baza.*> TO <użytkownik> IDENTIFIED BY <'haslo'>;
REVOKE ALL ON *.* FROM maks;
DELETE FROM user WHERE user='maks';
SELECT user FROM mysql.user; //pokazuje 
SELECT user();
DROP USER user;

█░█░█ █▀█ █▀█ █▀█ █░█░█ ▄▀█ █▀▄ ▀█ █▀▀ █▄░█ █ █▀▀
▀▄▀▄▀ █▀▀ █▀▄ █▄█ ▀▄▀▄▀ █▀█ █▄▀ █▄ ██▄ █░▀█ █ ██▄

SHOW DATABASES;
CREATE DATABASE baza DEFAULT CHARACTER SET utf8 COLLATE utf8_polish_ci;
DROP DATABASE nieMoja;
USE baza;
SOURCE c:/BAZY/moja_baza.sql
SHOW TABLES;
DESCRIBE [tabela];

▀█▀ █░█░█ █▀█ █▀█ ▀█ █▀▀ █▄░█ █ █▀▀   ▀█▀ █▀▀ █▄▄ █▀▀ █░░ █
░█░ ▀▄▀▄▀ █▄█ █▀▄ █▄ ██▄ █░▀█ █ ██▄   ░█░ ██▄ █▄█ ██▄ █▄▄ █

CREATE TABLE [nazwa_tabeli]
(
	id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	isbn CHAR(13) NOT NULL PRIMARY KEY,
	imie CHAR(25) NOT NULL,
	cena FLOAT(8,2),
	data DATE NOT NULL,
	ilosc TINYINT UNSIGNED,
	recenzja TEXT,
	czas TIME,
	PRIMARY KEY(kolumna_1, kolumna_2)	//alternatywny sposob deklaracji
);
//UNSIGNED
//NOT NULL
//AUTO_INCREMENT
//PRIMARY KEY

█▀▀ █▀▄ █▄█ █▀▀ ░░█ ▄▀█   ▀█▀ █▀▀ █▄▄ █▀▀ █░░ █
██▄ █▄▀ ░█░ █▄▄ █▄█ █▀█   ░█░ ██▄ █▄█ ██▄ █▄▄ █

ALTER TABLE [tabela] {..........}

ADD COLUMN [definicja_kolumny];

ADD CONSTRAINT [symbol] PRIMARY KEY (kolumna_1, ..., kolumna_N);
ADD CONSTRAINT [symbol] UNIQUE (kolumna_1, ..., kolumna_N);

ALTER COLUMN [kolumna] SET NOT NULL;
ALTER COLUMN [kolumna] DROP NOT NULL;
ALTER COLUMN [kolumna] SET DEFAULT ['wartość'];
ALTER COLUMN [kolumna] DROP DEFAULT;

MODIFY COLUMN [kolumna] INT AUTO_INCREMENT;

DROP COLUMN [kolumna]
DROP CONSTRAINT [symbol];
DROP PRIMARY KEY;

CHANGE [nazwa_kolumny] [nowa_nazwa_kolumny] [typ_kolumny];
RENAME TO [nowa_nazwa_tabeli];

█▀ █▀▀ █░░ █▀▀ █▀▀ ▀█▀
▄█ ██▄ █▄▄ ██▄ █▄▄ ░█░

SELECT [kolumna_1, ..., kolumna_N] FROM [tabela];
SELECT * FROM [tabela];
SELECT * FROM [tabela] WHERE [kolumna]='X' // np. id='5', imie='marek'
SELECT * FROM USER;
SELECT * FROM USER WHERE user='resowian'; 
SELECT * FROM information_schema.user_privileges;

OPERATORY PORÓWNANIA DO 'WHERE':
=, <, >, <=, >=, !=, IS NOT NULL, IS NULL, BETWEEN, IN, NOT IN, LIKE, NOT LIKE

PRZYKŁADY:
SELECT * FROM [tabela] WHERE {..........};

wartosc>100.20
wartosc!=420.00 //wartość różna od tej
adres IS NOT NULL //adres ma nie być pusty
choroby IS NULL //choroby ma być puste
cena BETWEEN 25.30 AND 90.20 //cena pomiędzy x a y
miejscowosc IN('Krasnystaw', 'Warszawa') //miejscowość ma być równe x lub y
miejscowosc NOT IN('Świdnik', 'Radom') //miejscowość ma nie być równe x ani y
imie LIKE 'Ma%' //wyszukuje wszystkie imiona zaczynające się na 'Ma-'
imie NOT LIKE 'Ma%' //wszystkie imiona oprócz tych na 'Ma-'

█ █▄░█ █▀▄ █▀▀ █▄▀ █▀ █▄█
█ █░▀█ █▄▀ ██▄ █░█ ▄█ ░█░

CREATE <--UNIQUE--> INDEX [nazwa_indeksu] ON [nazwa_tabeli] (kolumny_składowe);

CREATE TABLE [nazwa_tabeli]
(
	[definicje kolumn],
	INDEX nazwa_indeksu_1 (kolumna_x),
	INDEX nazwa_indeksu_2 (kolumna_x, kolumna_y, ..., kolumna_z),
	...
	INDEX nazwa_indeksu_N (kolumna_x, kolumna_y, ..., kolumna_z)
);

DROP INDEX nazwa_indeksu;
DROP INDEX nazwa_indeksu ON nazwa_tabeli;

▀█ ▄▀█ █▀█ █ █▀ █▄█ █░█░█ ▄▀█ █▄░█ █ █▀▀   █▀▄ ▄▀█ █▄░█ █▄█ █▀▀ █░█
█▄ █▀█ █▀▀ █ ▄█ ░█░ ▀▄▀▄▀ █▀█ █░▀█ █ ██▄   █▄▀ █▀█ █░▀█ ░█░ █▄▄ █▀█

SPOSÓB 1:

INSERT INTO nazwa_tabeli <--(kolumna1, kolumna2, kolumna3...)--> VALUES (wartosc1, wartosc2, wartosc3...);
//nazwy kolumn są opcjonalne, ---czyli---
INSERT INTO klienci VALUES(NULL, 'Anna Kowalska', 'Piłsudskiego 24/5', 'Krasnystaw'); //klient_id, nazwisko adres, miejscowosc

SPOSÓB 2:

INSERT INTO klienci SET adres='Lwowska 10/22', nazwisko='Mirosław Mróz', miejscowosc='Lublin';

PRZYKŁADY:

INSERT INTO klienci VALUES
 (NULL, 'Jan Prędki', 'Kwiatowa 8', 'Zabrze'),
 (NULL, 'Józef Koń', 'Zatybrze 23', 'Rzym'),
 (NULL, 'Ferdynand Kiepski', 'Piwna 13/13', 'Wrocław');

INSERT INTO zamowienia VALUES
 (NULL, 5, 199.80, '2014-10-11'),
 (NULL, 1, 210.05, '2014-10-12'),
 (NULL, 2, 22.10, '2014-10-12'),
 (NULL, 5, 120.34, '2014-10-14'),
 (NULL, 6, 180.40, '2014-10-19'),
 (NULL, 7, 246.90, '2014-10-21'),
 (NULL, 8, 66.30, '2014-11-01'),
 (NULL, 9, 79.80, '2014-11-10'),
 (NULL, 7, 99.90, '2014-11-10'),
 (NULL, 10, 90.20, '2014-11-15');

INSERT INTO ksiazki_zamowione VALUES
 (1, '87-7361-784-1', 2),
 (2, '87-7361-784-1', 1),
 (2, '83-86969-49-0', 1),
 (3, '83-246-0375-1', 1),
 (4, '83-7197-034-X', 1),
 (5, '83-7197-709-3', 2),
 (6, '978-83-246-3791-1', 1),
 (6, '83-86969-49-0', 2),
 (7, '83-246-0375-1', 3),
 (8, '83-7361-391-1', 3),
 (9, '87-7361-784-1', 1),
 (10, '83-7197-709-3', 1);

INSERT INTO recenzje_ksiazek VALUES
 ('87-7361-784-1','Bardzo profesjonalna książka opisująca jak tworzyć dynamiczne strony WWW, stosując PHP oraz MySQL'),
 ('83-86969-49-0', 'Książka zawiera kompendium wiedzy na temat [...] jak równiez profesjonalistów'),
 ('83-246-0375-1', 'Ciekawa książka dla interesujących się budową i działaniem sieci');

█▀▄▀█ █▀█ █▀▄ █▄█ █▀▀ █ █▄▀ ▄▀█ █▀▀ ░░█ ▄▀█   █▀▄ ▄▀█ █▄░█ █▄█ █▀▀ █░█
█░▀░█ █▄█ █▄▀ ░█░ █▀░ █ █░█ █▀█ █▄▄ █▄█ █▀█   █▄▀ █▀█ █░▀█ ░█░ █▄▄ █▀█

UPDATE [tabela] SET [kolumna1]=[wyrażenie1], [kolumna2]=[wyrażenie2] <--WHERE [warunek] ORDER BY [kryteria_porządkowania] LIMIT [ilość]-->;

PRZYKŁADY:

UPDATE ksiazki SET cena=cena*1.25;
UPDATE klienci SET adres='Zmieniona 12' WHERE klient_id=5;

ALTER TABLE [tabela] [zmiana1], [zmiana2];

PRZYKŁADY:

ALTER TABLE ksiazki MODIFY cena FLOAT(5,2);
--po czym można--
UPDATE ksiazki SET cena=120.34 WHERE isbn='83-7898-123-X';

ALTER TABLE zamowienia ADD podatek FLOAT(4,2) AFTER wartosc; //AFTER X - umiejscowienie kolumny
ALTER TABLE zamowienia DROP podatek;
UPDATE klienci SET nazwisko='Głowacki Paweł' adres='Pokątna 9' miejscowosc='Zaścianek' WHERE klient_id=5;
DELETE FROM zamowienia WHERE zamowienia_id BETWEEN 4 AND 8;
```

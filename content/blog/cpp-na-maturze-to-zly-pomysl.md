---
# Used when creating post with Netlify CMS, ignore it
my-url: cpp-na-maturze-to-zly-pomysl
title: C++ na maturze to zły pomysł
date: 2022-10-09T07:10:01.359Z
draft: false
---
## WTF

Skończył się wrzesień. Z tym samym ja i wszyscy moi rówieśnicy złożyli początkowe deklaracje maturalne. Załamał mnie fakt, że aż kurwa ponad 3-5 osób zaznaczyło sobie ce plus plusa na rozszerzonej z informatyki. Co więcej są to typowo osoby które raczej nie ogarniają pyrogramowania, i zaznaczyły tego ce plus plusa conajmniej nie dla sportu, ale że nie chce im sie uczyć pajtona. Dlatego też napisałem tego posta, żeby do lutego każdy zdążył sobie zobaczyć, że **_chce_** to zmienić.

## #1. - "Nie chce mi sie uczyć nowego języka 😩"

Nauka nowych języków brzmi strasznie dla początkującego - zwłaszcza jeśli zaczeło sie od C++ - ale jeśli już nauczyłeś sie jednego języka, to większość innych to kwestia pierdu różnic. Naprawde. Serio myślisz że tak strasznym i męczącym będzie nauczenie sie pisać:

```python
mojaZmienna = False

if mojaZmienna:
    print('dupa')
```

zamiast

```cpp
bool mojaZmienna = false;

if (mojaZmienna) {
    cout << "dupa" << endl;
}
```

## #2. Zadanka na maturze
Przyjżyjmy się jakie zadanka są na maturze. Popatrzmy na [część drugą z maja 2022](https://arkusze.pl/maturalne/informatyka-2022-maj-matura-rozszerzona-2.pdf) i [z 2021](https://arkusze.pl/maturalne/informatyka-2021-maj-matura-rozszerzona-2.pdf).

Możesz sie w to wczytać, ale moge ci streścić, że co pojawia się **za każdym razem**, to 

> "jest jakiś plik .txt z jakimiś danymi, i masz go wczytać i cośtam zrobić"

### Część 1/2 - "Wczytać kuźwa plik"

Spróbujmy zrobić samo to. Wczytać plik, i go wyświetlić.

Let's go C++:

```cpp
// Includujemy cały shit
// już tu możesz sie wykrzaczyć, o czym później
#include <iostream>
#include <fstream>

// Bo tak
using namespace std;

int main() {
    ifstream pliczek("file.txt");
    string linia;
    // Jakaś dziwna pętla
    while (getline(pliczek, linia)) {
        cout << linia << endl;
    }
    pliczek.close();
}
```

No... ym okej... teraz pajton:

```python
with open('file.txt', 'r') as pliczek:
  print(pliczek.read())
# Tyle.

# Ten "with" automatycznie otwiera i zamyka plik kiedy sie z niego wyjdzie
# Jeśli nie ogarniasz, możesz zrobić po prostu:

pliczek = open('file.txt', 'r')
print(pliczek.read())
pliczek.close()
```

To jest dosłownie wszytko co musisz napisać. Nie pominałem żadnych includów, importów, itp.

### Część 2/2 - "Cośtam hehe zrobić"

Wiele z tych zadań to właśnie "masz plik z liczbami, policz średnią z nich". Spróbujmy sobie to zrobić.

Pomine teraz cały shit z importowaniem bibliotek, konwertowaniem `string`ów na `int`y, i po prostu dam tablice z liczbami:

```cpp
// Ah, tak, musisz znać rozmiar cały czas
// Chyba że umiesz vectory, ale też możesz sie nimi wykrzaczyć
int ROZMIAR = 10;
int tablica[ROZMIAR] = {2, 1, 3, 7, 6, 9, 4, 2, 0, 0};
int suma = 0;
// Uważaj żeby ci sie "<" i "<=" nie popierdoliło ;)
for (int i = 0; i < ROZMIAR; i++) {
    suma += tablica[i];
}
cout << suma / ROZMIAR << endl;  // To coś wypisze "3"

// Tak, żeby mieć poprawną średnią to też musi być floatem
cout << (float)suma / ROZMIAR << endl;  // To już wypisze "3.4"
```

```python
tablica = [2, 1, 3, 7, 6, 9, 4, 2, 0, 0]
suma = 0
for element in tablica:
    suma += element

# len() zwraca długość tablicy
print(suma /  len(tablica))

# Teraz uważaj, bo jeśli jesteś pajtonowym pro, to możesz jeszcze tak:
print(sum(tablica) / len(tablica))  # Bez tego fora
```

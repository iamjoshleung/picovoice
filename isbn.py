
from dataclasses import dataclass
import requests
import json


@dataclass
class Book:
    title: str
    author: str
    language: str


books: dict[str, Book] = {}

"""
Assuming we are storing 100,000 books in cache
Additional 100,000 strings only cost a few MBs of memory
Yet we achieve faster lookup
In the case we need to store much more than 100,000, I will probably use Redis or the like
"""
isbns: list[str] = []

MAX_BOOKS = 10


def get_book_by_isbn(isbn: str) -> Book:

    if isbn in books:
        print("returning from cache")
        return books[isbn]

    try:
        r = requests.get(
            url=f'https://openlibrary.org/isbn/{isbn}.json').json()
        title: str = r["title"]
        language: str = r["languages"][0]["key"]
        r = requests.get(
            url=f'https://openlibrary.org{r["authors"][0]["key"]}.json').json()
        author: str = r["name"]
        book = Book(title=title, language=language, author=author)

        if len(isbns) > MAX_BOOKS:
            print("removing from cache")
            books[isbns[0]].pop()
            isbns.pop(0)

        books[isbn] = book
        isbns.append(isbn)
        print("returning from database")
        return book
    except json.JSONDecodeError:
        raise Exception("no book found")


def get_book_info(isbn: str) -> Book:

    try:
        book: Book = get_book_by_isbn(isbn)
        return book
    except Exception as e:
        print(e)


user_input = ""

while user_input != "0":
    val: str = input("Enter an ISBN (or 0 to quit): ")
    print(get_book_info(val))

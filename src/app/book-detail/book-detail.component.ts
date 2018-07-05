import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';
import { GENRES } from '../genres';
import { RATINGS } from '../ratings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatGridList, MatList } from '@angular/material';
import { AuthorSearchComponent } from '../author-search/author-search.component';
import { Author } from '../author';
import { AuthorService } from '../author.service';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.scss']
})

export class BookDetailComponent implements OnInit {
    @Input() book: Book;
    genres = GENRES;
    ratings = RATINGS;
    author: Author;

    constructor (
        private route: ActivatedRoute,
        private bookService: BookService,
        private authorService: AuthorService,
        private location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getBook();
    }

    getBook(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.bookService.getBook(id)
        .subscribe(book => this.book = book);
    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
        this.bookService.updateBook(this.book)
        .subscribe(() => this.goBack());
    }

    openGoodReads(): void {
        window.open(this.book.goodReadsUrl, '_blank');
    }

    addAuthor(name): void {
        const newAuthor = new Author;
        newAuthor.name = name;
        newAuthor.namelc = name.toLowerCase();
        newAuthor.userId = 1;
        this.authorService.addAuthor(newAuthor)
        .subscribe(author => {
            this.author = author;
            this.updateBookAuthor();
        });
    }

    updateBookAuthor(): void {
        this.book.authorId = this.author._id;
        this.book.authorName = this.author.name;
    }

    openAuthorDialog(): void {
        const dialogRef = this.dialog.open(AuthorSearchComponent, {
            width: '250px',
            data: { author: this.author }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result instanceof Object) {
                this.author = result;
                this.updateBookAuthor();
            } else if (typeof result === 'undefined') {
                // console.log('returning nothing');
            } else {
                this.addAuthor(result);
            }
        });
    }

}

import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Book } from '../book';
import { BookService } from '../book.service';
import { GENRES } from '../genres';
import { RATINGS } from '../ratings';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthorSearchComponent } from '../author-search/author-search.component';

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent implements OnInit {
    @Input() book: Book;
    genres = GENRES;
    ratings = RATINGS;
    authorName: string;

    constructor (
        private route: ActivatedRoute,
        private bookService: BookService,
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

    openAuthorDialog(): void {
        const dialogRef = this.dialog.open(AuthorDialogComponent, {
            width: '250px',
            data: { authorName: this.authorName }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed ', result);
            this.authorName = result;
        });
    }

}

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'author-dialog-component',
    templateUrl: './author-dialog-component.html'
})
export class AuthorDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<AuthorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

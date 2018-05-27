import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable ,  Subject ,  of } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Author } from '../author';
import { AuthorService } from '../author.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-author-search',
  templateUrl: './author-search.component.html',
  styleUrls: ['./author-search.component.scss']
})

export class AuthorSearchComponent implements OnInit {
    authors$: Observable<Author[]>;
    private searchTerms = new Subject<string>();

    constructor(
        private authorService: AuthorService,
        public dialogRef: MatDialogRef<AuthorSearchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.authors$ = this.searchTerms.pipe(
            // wait 300ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.authorService.searchAuthors(term)),
        );
    }

}

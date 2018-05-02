import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './book';
import { MessageService } from './message.service';
import { environment } from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookService {

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(environment.host + environment.booksUrl)
            .pipe(
                catchError(this.handleError('getBooks', []))
            );
    }

    getBook(_id: string): Observable<Book> {
        const url = `${environment.host + environment.booksUrl}/${_id}`;
        return this.http.get<Book>(url).pipe(
            tap(_ => this.log(`fetched book id=${_id}`)),
            catchError(this.handleError<Book>(`getBook id=${_id}`))
        );
    }

    /** GET book by id. Return `undefined` when id not found */
    // This was in the sample code. Don't think I'll ever use it.
    getBookNo404<Data>(_id: string): Observable<Book> {
    const url = `${environment.host + environment.booksUrl}/?id=${_id}`;
    return this.http.get<Book[]>(url)
        .pipe(
            map(books => books[0]), // returns a {0|1} element array
            tap(h => {
                const outcome = h ? `fetched` : `did not find`;
                this.log(`${outcome} book id=${_id}`);
            }),
            catchError(this.handleError<Book>(`getBook id=${_id}`))
        );
    }

    /* GET books whose title contains search term */
    searchBooks(term: string): Observable<Book[]> {
        const url = `${environment.host + environment.bookSearchUrl}/${term}`;
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Book[]>(url).pipe(
            tap(_ => this.log(`found books matching "${term}"`)),
            catchError(this.handleError<Book[]>('searchBooks', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new book to the server */
    addBook (book: Book): Observable<Book> {
        return this.http.post<Book>(environment.host + environment.booksUrl, book, httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((book: Book) => this.log(`added book w/ id=${book._id}`)),
            catchError(this.handleError<Book>('addBook'))
        );
    }

    /** DELETE: delete the book from the server */
    deleteBook (book: Book | string): Observable<Book> {
        const id = typeof book === 'string' ? book : book._id;
        const url = `${environment.host + environment.booksUrl}/${id}`;

        return this.http.delete<Book>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted book id=${id}`)),
            catchError(this.handleError<Book>('deleteBook'))
        );
    }

    /** PUT: update the book on the server */
    updateBook (book: Book): Observable<any> {
        const id = typeof book === 'string' ? book : book._id;
        const url = `${environment.host + environment.booksUrl}/${id}`;
        return this.http.put(url, book, httpOptions).pipe(
            tap(_ => this.log(`updated book id=${book._id}`)),
            catchError(this.handleError<any>('updateBook'))
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('BookService: ' + message);
    }

}

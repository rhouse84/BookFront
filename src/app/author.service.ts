import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Author } from './author';
import { MessageService } from './message.service';
import { environment } from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthorService {

    constructor(
        private http: HttpClient,
        private messageService: MessageService) {}

    getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(environment.host + environment.authorsUrl)
            .pipe(
                catchError(this.handleError('getAuthors', []))
            );
    }

    getAuthor(_id: string): Observable<Author> {
        const url = `${environment.host + environment.authorsUrl}/${_id}`;
        return this.http.get<Author>(url).pipe(
            tap(_ => this.log(`fetched author id=${_id}`)),
            catchError(this.handleError<Author>(`getAuthor id=${_id}`))
        );
    }
    /* GET authors whose name contains search term */
    searchAuthors(term: string): Observable<Author[]> {
        const url = `${environment.host + environment.authorSearchUrl}/${term}`;
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Author[]>(url).pipe(
            tap(_ => this.log(`found authors matching "${term}"`)),
            catchError(this.handleError<Author[]>('searchAuthors', []))
        );
    }

    //////// Save methods //////////

    /** POST: add a new author to the server */
    addAuthor (author: Author): Observable<Author> {
        return this.http.post<Author>(environment.host + environment.authorsUrl, author, httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((author: Author) => this.log(`added author w/ id=${author._id}`)),
            catchError(this.handleError<Author>('addAuthor'))
        );
    }

    /** DELETE: delete the author from the server */
    deleteAuthor (author: Author | string): Observable<Author> {
        const id = typeof author === 'string' ? author : author._id;
        const url = `${environment.host + environment.authorsUrl}/${id}`;

        return this.http.delete<Author>(url, httpOptions).pipe(
            tap(_ => this.log(`deleted author id=${id}`)),
            catchError(this.handleError<Author>('deleteAuthor'))
        );
    }

    /** PUT: update the author on the server */
    updateAuthor (author: Author): Observable<any> {
        const id = typeof author === 'string' ? author : author._id;
        const url = `${environment.host + environment.authorsUrl}/${id}`;
        return this.http.put(url, author, httpOptions).pipe(
            tap(_ => this.log(`updated author id=${author._id}`)),
            catchError(this.handleError<any>('updateAuthor'))
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

    /** Log a AuthorService message with the MessageService */
    private log(message: string) {
        this.messageService.add('AuthorService: ' + message);
    }

}

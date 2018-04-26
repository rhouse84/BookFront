import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './book';
import { MessageService } from './message.service';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BookService {

	private booksUrl = 'http://localhost:3000/api/books';  // URL to web api

	constructor(
		private http: HttpClient,
		private messageService: MessageService) {}

	getBooks(): Observable<Book[]> {
		return this.http.get<Book[]>(this.booksUrl)
			.pipe(
				catchError(this.handleError('getBooks', []))
			);
	}

	getBook(_id: string): Observable<Book> {
		const url = `${this.booksUrl}/${_id}`;
		return this.http.get<Book>(url).pipe(
			tap(_ => this.log(`fetched book id=${_id}`)),
			catchError(this.handleError<Book>(`getBook id=${_id}`))
		);
	}

	/** GET book by id. Return `undefined` when id not found */
	getBookNo404<Data>(_id: string): Observable<Book> {
	const url = `${this.booksUrl}/?id=${_id}`;
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
		if (!term.trim()) {
			//if not search term, return empty hero array.
			return of([]);
		}
		return this.http.get<Book[]>(`api/bookSearch/?title=${term}`).pipe(
			tap(_ => this.log(`found books matching "${term}"`)),
			catchError(this.handleError<Book[]>('searchBooks', []))
		);
	}
 
  // //////// Save methods //////////
 
  // /** POST: add a new hero to the server */
  // addHero (hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
  //     tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
  //     catchError(this.handleError<Hero>('addHero'))
  //   );
  // }
 
  // /** DELETE: delete the hero from the server */
  // deleteHero (hero: Hero | number): Observable<Hero> {
  //   const id = typeof hero === 'number' ? hero : hero.id;
  //   const url = `${this.heroesUrl}/${id}`;
 
  //   return this.http.delete<Hero>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }
 
  // /** PUT: update the hero on the server */
  // updateHero (hero: Hero): Observable<any> {
  //   return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }
 

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead
	 
			// TODO: better job of transforming error for user consumption
			//this.log(`${operation} failed: ${error.message}`);
	 
			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
 
	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add('BookService: ' + message);
	}

}

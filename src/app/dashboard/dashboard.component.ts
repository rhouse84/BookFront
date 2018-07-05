import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { LoginService } from '../login.service';
import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    books: Book[] = [];
    private loggedIn: boolean;

    constructor(
        private bookService: BookService,
        private authService: AuthService,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.loggedIn = (user != null);
            if (this.loggedIn) {
                this.user = user;
                console.log('** Logged in **');
                this.getBooks();
            } else {
                console.log('** not logged in');
                // this.signInWithGoogle();
            }
        });
    }

    getBooks(): void {
        this.bookService.getBooks()
        .subscribe(books => this.books = books.slice(0, 4));
    }

    get user(): SocialUser {
        return this.loginService.user;
    }

    set user(value: SocialUser) {
        this.loginService.user = value;
    }

    signInWithGoogle(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
    signOut(): void {
        this.authService.signOut();
    }

}

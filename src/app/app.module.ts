import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { BookDetailComponent, AuthorDialogComponent } from './book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { BookService } from './book.service';
import { AuthorService } from './author.service';
import { BookSearchComponent } from './book-search/book-search.component';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatNativeDateModule } from '@angular/material';
import { AuthorSearchComponent } from './author-search/author-search.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatNativeDateModule
    ],
    declarations: [
        AppComponent,
        BooksComponent,
        BookDetailComponent,
        BookSearchComponent,
        MessagesComponent,
        DashboardComponent,
        AuthorDialogComponent,
        AuthorSearchComponent
    ],
    entryComponents: [
        AuthorDialogComponent,
        AuthorSearchComponent
    ],
    providers: [
        BookService,
        AuthorService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

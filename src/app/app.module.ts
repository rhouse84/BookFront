import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './/app-routing.module';
import { AppComponent } from './app.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksComponent } from './books/books.component';
import { BookAddComponent } from './book-add/book-add.component';
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
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { LoginService } from './login.service';

const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleProvider)
    }
]);

// export function provideConfig() {
//     return config;
// }

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        MatNativeDateModule,
        SocialLoginModule.initialize(config)
    ],
    declarations: [
        AppComponent,
        BooksComponent,
        BookDetailComponent,
        BookSearchComponent,
        BookAddComponent,
        MessagesComponent,
        DashboardComponent,
        AuthorSearchComponent
    ],
    entryComponents: [
        AuthorSearchComponent
    ],
    providers: [
        BookService,
        AuthorService,
        MessageService,
        // {
        //     provide: AuthServiceConfig,
        //     useFactory: provideConfig
        // },
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

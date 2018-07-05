import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule,
        MatGridListModule,
        MatListModule
    ],
    exports: [
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule,
        MatGridListModule,
        MatListModule
    ],
})
export class MaterialModule { }

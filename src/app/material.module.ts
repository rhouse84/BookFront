import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
    imports: [
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule,
        MatGridListModule
    ],
    exports: [
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule,
        MatGridListModule
    ],
})
export class MaterialModule { }

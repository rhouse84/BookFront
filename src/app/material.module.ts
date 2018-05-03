import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule
    ],
    exports: [
        MatButtonModule,
        MatDatepickerModule,
        MatInputModule,
        MatRadioModule,
        MatToolbarModule,
        MatSelectModule,
        MatDialogModule
    ],
})
export class MaterialModule { }

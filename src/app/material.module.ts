import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  imports: [MatButtonModule, MatDatepickerModule, MatInputModule, MatRadioModule, MatToolbarModule],
  exports: [MatButtonModule, MatDatepickerModule, MatInputModule, MatRadioModule, MatToolbarModule],
})
export class MaterialModule { }
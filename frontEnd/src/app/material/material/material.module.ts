import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';


import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';


import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule  } from '@angular/common/http';


const matConst = [
  CommonModule,

  MatToolbarModule,
  HttpClientModule,
  MatButtonModule,
  MatExpansionModule,

  MatDividerModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatMenuModule,
  MatNativeDateModule,
  MatStepperModule,
  MatProgressBarModule,

  FormsModule,
  ReactiveFormsModule
]


@NgModule({
    imports: [matConst],
    exports: [matConst]
})
export class MaterialModule { }

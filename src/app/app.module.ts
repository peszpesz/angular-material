import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { MatComponentsModule } from './mat-components.module';
import { MiscComponent } from './misc/misc.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TableComponent } from './table/table.component';
import { MasterService } from './master.service';
import { TableDataSource } from './table/table-datasource';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    MiscComponent,
    HomeComponent,
    NotFoundComponent,
    TableComponent,
    EditUserComponent,
    DeleteUserComponent,
    AddNewUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatComponentsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'misc', component: MiscComponent },
      { path: 'table', component: TableComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    MasterService,
    TableDataSource
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

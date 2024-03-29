import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserData } from '../interface/user';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserData>;

  pelda: UserData[] = [
    { id: 1, name: 'Pisti', email: 'pisti@gmail.com' },
    { id: 2, name: 'Zoli', email: 'z@gmail.com' },
    { id: 3, name: 'Krisztián', email: 'kriz@gmail.com' },
    { id: 44, name: 'Krisztina', email: 'kriszti@gmail.com' },
    { id: 32, name: 'Antal', email: 'anti@gmail.com' },
    { id: 7, name: 'Géza', email: 'geza@gmail.com' }
  ];

  dataSource!: MatTableDataSource<UserData>;

  constructor(public dialog: MatDialog) { }
    
  displayedColumns = ['id', 'name', 'email', 'edit'];

  decimalPipe = new DecimalPipe(navigator.language);

  ngOnInit() {
    this.paginator._intl.itemsPerPageLabel = 'oldalanként';
    this.paginator._intl.nextPageLabel = 'következő oldal';
    this.paginator._intl.previousPageLabel = 'előző oldal';
    this.paginator._intl.firstPageLabel = 'első oldal';
    this.paginator._intl.lastPageLabel = 'utolsó oldal';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = ((page + 1) * pageSize > length) ? length : (page + 1) * pageSize;
      return `${start} - ${end} / ${this.decimalPipe.transform(length)}`;
    };
    this.dataSource = new MatTableDataSource(this.pelda);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  editUser(user: UserData): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let user = result;
        let id = this.dataSource.data
          .findIndex(e => e.id == user.id);
        this.dataSource.data[id].name = user.name;
        this.dataSource.data[id].email = user.email;
        this.dataSource.data = this.dataSource.data; // refresh
      }
    });
  }

  deleteUser(user: UserData): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: {
        id: user.id,
        name: user.name
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result >= 0) {
        let id = this.dataSource.data
          .findIndex(e => e.id == user.id);
        this.dataSource.data.splice(id, 1);
        this.dataSource.data = this.dataSource.data; // refresh
      }
    });
  }

  addNewUser(): void {
    const dialogRef = this.dialog.open(AddNewUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let user = result;
        let ids = this.dataSource.data
          .map(e => e.id)
          .sort((a, b) => a - b);
        let newId = 0;
        while (ids.includes(newId)) newId++;
        this.dataSource.data.push({
          id: newId,
          name: user.name,
          email: user.email
        });
        this.dataSource.data = this.dataSource.data; // refresh
      }
    });
  }

  filterData(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

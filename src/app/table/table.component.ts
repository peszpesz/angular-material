import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MasterService } from '../master.service';
import { TableDataSource, TableItem } from './table-datasource';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserData } from '../interface/user';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;

  dataSource = new TableDataSource(this.service);

  constructor(
    private service: MasterService,
    public dialog: MatDialog
    ) {}
    
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'edit'];

  ngOnInit(): void {
    this.dataSource.loadData();
    console.log('init');
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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
        this.paginator
          ._changePageSize(this.paginator.pageSize); // refresh
      }
    });
  }

  addNewUser(): void {
    const dialogRef = this.dialog.open(AddNewUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let user = result;
        console.log(user.name, 'has been added');
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
        this.paginator
          ._changePageSize(this.paginator.pageSize); // refresh
      }
    });
  }
}

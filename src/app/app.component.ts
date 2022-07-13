import { Product } from './models/product.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud-material-ui';

  displayedColumns: string[] = [
    'id',
    'productName',
    'category',
    'freshness',
    'price',
    'comment',
    'date',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(value => {
      if(value === 'save') {
        this.getAllProducts()
      }
    })
  }

  getAllProducts() {
    this.api.getProducts().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => console.log(err.message)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(row: any) {
   this.dialog.open(DialogComponent, {
    width: '30%',
    data: row
   }).afterClosed().subscribe(value => {
      if(value === 'update') {
        this.getAllProducts()
      }
    })
  }

  delete(id: number) {
    this.api.delete(id).subscribe(
      (res) => {
        alert('deletado com sucesso');
        this.getAllProducts();
      },
      (err) => alert(`Erro: ${err.message}`)
    )
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpDetailDialogComponent } from './emp-detail-dialog/emp-detail-dialog.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // ✅ corrected key from 'styleUrl' to 'styleUrls'
})
export class AppComponent implements OnInit {
  
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'Email',
    'Phone_no',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _empService: EmployeeService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  opendetaildialogform() {
    const dialogRef = this._dialog.open(EmpDetailDialogComponent, {
      disableClose: true  // ✅ Prevent closing by clicking outside or pressing ESC
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpDetailDialogComponent, {
      data,
      disableClose: true  // ✅ Same here for edit
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

 getEmployeeList() {
  this._empService.getEmployees().subscribe({
    next: (res) => {
      const transformedData = res.map(emp => ({
        docId: emp.id,
        employeeId: emp.employeeId,
        firstName: emp.firstName,
        lastName: emp.lastName,
        Email: emp.emailAddress,
        Phone_no: emp.phoneNumber
      }));

      // ✅ Show newest data last
      const reversedData = transformedData.reverse();

      this.dataSource = new MatTableDataSource(reversedData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    },
    error: console.log,
  });
}


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: any) {
    this._empService.deleteEmployee(id).then(() => {
      this._coreService.openSnackBar('Employee deleted successfully', 'done');
      this.getEmployeeList();
    }).catch(console.log);
  }
}

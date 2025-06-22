import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-detail-dialog',
  templateUrl: './emp-detail-dialog.component.html',
  styleUrls: ['./emp-detail-dialog.component.css']
})
export class EmpDetailDialogComponent implements OnInit {

  empForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      Email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      Phone_no: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.data;

    if (this.isEditMode) {
      // If editing, patch values and enable all fields
      this.empForm.patchValue(this.data);
      this.empForm.get('firstName')?.enable();
      this.empForm.get('lastName')?.enable();
      this.empForm.get('Email')?.enable();
      this.empForm.get('Phone_no')?.enable();
    } else {
      // Step-by-step enable logic only for Add mode
      this.empForm.get('firstName')?.valueChanges.subscribe(value => {
        if (value?.trim()) {
          this.empForm.get('lastName')?.enable();
        } else {
          this.empForm.get('lastName')?.reset();
          this.empForm.get('lastName')?.disable();
          this.empForm.get('Email')?.reset();
          this.empForm.get('Email')?.disable();
          this.empForm.get('Phone_no')?.reset();
          this.empForm.get('Phone_no')?.disable();
        }
      });

      this.empForm.get('lastName')?.valueChanges.subscribe(value => {
        if (value?.trim()) {
          this.empForm.get('Email')?.enable();
        } else {
          this.empForm.get('Email')?.reset();
          this.empForm.get('Email')?.disable();
          this.empForm.get('Phone_no')?.reset();
          this.empForm.get('Phone_no')?.disable();
        }
      });

      this.empForm.get('Email')?.valueChanges.subscribe(value => {
        if (value?.trim()) {
          this.empForm.get('Phone_no')?.enable();
        } else {
          this.empForm.get('Phone_no')?.reset();
          this.empForm.get('Phone_no')?.disable();
        }
      });
    }
  }

  async onFormSubmit() {
  if (this.empForm.valid) {
    const baseForm = {
      firstName: this.empForm.value.firstName,
      lastName: this.empForm.value.lastName,
      emailAddress: this.empForm.value.Email,
      phoneNumber: this.empForm.value.Phone_no
    };

    if (this.isEditMode) {
      const updated = { ...baseForm, employeeId: this.data.employeeId };
      this._empService.updateEmployee(this.data.docId, updated).then(() => {
        this._coreService.openSnackBar('Employee updated successfully', 'Close');
        this._dialogRef.close(true);
      }).catch(err => console.error(err));
    } else {
      try {
        const nextId = await this._empService.getNextEmployeeId();
        const newEmployee = { ...baseForm, employeeId: nextId };

        await this._empService.addEmployee(newEmployee);
        this._coreService.openSnackBar('Employee added successfully', 'Close');
        this._dialogRef.close(true);
      } catch (err) {
        console.error('Error adding employee:', err);
      }
    }
  }
}


  onClose() {
    this._dialogRef.close();
  }
}

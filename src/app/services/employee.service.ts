// src/app/services/employee.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private collectionName = 'Employees';

  constructor(private afs: AngularFirestore) {}

  // 🔁 Get next auto-incremented employeeId
  async getNextEmployeeId(): Promise<number> {
    const counterRef = this.afs.collection('counters').doc('employees');

    return this.afs.firestore.runTransaction(async (transaction) => {
      const doc = await transaction.get(counterRef.ref);
      const currentCount = doc.exists ? (doc.data() as { count: number })?.count || 0 : 0;
      const newCount = currentCount + 1;
      transaction.set(counterRef.ref, { count: newCount }, { merge: true });
      return newCount;
    });  }

  // 🆕 Add new employee with employeeId
  addEmployee(employeeData: any): Promise<any> {
    return this.afs.collection(this.collectionName).add(employeeData);
  }

  updateEmployee(docId: string, updatedData: any): Promise<void> {
    return this.afs.collection(this.collectionName).doc(docId).update(updatedData);
  }

  getEmployees(): Observable<any[]> {
    return this.afs.collection(this.collectionName).valueChanges({ idField: 'id' });
  }

  deleteEmployee(docId: string): Promise<void> {
    return this.afs.collection(this.collectionName).doc(docId).delete();
  }
}

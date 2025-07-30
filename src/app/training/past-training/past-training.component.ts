import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Excercise } from '../excercise.module';
import { TrainingService } from '../training.service';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  standalone: false,
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.css'
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  dataSource = new MatTableDataSource<Excercise>();


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit() {
    this.store.select(fromTraining.getFinishedExcercises).subscribe(
      (excercises: Excercise[]) => {
        this.dataSource.data = excercises;
      });

    // Custom filter logic to match any displayed column
    this.dataSource.filterPredicate = (data: Excercise, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();

      return !!(
        (data.name && data.name.toLowerCase().includes(transformedFilter)) ||
        (data.state && data.state.toLowerCase().includes(transformedFilter)) ||
        (data.duration && data.duration.toString().includes(transformedFilter)) ||
        (data.calories && data.calories.toString().includes(transformedFilter)) ||
        (data.date && new Date(data.date).toLocaleDateString().toLowerCase().includes(transformedFilter))
      );
    };

    this.trainingService.fetchCompletedOrCancelledExercises();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  trackByFn(index: number, item: any): number {
    return item.id || index;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

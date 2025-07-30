import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TrainingService } from '../training.service';
import { Excercise } from '../excercise.module';
import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-new-training',
  standalone: false,
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises$!: Observable<Excercise[]>;
  isLoading$!: Observable<boolean>;


  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.exercises$ = this.store.select(fromTraining.getAvailableExcercises);
    this.fetchExercises();
  }


  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.startExcercise(form.value.exercise);
  }

}
import { Component,  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainingService } from './training.service';
import * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-training',
  standalone: false,
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit{

  ongoingTraining$! : Observable<boolean>;
  

  constructor(private trainingService:TrainingService,
              private store:Store<fromTraining.State>
  ){}

  ngOnInit(){
    this.ongoingTraining$= this.store.select(fromTraining.getIsTraining);
  }
  
}

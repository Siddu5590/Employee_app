import { map, Subscription, take } from "rxjs";
import { Excercise } from "./excercise.module";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { UIService } from "../shared/ui.service";
import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import { Store } from "@ngrx/store";
import * as Training from './training.actions';


@Injectable()
export class TrainingService {

  private fbSubscription: Subscription[] = [];

  constructor(private db: AngularFirestore,
              private uiService:UIService,
              private store:Store<fromTraining.State>
  ) { }

  
  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubscription.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: any[]) => {
          return docArray.map(doc => {
            const data = doc.payload.doc.data() as {
              name: string;
              duration: number;
              calories: number;
            };
           // throw(new Error)
            return {
              id: doc.payload.doc.id,
              name: data.name,
              duration: data.duration,
              calories: data.calories
            };
          });
        })
      )
      .subscribe((exercises: Excercise[]) => {
        this.store.dispatch(new UI.StopLoading());
       this.store.dispatch(new Training.SetAvailableTraining(exercises));
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar('Fetching Exercises failed, please try again later!', 'close', 3000)
        
      }));
  }

  startExcercise(selectedId: string) {

    //select single exercise from available exercises collection
    //we can select single document by id to modify it and update it in db.
    //this.db.doc('availableExercises/'+selectedId).update({lastcompleted: new Date()});


    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
      ...ex!,
      date: new Date(),
      state: 'completed'
    });
    this.store.dispatch(new Training.StopTraining())
    })
    
  }

  cancelExcercise(progress: number) {

    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
      ...ex!,
      duration: ex!.duration * (progress / 100),
      calories: ex!.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.store.dispatch(new Training.StopTraining())
    })
    
  }

  
  fetchCompletedOrCancelledExercises() {
    this.fbSubscription.push(this.db.collection('finishedExercises')
      .valueChanges()
      .pipe(
        map((exercises: any[]) => {
          return exercises.map(ex => ({
            ...ex,
            date: ex.date?.toDate() // ✅ convert Firestore Timestamp to JS Date
          }));
        })
      )
      .subscribe((exercises: Excercise[]) => {
       this.store.dispatch(new Training.SetFinishedExcercises(exercises));
      }));
  }

  cancelSubscription() {
    this.fbSubscription.forEach(sub => sub.unsubscribe());
  }


   // Adds completed/cancelled exercise to Firestore
   
  private addDataToDatabase(exercise: Excercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}

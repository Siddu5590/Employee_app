import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  maxDate: any;
  isLoading$!: Observable<boolean>


  constructor(private authService: AuthService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {

    this.isLoading$ = this.store.select(fromRoot.getIsLoading)

    this.maxDate = new Date(); // Today's date as max birthdate
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); // Set max birthdate to 18 years ago

    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthdate: new FormControl('', [Validators.required]),
      agree: new FormControl(false, [Validators.requiredTrue])

    })
  }

  onSubmit(): void {
    this.authService.registerUser({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    });
    console.log('User registered:', this.signupForm.value);
    this.signupForm.reset(); // Reset the form after submission
  }
}
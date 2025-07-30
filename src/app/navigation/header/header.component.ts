import { Component, EventEmitter, OnInit, Output, } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  isAuth$!: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit(): void {

    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleNav() {
    this.sidenavToggle.emit();
  }
  onLogout() {
    this.authService.logout();
  }


}

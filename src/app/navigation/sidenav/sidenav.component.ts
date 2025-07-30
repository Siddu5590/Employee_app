import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from "../../auth/auth.service";
import { Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$!: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {

  }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }


  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
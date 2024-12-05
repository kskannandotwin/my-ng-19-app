import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user';
import { UserCardComponent } from '../user-card/user-card.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { handleError } from '../../utils/error-handler';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, LoadingSpinnerComponent, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = handleError(error);
        this.loading = false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/http-client/src/lib/api.service';  // Assuming you have this service set up

interface AuthorStats {
  username: string;
  profileLink: string;  // Not provided in backend, but can be constructed
  totalArticles: number;  // You may need additional logic or API calls for these
  totalLikes: number;  // You may need additional logic or API calls for these
  firstArticleDate: Date | null;  // You may need additional logic or API calls for these
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

@Component({
  selector: 'roaster',
  templateUrl: './roaster.component.html',
  styleUrls: ['./roaster.component.css'],
  standalone: true,
})
export class RoasterComponent implements OnInit {
  authorStats$!: Observable<AuthorStats[]>;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.authorStats$ = this.fetchAuthorStats();
  }

  fetchAuthorStats(): Observable<AuthorStats[]> {
    return this.apiService.get<User[]>('/users').pipe(
      
      map(users =>
         {
          
          console.log("users", users);
          return users.map(user => ({
        username: user.username,
        profileLink: `/profile/${user.username}`,  // Assuming this route
        totalArticles: 0,  // You'll need to fetch this from another source or adjust your API
        totalLikes: 0,     // Same here
        firstArticleDate: null  // Same here
      }))})
    );
  }
}

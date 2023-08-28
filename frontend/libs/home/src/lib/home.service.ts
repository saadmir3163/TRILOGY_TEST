import { ApiService } from '@realworld/core/http-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HomeService {
  constructor(private apiService: ApiService) {}

  getTags(): Observable<{ tags: string[] }> {
    return this.apiService.get('/tags');
  }

  // New method to set a tag
  setTag(tag: string): Observable<{ tag: string }> {
    return this.apiService.post<{ tag: string }, { tag: string }>('/tags', { tag });
  }
}

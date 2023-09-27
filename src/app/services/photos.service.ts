import { Injectable } from '@angular/core';
import { Photos } from '../models/photos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  photos: Photos[] = [];

  constructor(private http: HttpClient) {}

  // addPhotos(Photos: Photos): Observable<Photos> {
  //   const headers = new HttpHeaders({
  //     Authorization: 'bearer' + localStorage.getItem('access_token'),
  //   });
  //   return this.http.post<Photos>('http://localhost:3000/api/photos', Photos, {
  //     headers: headers,
  //   });
  // }

  // getAllPhotos(): Observable<Photos[]> {
  //   return this.http.get<Photos[]>('http://localhost:3000/api/photos');
  // }

  getImage() {
    return this.http.get('http://localhost:3000/api/photos', {
      responseType: 'blob',
    });
  }
  getImageById(id: number) {
    return this.http.get(`http://localhost:3000/api/photos/${id}`, {
      responseType: 'blob',
    });
  }

  postImage(formData: FormData) {
    return this.http.post('http://localhost:3000/api/photos', formData);
  }

  // getPhotosById(id: number): Observable<Photos> {
  //   return this.http.get<Photos>(`http://localhost:3000/api/photos/${id}`);
  // }

  modifyPhotos(id: number, updateData: Photos): Observable<Photos> {
    // const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }), { headers: headers }
    return this.http.patch<Photos>(
      `http://localhost:3000/api/photos/${id}`,
      updateData
    );
  }

  deletePhotos(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });
    return this.http.delete(`http://localhost:3000/api/photos/${id}`, {
      headers: headers,
    });
  }
}

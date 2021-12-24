import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getAllComments() {
    return this.http.get<any[]>('./api/comments');
    }

    insertComment (uname: string, cname: string, ctype:string, date: string) {
      return this.http.post<any[]>('./api/comments/', {'userName': uname, 'commentName': cname, 'commentType':ctype, 'commentDate': date});
      } 

      deleteComment(id: number) {
        return this.http.delete<any[]>('./api/comments/' + id);
        }

      updateComment(id, uname: string, cname: string, ctype:string, date: string) {
        return this.http.put<any[]>('./api/comments/' + id, {'userName': uname, 'commentName': cname, 'commentType':ctype, 'commentDate': date });
        }

}

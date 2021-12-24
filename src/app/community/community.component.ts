import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, Form } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  comments: any = [];
  myCommentForm: FormGroup;
  updateCommentDetails: FormGroup;
  closeResult = '';
  modalContent:undefined;
  editContent:undefined;
  commentId:string;

  searchComment;

  constructor(

    private modalService: NgbModal,
    private reactiveFormModule:ReactiveFormsModule,
    private commentService: CommentService,
    private fb: FormBuilder,
    private router:Router

  ) { 
         // Retrieve cpus from the API
         this.commentService.getAllComments().subscribe(comments => {
          this.comments = comments;
          });
  }

  edit(content2, comment) {
    //this.modalContent = content;
    this.modalContent = comment
    this.commentId = comment._id;
    console.log(this.commentId)
    console.log(content2)
    console.log(comment)
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'});
  }

  ngOnInit() {

    this.myCommentForm = this.fb.group({
      userName: '',
      commentName: '',
      commentType:'',
      commentDate: ''
      });

      this.updateCommentDetails = this.fb.group({
        editUserName: '',
        editCommentName: '',
        editCommentType:'',
        editCommentDate: ''
        });

  }

  onSubmit(){
    this.commentService.insertComment(
    this.myCommentForm.value.userName, 
    this.myCommentForm.value.commentName, 
    this.myCommentForm.value.commentType,
    this.myCommentForm.value.commentDate).subscribe(results => {
    location.reload();
    });
    }

    updateComment()
    {
    this.commentService.updateComment(this.commentId,
    this.updateCommentDetails.value.editUserName, 
    this.updateCommentDetails.value.editCommentName,
    this.updateCommentDetails.value.editCommentType, 
    this.updateCommentDetails.value.editCommentDate).subscribe(results => {
    location.reload();
  });
}


    deleteComment(id: number)
    {
      this.commentService.deleteComment(id).subscribe(results => {
      location.reload();
      });
    }

}

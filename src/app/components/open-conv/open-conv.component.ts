import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Users } from 'src/app/models/users';
import { MessagesService } from 'src/app/services/messages.service';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@Component({
  selector: 'app-open-conv',
  templateUrl: './open-conv.component.html',
  styleUrls: ['./open-conv.component.css']
})
export class OpenConvComponent {
  usersWithConversations: Users[] = [];
  currentUserId: String = localStorage.getItem('user_id')!;

  constructor(private messagesService: MessagesService,
              private modalService : NgbModal){}

  ngOnInit(): void {
    this.messagesService.getUserConversations(+this.currentUserId).subscribe(users => {
      this.usersWithConversations = users;
    });
  }

  continueConversation(user:Users){
    const modalRef = this.modalService.open(ChatModalComponent);
    modalRef.componentInstance.selectedUser = user;
  }

}

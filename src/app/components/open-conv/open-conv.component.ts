import { Component, Input } from '@angular/core';
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

  @Input() selectedUser!: Users;

  constructor(private messagesService: MessagesService,
              private modalService : NgbModal){}

  ngOnInit(): void {
    console.log('utilisateur pour la modal :', this.selectedUser)
    this.messagesService.getUserConversations(+this.currentUserId).subscribe(users => {
      this.usersWithConversations = users;
    });
  }

  continueConversation(user:Users){
    console.log('Ouverture de la modal pour user :', user)
    const modalRef = this.modalService.open(ChatModalComponent, {
      centered: true,
      size: 'lg',
      windowClass: 'custom-modal-width'
});
    modalRef.componentInstance.selectedUser = user;
  }

}

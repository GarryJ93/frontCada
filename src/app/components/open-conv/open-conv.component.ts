import { Component } from '@angular/core';
import { Users } from 'src/app/models/users';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-open-conv',
  templateUrl: './open-conv.component.html',
  styleUrls: ['./open-conv.component.css']
})
export class OpenConvComponent {
  usersWithConversations: Users[] = []; // déclarez ceci en tant que propriété de votre composant
  currentUserId: String = localStorage.getItem('user_id')!;

  constructor(private messagesService: MessagesService){}

  ngOnInit(): void {
    this.messagesService.getUserConversations(+this.currentUserId).subscribe(users => {
      this.usersWithConversations = users;
    });
  }

  continueConversation(id:number){}

}

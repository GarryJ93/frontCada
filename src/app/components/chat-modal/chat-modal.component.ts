import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/models/messages';
import { Users } from 'src/app/models/users';
import { MessagesService } from 'src/app/services/messages.service';
import { UsersService } from 'src/app/services/users.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-chat-modal',
  templateUrl: './chat-modal.component.html',
  styleUrls: ['./chat-modal.component.css']
})
export class ChatModalComponent {


  messages: Messages[] = [];
  messageForm: FormGroup;
  currentUser = { id: this.userService.getUserConnected()! };
  receiverUser = localStorage.getItem('receiverId')!

  @Input() otherUserId!: number;
  @Input() selectedUser!: Users;

  content!: string;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private messageService: MessagesService,
    private ws: WebSocketService,

  ) {
    this.messageForm = this.fb.group({
      newMessage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log("ID utilisateur courant:", this.currentUser.id);
    this.loadMessages();  

  }

  loadMessages(): void {
    console.log('ESSAYE DE RECUP DES MESSAGES')
    const currentUserId = this.currentUser.id;
 

    this.messageService.getUserChats(currentUserId, +(this.receiverUser)).subscribe({
      next: (existingMessages: Messages[]) => {
        console.log("Messages bruts reçus :", existingMessages);
        this.messages = existingMessages;
        const lastMessage = existingMessages[existingMessages.length - 1];
        console.log("Dernier message de la conv :", lastMessage);

      },
      error: error => {
        console.error('Erreur lors de la récup des messages existants:', error);
      }
    });

    console.log('listen to websocket');

    this.ws.listen('msgToClient').subscribe((data: any) => {
      console.log("Data recu :", data);

      if (typeof data === 'object' && 'id_user_send' in data && 'id_user_received' in data && 'message' in data && 'date' in data) {
        const newMessage: Messages = {
          id: 0,
          username: data.username,
          sender: data.sender_id,
          receiver: data.receiver_id,
          message: data.content,
          date: new Date(data.timestamp),
        };

        this.messages.push(newMessage);
      }
    });


  }


  sendMessage(content: string, receiverId: number): void {
    if (this.messageForm.valid && this.currentUser.id) {
      const newMessage = this.messageForm.get('newMessage')?.value.trim();
      console.log(newMessage); //OK
      console.log(this.messageForm)
      console.log('receveur', this.receiverUser);
      console.log('expéditeur du massage', this.currentUser.id)



      if (newMessage) {
        this.messageService.sendMessage(newMessage, this.currentUser.id, receiverId).subscribe(data => {
          this.messageForm.reset();
        });
      }
    }
  }




}



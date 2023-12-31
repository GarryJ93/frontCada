import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
export class ChatModalComponent implements OnInit {


  messages: Messages[] = [];
  messageForm: FormGroup;
  currentUser = { id: this.userService.getUserConnected()! };
  receiverUser = localStorage.getItem('receiverId')!
  senderUsername : string = localStorage.getItem('username')!;

  @Input() otherUserId!: number;
  @Input() selectedUser!: Users;



  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private messageService: MessagesService,
    private ws: WebSocketService,
    private modalService: NgbModal,

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
    const receiverId = this.selectedUser.id_user;

    this.messageService.getUserChats(currentUserId, receiverId).subscribe({
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
      console.log("Data recu du serveur:", data);
      console.log('Type de data:', typeof data);
      console.log('Valeur de data:', data);

      if (typeof data === 'object' && 'sender' in data && 'receiver' in data && 'message' in data && 'date' in data) {
        const newMessage: Messages = {
          id_message: 0,
          username: data.username,
          sender: data.sender,
          receiver: data.receiver,
          message: data.message,
          date: new Date(data.date),
        };
        console.log('Messages avant ajout:', this.messages);
        this.messages.push(newMessage);
        console.log('Messages après ajout:', this.messages)
        console.log('ENVOYEUR DATA', data.sender)
      }
      
    });
  
  }



  sendMessage(): void {
    if (this.messageForm.valid && this.currentUser.id) {
      const newMessageContent = this.messageForm.get('newMessage')?.value.trim();
      if (newMessageContent) {
        const newMessage: Messages = {
          id_message: 0,
          username: this.senderUsername, 
          sender: {id_user: +this.currentUser.id}, 
          receiver: { id_user: +this.receiverUser }, 
          message: newMessageContent,
          date: new Date(),
        };

        this.messageService.sendMessage(newMessageContent, this.currentUser.id, +this.receiverUser).subscribe(data => {
          this.messageForm.reset();
        });

        this.ws.emit('msgToServer', newMessage);
      }
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }


}

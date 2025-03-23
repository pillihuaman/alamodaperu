import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {  NbButtonModule,  } from '@nebular/theme';
import { ReqSpeech } from '../../../../../@data/model/general/reqSpeech';
import { NebularSharedModule } from '../../../../../@domain/nebular-shared.module';
import { ChatRepository } from '../../../../../@domain/repository/repository/chat.repository';

@Component({
  selector: 'app-chat-boot',
  templateUrl: './chat-boot.component.html',
  styleUrls: ['./chat-boot.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, // ✅ Necessary for <router-outlet>
    NbButtonModule,

    NebularSharedModule
  ]
})
export class ChatBootComponent implements OnInit {
  chatForm!: FormGroup; // ✅ Define the property without initializing it

  constructor(
    private formBuilder: FormBuilder, // ✅ Now correctly injected
    private chatRepository: ChatRepository
  ) {}

  ngOnInit(): void {
    // ✅ Initialize chatForm inside ngOnInit when formBuilder is available
    this.chatForm = this.formBuilder.group({
      keyWord: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(15)],
      ],
    });
  }

  submit() {
    const chat: ReqSpeech = {
      keyWord: this.chatForm.get('keyWord')?.value,
    };

    this.chatRepository.speech(chat).subscribe(
      (value) => {
        console.log('Success:', value);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  state(trues: any) {
    return trues;
  }
}

import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbIconModule, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NbCardModule, NbIconModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Output() deleteConfirmed = new EventEmitter<void>();
  rowData: any;

  constructor(@Inject(NbDialogRef) protected dialogRef: NbDialogRef<ModalComponent>) {}

  cancelar() {
    this.dialogRef.close();
  }

  deleteInformation() {
    this.deleteConfirmed.emit();
    console.log('Deleting information...');
    this.dialogRef.close();
  }

  getIconClass(typeDescription: string): string {
    switch (typeDescription) {
      case 'WARNING':
        return 'warning-icon';
      case 'INFO':
        return 'info-icon';
      case 'QUESTION':
        return 'question-icon';
      default:
        return ''; 
    }
  }
}

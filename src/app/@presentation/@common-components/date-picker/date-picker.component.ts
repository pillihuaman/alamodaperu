import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NbLayoutModule, NbMenuModule, NbIconModule } from '@nebular/theme';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
    standalone: true,
    imports: [CommonModule, RouterModule, NbLayoutModule, NbMenuModule, NbIconModule,MatIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit {
  @Input() placeholder: any;

  constructor() { }

  ngOnInit(): void {
  }

}

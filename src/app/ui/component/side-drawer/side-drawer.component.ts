import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { DirtyCheckComponent } from '../../../shared/dirty-check/dirty-check.component';
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
  selector: 'ui-side-drawer',
  template: `
    <ui-backdrop [opened]="opened" (click)="openedChange.emit(false)" />

    <div class="side-drawer" [class.opened]="opened">
      <dirty-check></dirty-check>
      <ng-content />
    </div>
  `,
  styleUrls: ['./side-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [BackdropComponent, DirtyCheckComponent],
})
export class SideDrawerComponent {
  @Input() opened = false;
  @Output() openedChange = new EventEmitter<boolean>();
}

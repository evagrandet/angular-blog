import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export type AlertType = 'success' | 'danger' | 'warning';
export interface Alert {
  type: AlertType,
  text: string
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  throwAlert(alert: Alert) {
    this.alert$.next(alert);
  }
}

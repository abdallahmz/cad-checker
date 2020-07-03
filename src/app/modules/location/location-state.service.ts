import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Point = [number, number];

export enum LoadingStatus {
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  OK = 'OK'
}

export class LoadingState {
  status: LoadingStatus;
  message?: string;

  constructor(status: LoadingStatus, message?: string) {
    this.status = status;
    this.message = message;
  }
}

export interface ILocation {
  name: string;
  departement: string;
  commune: string;
  bounds: [Point, Point];
}

@Injectable({
  providedIn: 'root'
})
export class LocationStateService {
  private _data = new BehaviorSubject<ILocation>(undefined);

  public readonly data$ = this._data.asObservable();

  private readonly _dataState = new BehaviorSubject<LoadingState>({status: LoadingStatus.OK});

  public readonly dataState$ = this._dataState.asObservable();

  constructor() { }

  get data(): ILocation {
    return this._data.getValue();
  }

  set data(data: ILocation) {
    this._data.next(data);
  }

  get dataState(): LoadingState {
    return this._dataState.getValue();
  }

  set dataState(state: LoadingState) {
    this._dataState.next(state);
  }
}

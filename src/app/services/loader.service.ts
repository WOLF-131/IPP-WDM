
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService
{
  public loader: boolean;

  loaderUpdated: EventEmitter<boolean> = new EventEmitter();

  constructor()
  {
    this.loader = false;
  }


  toggleLoader()
  {
    this.loader = !this.loader
    this.loaderUpdated.emit(this.loader);
  }
}
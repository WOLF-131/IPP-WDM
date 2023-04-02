import { Component, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  loading: boolean;
  title: string;
  user: string;
  version: string;

  constructor(private loaderService: LoaderService, private userService: UserService)
  {
    this.loading = false;
    this.title = "WDM";
    this.user = ""
    this.version = "0.0.1-DEV"
  }

  ngOnInit()
  {
    this.loaderService.loaderUpdated.subscribe(() => this.loading = this.loaderService.loader);

    this.userService.getUser().then((result) => this.user = result);
  }
}

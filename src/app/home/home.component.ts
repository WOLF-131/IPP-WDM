import { Component, OnInit } from '@angular/core';
import { Manual } from '../types/manual.type';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ManualService } from '../services/manual.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
  // Fontawesome
  faPen = faPen;
  faTrash = faTrash;

  searchTerm;
  manuals: Manual[];
  displayManuals: Manual[];
  selectedManual: Manual;

  constructor(
    private readonly manualService: ManualService,
    private readonly loaderService: LoaderService
  )
  {
    // Set default values
    this.searchTerm = '';
    this.manuals = [];
    this.displayManuals = [];
    this.selectedManual = {} as Manual;
  }

  ngOnInit(): void
  {
    this.loaderService.toggleLoader();
    this.manualService.getManuals().subscribe((result) =>
    {
      this.manuals = result;
      this.displayManuals = result;
    });
    this.loaderService.toggleLoader();
  }

  editManual(manual: Manual)
  {
    location.href = "/edit/" + manual.Id;
  }

  openManual(manual: Manual)
  {
    this.manualService.getFullManual(manual.Id).then((result) =>
    {
      this.selectedManual = result;
    });
  }

  enterSearch()
  {
    this.displayManuals = this.manuals.filter(m => m.DocumentTitel.toLowerCase().includes(this.searchTerm.toLowerCase()))
  }

  clearSearch()
  {
    this.searchTerm = "";
    this.displayManuals = this.manuals;
  }
}

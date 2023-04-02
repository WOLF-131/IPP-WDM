import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { ManualService } from '../services/manual.service';
import { Manual, ManualType } from '../types/manual.type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit
{

  id = 0;
  manual: Manual;
  isEdit: boolean;
  pageTitle = 'Dokument Erstellen';

  constructor(
    private route: ActivatedRoute,
    private readonly manualService: ManualService,
    private readonly loaderService: LoaderService,
    private readonly modalService: NgbModal
  )
  {
    // Get id from route. If null or undefined assign 0.
    this.id = this.route.snapshot.params["id"];
    this.id ??= 0;

    this.manual = { Id: 0, Titel: "", MatNr: 0, DocumentTitel: "", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" };

    // Confirm component status and set title
    this.isEdit = this.id !== 0;
    this.pageTitle = this.isEdit ? "Dokument Editieren" : "Dokument Erstellen";
  }


  async ngOnInit()
  {
    console.log(this.id);

    if (this.isEdit)
    {
      this.loaderService.toggleLoader();
      this.manualService.getFullManual(this.id).then((result) => this.manual = result);
      this.loaderService.toggleLoader();
    }
  }

  modalOpenConfirm(content: unknown)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getManualData(event: Event)
  {
    // Cast to HTMLInputElement so that TS knows event.target is an instance of it and stops complaining.
    const target = event.target as HTMLInputElement;
    // Cast to FileList so that TS knows target.files is an instance of it and stops complaining.
    const files = target.files as FileList;
    const file: File = files[0];
    this.manual.DocumentTitel = file.name;
    const reader: FileReader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => this.manual.Document = reader.result as string;
    reader.onerror = () => console.error("Failed to process file.")
  }

  saveManual()
  {
    this.loaderService.toggleLoader();
    if (this.isEdit)
    {
      this.manualService.updateManual(this.manual);
    }
    else
    {
      this.manualService.createManual(this.manual);
    }
    this.loaderService.toggleLoader();
  }

  deleteManual()
  {
    this.manualService.deleteManual(this.id);
    location.href = "/"
  }
}

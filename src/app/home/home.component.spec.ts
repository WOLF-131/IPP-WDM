import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { ManualService } from '../services/manual.service';
import { LoaderService } from '../services/loader.service';
import { Manual, ManualType } from '../types/manual.type';
import { of } from 'rxjs';

describe('HomeComponent', () =>
{
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let manualService: ManualService;
  let loaderService: LoaderService;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [ManualService, LoaderService],
    }).compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    manualService = TestBed.inject(ManualService);
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should load manuals on ngOnInit', () =>
  {
    const mockManuals: Manual[] = [
      { Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 2, Titel: "Test Manual 2", MatNr: 0, DocumentTitel: "Test 2", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 3, Titel: "Test Manual 3", MatNr: 0, DocumentTitel: "Test 3", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
    ];

    spyOn(manualService, 'getManuals').and.returnValue(of(mockManuals));
    spyOn(loaderService, 'toggleLoader');

    component.ngOnInit();

    expect(loaderService.toggleLoader).toHaveBeenCalledTimes(2);
    expect(manualService.getManuals).toHaveBeenCalled();
    expect(component.manuals).toEqual(mockManuals);
    expect(component.displayManuals).toEqual(mockManuals);
  });

  it('should filter manuals when entering search term', () =>
  {
    component.manuals = [
      { Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 2, Titel: "Test Manual 2", MatNr: 0, DocumentTitel: "Test 2", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 3, Titel: "Test Manual 3", MatNr: 0, DocumentTitel: "Test 3", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
    ];
    component.displayManuals = component.manuals;

    component.searchTerm = '1';
    component.enterSearch();

    expect(component.displayManuals).toEqual([{ Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" }]);
  });

  it('should clear search term and reset displayManuals', () =>
  {
    component.manuals = [
      { Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 2, Titel: "Test Manual 2", MatNr: 0, DocumentTitel: "Test 2", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 3, Titel: "Test Manual 3", MatNr: 0, DocumentTitel: "Test 3", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
    ];
    component.displayManuals = [{ Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" }];
    component.searchTerm = '1';

    component.clearSearch();

    expect(component.searchTerm).toEqual('');
    expect(component.displayManuals).toEqual(component.manuals);
  });
});


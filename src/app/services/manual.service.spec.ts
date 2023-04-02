import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ManualService } from './manual.service';
import { Manual, ManualType } from '../types/manual.type';

describe('ManualService', () =>
{
  let service: ManualService;
  let httpTestingController: HttpTestingController;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManualService],
    });

    service = TestBed.inject(ManualService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() =>
  {
    httpTestingController.verify();
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });

  it('should get all manuals', () =>
  {
    const mockManuals: Manual[] = [
      { Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 2, Titel: "Test Manual 2", MatNr: 0, DocumentTitel: "Test 2", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 3, Titel: "Test Manual 3", MatNr: 0, DocumentTitel: "Test 3", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
    ];

    service.getManuals().subscribe((manuals) =>
    {
      expect(manuals).toEqual(mockManuals);
    });

    const req = httpTestingController.expectOne(`${location.origin}/api/manual`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockManuals);
  });

  it('should get a full manual by id', async () =>
  {
    const mockManual: Manual = { Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" };

    service.getFullManual(mockManual.Id).then((manual) =>
    {
      expect(manual).toEqual(mockManual);
    });

    const req = httpTestingController.expectOne(`${location.origin}/api/manual/${mockManual.Id}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockManual);

    // Ensure no outstanding requests
    httpTestingController.verify();
  });

  it('should search manuals by matNr', async () =>
  {
    const searchId = 42;
    const mockManuals: Manual[] = [
      { Id: 1, Titel: "Test Manual 1", MatNr: 2134842, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 2, Titel: "Test Manual 2", MatNr: 3942349, DocumentTitel: "Test 2", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
      { Id: 3, Titel: "Test Manual 3", MatNr: 2348425, DocumentTitel: "Test 3", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" },
    ];

    (await service.searchByMatNr(searchId)).subscribe((manuals) =>
    {
      expect(manuals).toEqual(mockManuals);
    });

    const req = httpTestingController.expectOne(`${location.origin}/api/manual/search/${searchId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockManuals);
  });

  it('should create a manual', () =>
  {
    const mockManual: Manual = { Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" };

    service.createManual(mockManual);

    const req = httpTestingController.expectOne(`${location.origin}/api/manual/create`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockManual);
    req.flush(null);
  });

  it('should update a manual', () =>
  {
    const mockManual: Manual = { Id: 1, Titel: "Test Manual 1", MatNr: 0, DocumentTitel: "Test 1", ManualType: ManualType.repack, Document: "", CreateDate: new Date, CreateUser: "", UpdateDate: new Date, UpdateUser: "", Reason: "" };

    service.updateManual(mockManual);

    const req = httpTestingController.expectOne(`${location.origin}/api/manual/create`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockManual);
    req.flush(null);
  });
});
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () =>
{
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
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

  it('should get the current user', async () =>
  {
    const mockUser = 'test_user';
    const mockUserWithDomain = `DOMAIN\\${mockUser}`;

    const user = await service.getUser();
    expect(user).toEqual(mockUser);

    const req = httpTestingController.expectOne(`${location.origin}/api/user/getLoginUser`);
    expect(req.request.method).toEqual('GET');
    expect(req.request.responseType).toEqual('text');
    req.flush(mockUserWithDomain);
  });
});

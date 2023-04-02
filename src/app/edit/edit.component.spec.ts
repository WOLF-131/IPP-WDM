import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';

describe('EditComponent', () =>
{
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EditComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});
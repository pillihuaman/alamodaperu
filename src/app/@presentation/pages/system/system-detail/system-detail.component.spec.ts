import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDetailComponent } from './system-detail.component';

describe('SystemDetailComponent', () => {
  let component: SystemDetailComponent;
  let fixture: ComponentFixture<SystemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SystemDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistritoDialogComponent } from './distrito-dialog.component';

describe('DistritoDialogComponent', () => {
  let component: DistritoDialogComponent;
  let fixture: ComponentFixture<DistritoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistritoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistritoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

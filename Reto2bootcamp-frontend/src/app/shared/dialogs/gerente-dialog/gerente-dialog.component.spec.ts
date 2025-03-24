import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteDialogComponent } from './gerente-dialog.component';

describe('GerenteDialogComponent', () => {
  let component: GerenteDialogComponent;
  let fixture: ComponentFixture<GerenteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

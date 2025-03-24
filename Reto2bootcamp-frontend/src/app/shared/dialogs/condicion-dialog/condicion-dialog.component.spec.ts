import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicionDialogComponent } from './condicion-dialog.component';

describe('CondicionDialogComponent', () => {
  let component: CondicionDialogComponent;
  let fixture: ComponentFixture<CondicionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CondicionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CondicionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

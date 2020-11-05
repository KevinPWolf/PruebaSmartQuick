import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOlimpComponent } from './table-olimp.component';

describe('TableOlimpComponent', () => {
  let component: TableOlimpComponent;
  let fixture: ComponentFixture<TableOlimpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOlimpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOlimpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSearch } from './student-search';

describe('StudentSearch', () => {
  let component: StudentSearch;
  let fixture: ComponentFixture<StudentSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

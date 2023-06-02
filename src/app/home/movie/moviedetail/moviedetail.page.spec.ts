import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviedetailPage } from './moviedetail.page';

describe('MoviedetailPage', () => {
  let component: MoviedetailPage;
  let fixture: ComponentFixture<MoviedetailPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(MoviedetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

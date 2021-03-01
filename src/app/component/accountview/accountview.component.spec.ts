/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccountviewComponent } from './accountview.component';

describe('AccountviewComponent', () => {
  let component: AccountviewComponent;
  let fixture: ComponentFixture<AccountviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

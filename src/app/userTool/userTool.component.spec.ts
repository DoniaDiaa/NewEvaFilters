/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserToolComponent } from './userTool.component';

describe('UserToolComponent', () => {
  let component: UserToolComponent;
  let fixture: ComponentFixture<UserToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

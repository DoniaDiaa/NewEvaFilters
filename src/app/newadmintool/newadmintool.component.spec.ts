/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewadmintoolComponent } from './newadmintool.component';

describe('NewadmintoolComponent', () => {
  let component: NewadmintoolComponent;
  let fixture: ComponentFixture<NewadmintoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewadmintoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewadmintoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

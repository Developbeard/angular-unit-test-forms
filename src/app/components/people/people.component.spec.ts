import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PersonClass } from '../../models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#Should have a list app-person component', () => {
    component.people = [
      new PersonClass('Tania', 'Apau', 31, 54, 1.58),
      new PersonClass('Adriano', 'Alejos', 7, 24, 1.22),
      new PersonClass('Patricia', 'de La Barrera', 8, 30, 1.32),
    ];
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));

    expect(debugElement.length).toEqual(component.people.length);
  });

  it('#Should raise selected event when clicked', () => { 
    const debugElement = fixture.debugElement.query(By.css('app-person button.btn-choose'));
    debugElement.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('#Should render the selected person', () => {
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDe = fixture.debugElement.query(By.css('.selectedItem ul > li'));
    expect(liDe.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });
});

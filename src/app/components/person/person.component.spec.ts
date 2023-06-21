import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PersonClass } from '../../models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#Should create', () => {
    expect(component).toBeTruthy();
  });

  it('#Should the namr be "Rodrigo"', () => {
    component.person = new PersonClass('Rodrigo', 'de La Barrera', 30, 99, 1.74);
    expect(component.person.name).toEqual('Rodrigo');
  });

  it('#Should have <p> with "Mi altura es {person.heigth}" (nativeElement)', () => {          //<------ Es un metodo no agnostico para trabajar desde el mismo browser sin server side rendering
    component.person = new PersonClass('Rodrigo', 'de La Barrera', 30, 99, 1.74);
    const mockMessage = `Mi altura es ${component.person.heigth}`;
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');
    fixture.detectChanges();
    expect(p?.textContent).toEqual(mockMessage);
  });

  it('#Should have <p> with "Mi altura es {person.heigth}" (debugElement)', () => {          //<------ Es un metodo agnostico para trabajar usando server side rendering con debugElement
    component.person = new PersonClass('Rodrigo', 'de La Barrera', 30, 99, 1.74);
    const mockMessage = `Mi altura es ${component.person.heigth}`;
    const personDebug: DebugElement = fixture.debugElement;
    const personElement: HTMLElement = personDebug.nativeElement;
    const p = personElement.querySelector('p');
    fixture.detectChanges();
    expect(p?.textContent).toEqual(mockMessage);
  });

  it('#Should have <p> with "Mi altura es {person.heigth}" (Bycss)', () => {          //<------ Es un metodo agnostico para trabajar usando server side rendering con Bycss
    component.person = new PersonClass('Rodrigo', 'de La Barrera', 30, 99, 1.74);
    const mockMessage = `Mi altura es ${component.person.heigth}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const personElement: HTMLElement = pDebug.nativeElement;
    fixture.detectChanges();
    expect(personElement?.textContent).toEqual(mockMessage);
  });

  it('#Should have <h3> with "Hola, {person.name}" (Bycss)', () => {          //<------ Es un metodo agnostico para trabajar usando server side rendering con Bycss
    component.person = new PersonClass('Rodrigo', 'de La Barrera', 30, 99, 1.74);
    const mockMessage = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('h3'));
    const personElement: HTMLElement = pDebug.nativeElement;
    fixture.detectChanges();
    expect(personElement?.textContent).toEqual(mockMessage);
  });

  it('#Should display text with IMC when call function calcIMC', () => {
    component.person = new PersonClass('Tania', 'Apau', 31, 54, 1.58);
    const expectMessage = 'normal';
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    component.calcIMC();
    fixture.detectChanges();
    expect(button.textContent).toContain(expectMessage);
  });

  it('#Should display text with IMC when do click', () => {
    component.person = new PersonClass('Tania', 'Apau', 31, 54, 1.58);
    const expectMessage = 'normal';
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonEl = buttonDe.nativeElement;
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(buttonEl.textContent).toContain(expectMessage);
  });

  it('#Should raise selected event when do click', () => {
    const expectPerson = new PersonClass('Tania', 'Apau', 31, 54, 1.58);
    component.person = expectPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));
    let selectedPerson: PersonClass | undefined;
    component.onSelected.subscribe(person => {
      selectedPerson = person;
    })
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(selectedPerson).toEqual(expectPerson);
  });

  it('#Should raise IMC event when do click', () => {
    component.person = new PersonClass('Tania', 'Apau', 31, 54, 1.58);
    const expectImc = 'normal';
    component.imc = expectImc;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-imc'));
    let selectedImc: string | undefined;
    component.onImc.subscribe(imc => {
      selectedImc = imc;
    })
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(selectedImc).toEqual(expectImc);
  });
});

@Component({
  template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
})

class HostComponent {
  person = new PersonClass('Ariadna', 'Sanchez', 29, 54, 1.61);
  selectedPerson: PersonClass | undefined;

  onSelected(person: PersonClass){
    this.selectedPerson = person
  }
}

describe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#Should create', () => {
    expect(component).toBeTruthy();
  });

  it("#Should display person name", () => {
    const expectName = component.person.name;
    const h3De = fixture.debugElement.query(By.css('app-person h3'));
    const h3El = h3De.nativeElement;
    fixture.detectChanges();
    expect(h3El.textContent).toContain(expectName);
  });

  it("#Should display selected event when clicked", () => {
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    buttonDe.triggerEventHandler('click', null)
    fixture.detectChanges();
    expect(component.selectedPerson).toEqual(component.person);
  });
});

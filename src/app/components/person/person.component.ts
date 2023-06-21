import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PersonClass } from '../../models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  @Input() person: PersonClass = new PersonClass('', '', 0, 0, 0);
  @Output() onSelected = new EventEmitter<PersonClass>();
  @Output() onImc = new EventEmitter<string>();
  imc:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  calcIMC() {
    this.imc = this.person.calcIMC();
    this.onImc.emit(this.imc);
  }

  onClick(){
    this.onSelected.emit(this.person);
  }

}

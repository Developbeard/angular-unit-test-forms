import { Component, OnInit } from '@angular/core';
import { PersonClass } from '../../models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  person: PersonClass = new PersonClass('Rodrigo', 'de La Barrera', 30, 99, 1.74);
  people: PersonClass[] = [
    new PersonClass('Tania', 'Apau', 31, 54, 1.58),
    new PersonClass('Adriano', 'Alejos', 7, 24, 1.22),
    new PersonClass('Patricia', 'de La Barrera', 8, 30, 1.32),
  ]
  selectedPerson: PersonClass | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  choosePerson(person: PersonClass) {
    this.selectedPerson = person;
  }

}

import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Monster} from "../../interfaces/monster";
import {FormValidationService} from "../../services/formValidationService/form-validation.service";
import {EntityTypes} from "../../interfaces/enums";

@Component({
  selector: 'app-monster-form',
  templateUrl: './monster-form.component.html',
  styleUrls: ['./monster-form.component.css']
})
export class MonsterFormComponent {

  @Output() monsterCreated= new EventEmitter<Monster>();

  monsterForm = this.formBuilder.group({
    initiative: ['', Validators.required],
    name: ['', Validators.required],
    race: ['', Validators.required],
    maxHp: ['', Validators.compose([Validators.required, Validators.min(0)])],
    xp: ['', Validators.compose([Validators.required, Validators.min(0)])],
    sheetURL: ['', Validators.required],
    note: [''],
  })

  autoInitiative: boolean = false
  dexMod: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService
  ) { }

  /**
   * Creates a new monster based on the information of the form and triggers an event to pass it up to the parent
   */
  addMonster() {
    const newMonster: Monster = {
      type: EntityTypes.monster,
      initiative: this.autoInitiative ? (MonsterFormComponent.rollD20() + this.dexMod) : Number.parseInt(this.monsterForm.get('initiative')?.value || "0"),
      name: this.monsterForm.get('name')?.value || '',
      race: this.monsterForm.get('race')?.value || '',
      hp: Number.parseInt(this.monsterForm.get('maxHp')?.value || "1"),
      maxHp: Number.parseInt(this.monsterForm.get('maxHp')?.value || "1"),
      xp: Number.parseInt(this.monsterForm.get('xp')?.value || "0"),
      sheetURL: this.monsterForm.get('sheetURL')?.value || '',
      note: ""
    }
    this.monsterCreated.emit(newMonster);
    this.monsterForm.reset();
    this.dexMod = 0;
  }

  /**
   * Returns an integer between 1 and 20
   * @private
   */
  private static rollD20(): number {
    return Math.ceil(Math.random() * 20);
  }

  invalidControl(controlName: string): boolean {
    return this.formValidationService.invalidControl(this.monsterForm?.get(controlName));
  }

  /**
   * Switches on or off the initiative input
   */
  switchInitiativeInput() {
    this.autoInitiative = !this.autoInitiative;
    if (this.autoInitiative) {
      this.monsterForm.get('initiative')?.disable();
    } else {
      this.monsterForm.get('initiative')?.enable();
    }
  }
}

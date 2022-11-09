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

  @Output() monsterCreated = new EventEmitter<Monster>();

  monsterForm = this.formBuilder.group({
    initiative: ['', Validators.required],
    name: ['', Validators.required],
    race: ['', Validators.required],
    maxHp: ['', Validators.compose([Validators.required, Validators.min(0)])],
    xp: ['', Validators.compose([Validators.required, Validators.min(0)])],
    sheetURL: ['', Validators.required],
    note: [''],
  });

  autoInitiative: boolean = false;
  dexMod: number = 0;

  isGroup: boolean = false;
  monsterQuantity: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService
  ) { }

  /**
   * Creates a new Monster instance from the form and the given data, then emits it for
   * the parent using the Output of this component
   * @param initiative
   * @param appendName
   */
  emitMonster(initiative: number, appendName: string){
    const newMonster: Monster = {
      type: EntityTypes.monster,
      initiative: initiative,
      name: (this.monsterForm.get('name')?.value || '') + ' ' + appendName,
      race: this.monsterForm.get('race')?.value || '',
      hp: Number.parseInt(this.monsterForm.get('maxHp')?.value || "1"),
      maxHp: Number.parseInt(this.monsterForm.get('maxHp')?.value || "1"),
      xp: Number.parseInt(this.monsterForm.get('xp')?.value || "0"),
      sheetURL: this.monsterForm.get('sheetURL')?.value || '',
      note: this.monsterForm.get('note')?.value || ''
    }
    this.monsterCreated.emit(newMonster);
  }

  /**
   * Returns an integer between 1 and 20
   * @private
   */
  private static rollD20(): number {
    return Math.ceil(Math.random() * 20);
  }

  /**
   * Returns a random initiative value using the user-provided Dex Modifier if `this.autoInitiative` is true,
   * or the user-provided initiative value otherwise.
   */
  getInitiativeValue(){
    return this.autoInitiative ? (MonsterFormComponent.rollD20() + this.dexMod) : Number.parseInt(this.monsterForm.get('initiative')?.value || "0");
  }

  /**
   * Calls this.emitMonster() an amount of times specified by the user to create as many monsters as desired.
   *
   * This method handles groups (monsters with the same initiative), and appends a suffix to each monster's name if there
   * is more than one.
   *
   * This method resets the form after it ran.
   */
  addMonster() {
    // Make sure to create at least one monster
    if (this.monsterQuantity < 1) this.monsterQuantity = 1;

    // Prepare an initiative value common to use if the user wants a group of monsters
    const groupInitiative = this.getInitiativeValue();

    // Emit as many new monsters with the desired values as the user wants
    for (let i = 0; i < this.monsterQuantity; i++){
      // If we have more than one monster, give them a suffix to differentiate them from one another
      // Otherwise if the monster is alone, it doesn't need a suffix
      // We convert i to 1-based indexing here since it's for humans
      const nameSuffix: string = this.monsterQuantity > 1 ? (i + 1).toString(10) : '';
      if (this.isGroup){
        this.emitMonster(groupInitiative, nameSuffix);
      } else {
        this.emitMonster(this.getInitiativeValue(), nameSuffix);
      }
    }

    // Clean up the form once everything has been added
    this.monsterForm.reset();
    this.dexMod = 0;
    this.monsterQuantity = 1;
  }

  /**
   * Delegates to FormValidationService.invalidControl()
   * @param controlName
   */
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

  /**
   * Resets the monster form, and puts the standalone fields back to their original values
   */
  resetForm() {
    this.monsterForm.reset();
    this.autoInitiative = false;
    this.dexMod = 0;
    this.monsterForm.get('initiative')?.enable();
    this.isGroup = false;
    this.monsterQuantity = 1;
  }
}

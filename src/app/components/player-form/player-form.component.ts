import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FormValidationService} from "../../services/formValidationService/form-validation.service";
import {EntityTypes} from "../../interfaces/enums";
import {Player} from "../../interfaces/player";

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.css']
})
export class PlayerFormComponent {

  @Output() playerCreated = new EventEmitter<Player>();

  playerForm = this.formBuilder.group({
    initiative: ['', Validators.required],
    name: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService
  ) { }

  /**
   * Creates a new player based on the information of the form and triggers an event to pass it up to the parent
   */
  addMonster() {
    const newPlayer: Player = {
      type: EntityTypes.player,
      initiative: Number.parseInt(this.playerForm.get('initiative')?.value || "0"),
      name: this.playerForm.get('name')?.value || ''
    }
    this.playerCreated.emit(newPlayer);
    this.playerForm.reset();
  }

  invalidControl(controlName: string): boolean {
    return this.formValidationService.invalidControl(this.playerForm?.get(controlName));
  }

  resetForm() {
    this.playerForm.reset();
  }

}

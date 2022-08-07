import { Injectable } from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  /**
   * Returns true if the given control is in an invalid state
   * @param control
   */
  invalidControl(control: AbstractControl | null | undefined): boolean {
    return control ? control.invalid && (control.dirty || control.touched) : true;
  }
}

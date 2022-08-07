import {Component} from '@angular/core';
import {Entity} from "./interfaces/entity";
import {EntityTypes} from "./interfaces/enums";
import {Monster} from "./interfaces/monster";
import {Player} from "./interfaces/player";
import {ModalComponent} from "./components/modal/modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dnd-initiative-tracker';

  initiativePointer = 0;
  anEntityPlayed = false; // Used to detect and prevent infinite looping when trying to find an entity that can play

  entities: Entity[] = [
    {
      type: EntityTypes.monster,
      initiative: 18,
      name: "Grog",
      hp: 20,
      maxHp: 20,
      xp: 50,
      race: "Gobelin",
      sheetURL: "https://www.google.com",
      note: "Lorem ipsum dolor sit amet"
    } as Monster,
    {
      type: EntityTypes.monster,
      initiative: 18,
      name: "Grog",
      hp: 0,
      maxHp: 20,
      xp: 50,
      race: "Gobelin",
      sheetURL: "https://www.google.com",
      note: ""
    } as Monster,
    {
      type: EntityTypes.player,
      initiative: 16,
      name: "Kleeck",
    } as Player
  ];

  /**
   * Increments the value of the initiative pointer so that it indicates whose turn it is.
   *
   * Loops back to 0 when it reaches the size of the list.
   *
   * Has a special protection to avoid infinite looping if no one can play.
   */
  incrementInitiativePointer(): void {
    this.initiativePointer++;
    if (this.initiativePointer >= this.entities.length) {
      // To avoid an infinite loop in case no entity can play, we set the pointer to 0 only if at least one entity has played
      // If no entity played, we set the pointer to -1. This way, no entity will be highlighted and so the program won't try
      // to find an entity that can play until the user presses the next turn button
      if (this.anEntityPlayed) {
        this.initiativePointer = 0
      } else {
        this.initiativePointer = -1;
      }
      this.anEntityPlayed = false;
    }
  }

  /**
   * If the entity asked to be skipped, then we increment the pointer to select the next entity. Else, we leave the pointer
   * where it is and note that at least one entity played.
   * @param $event
   */
  handleSelectionResult($event: boolean) {
    if ($event) {
      // Use setTimeout to increment for three reasons :
      // 1. Allow this function to finish cleanly
      // 2. Allow angular's binding to settle (error ExpressionChangedAfterItHasBeenCheckedError otherwise)
      // 3. To make a simple animation while the program searches for a candidate
      setTimeout(() => this.incrementInitiativePointer(), 100);
    } else {
      this.anEntityPlayed = true;
    }
  }

  /**
   * Deletes the entity at the given index from the list of entities
   * @param $event
   */
  deleteEntity($event: number) {
    if ($event >= 0){
      this.entities.splice($event, 1);
      if ($event <= this.initiativePointer){
        this.initiativePointer--;
      }
    }
  }

  modalRef: ModalComponent | null = null;
  showModal(modal: ModalComponent) {
    modal.showModal();
    this.modalRef = modal;
  }

  hideModal(){
    this.modalRef?.closeModal();
    this.modalRef = null;
  }

  /**
   * Adds the given entity to the list of entities
   * @param $event
   */
  addEntity($event: Entity) {
    this.entities.push($event);
    // Save the entity whose turn it is before sorting so that adding entities doesn't skip a turn
    const currentPlayingEntity = this.entities[this.initiativePointer];
    this.sortEntityList();
    this.initiativePointer = this.entities.indexOf(currentPlayingEntity);
    // Hide the form modal after adding the entity
    this.hideModal();
  }

  /**
   * Sorts the list of entities by descending order of initiative
   */
  sortEntityList(): void {
    this.entities.sort((a, b) => b.initiative - a.initiative);
  }
}

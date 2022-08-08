import {Component} from '@angular/core';
import {Entity} from "./interfaces/entity";
import {ModalComponent} from "./components/modal/modal.component";

import {SaveService} from "./services/saveService/save.service";

import { faFloppyDisk, faFolderOpen, faCompactDisc, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dnd-initiative-tracker';

  saveIcon = faFloppyDisk;
  folderIcon = faFolderOpen;
  cdIcon = faCompactDisc;
  downloadIcon = faDownload;
  uploadIcon = faUpload;

  initiativePointer = 0;
  anEntityPlayed = false; // Used to detect and prevent infinite looping when trying to find an entity that can play

  entities: Entity[] = [];

  constructor(
    private saveService: SaveService
  ) {}

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
      if ($event < this.initiativePointer){
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

  save() {
    if (confirm("This will erase the previous save, are you sure ?")){
      this.saveService.save(this.entities);
    }
  }

  load() {
    if (this.entities.length === 0 || confirm("This will erase the current content, are you sure ?")){
      this.entities = this.saveService.load();
      this.initiativePointer = 0;
    }
  }

  download() {
    this.saveService.download(this.entities);
  }

  /**
   * Parses the content of the file fetched by this.saveService.upload() and uses it as the entity list
   */
  upload() {
    this.saveService.upload(
      (reader: FileReader) => {
        try {
          if (reader.result){
            this.entities = JSON.parse(<string>reader.result);
            this.initiativePointer = 0;
          } else {
            alert("The file doesn't contain anything.");
          }
        } catch (e) {
          alert("The file couldn't be loaded or doesn't contain anything.");
        }
      }
    )
  }
}

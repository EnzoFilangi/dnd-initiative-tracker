import { Injectable } from '@angular/core';
import {Entity} from "../../interfaces/entity";

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor() { }

  /**
   * Saves the current setup to localStorage. Erases the previous data.
   */
  save(entities: Entity[]): void {
    localStorage.setItem("save", JSON.stringify(entities));
  }

  /**
   * Loads the setup stored in localStorage. Erases the current setup.
   */
  load(): Entity[] {
    return JSON.parse(localStorage.getItem("save") || "[]");
  }

  /**
   * Exports the current setup to a json file that is then downloaded.
   *
   * From : https://stackoverflow.com/a/30800715
   */
  download(entities: Entity[]): void {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entities));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "InitiativeTrackerExport-" + new Date().toISOString() + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  /**
   * Reads the given json file and replaces the current setup with it.
   *
   * From : https://stackoverflow.com/a/40971885
   */
  upload(callback: Function): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = ".json";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length){
        // getting a hold of the file reference
        const file: File = target.files[0];

        // setting up the reader
        const reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        // Call the callback with the file read
        reader.onload = () => callback(reader)
      }
    }

    input.click();
  }
}

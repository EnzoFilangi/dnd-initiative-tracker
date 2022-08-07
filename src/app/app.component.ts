import { Component } from '@angular/core';
import {Entity} from "./interfaces/entity";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dnd-initiative-tracker';

  entities: Entity[] = [];
}

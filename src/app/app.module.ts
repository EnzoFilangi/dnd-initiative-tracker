import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { MonsterBoxComponent } from './components/monster-box/monster-box.component';
import { PlayerBoxComponent } from './components/player-box/player-box.component';
import { EntityBoxComponent } from './components/entity-box/entity-box.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    MonsterBoxComponent,
    PlayerBoxComponent,
    EntityBoxComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

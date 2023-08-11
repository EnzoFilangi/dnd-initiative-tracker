import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { MonsterBoxComponent } from './components/monster-box/monster-box.component';
import { PlayerBoxComponent } from './components/player-box/player-box.component';
import { EntityBoxComponent } from './components/entity-box/entity-box.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ModalComponent } from './components/modal/modal.component';
import { MonsterFormComponent } from './components/monster-form/monster-form.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';
import { XpTotalComponent } from './components/xp-total/xp-total.component';
import { RoundCounterComponent } from './components/round-counter/round-counter.component';
import { RoundControlsComponent } from './components/round-controls/round-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    MonsterBoxComponent,
    PlayerBoxComponent,
    EntityBoxComponent,
    ModalComponent,
    MonsterFormComponent,
    PlayerFormComponent,
    XpTotalComponent,
    RoundCounterComponent,
    RoundControlsComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

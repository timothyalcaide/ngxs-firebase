import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material';
import { SettingsComponent } from './containers/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

export const COMPONENTS = [SettingsComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [CommonModule, SettingsRoutingModule, MaterialModule],
})
export class SettingsModule {}

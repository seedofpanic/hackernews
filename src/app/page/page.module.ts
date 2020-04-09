import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FrameComponent} from './frame/frame.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [HeaderComponent, FooterComponent, FrameComponent],
  exports: [FrameComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class PageModule {
}

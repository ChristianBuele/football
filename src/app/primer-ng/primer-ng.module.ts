import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { ImageModule } from 'primeng/image';
import { MinutesSecondsPipe } from '../pipes/timer';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import {DividerModule} from 'primeng/divider';
import { GalleriaModule } from "primeng/galleria"

@NgModule({
  declarations: [
    MinutesSecondsPipe
  ],
  exports:[
    ButtonModule,
    InputTextModule,
    TableModule,
    ColorPickerModule,
    MenubarModule,
    DialogModule,
    CheckboxModule,
    ToastModule,
    InputNumberModule,
    CardModule,
    TabMenuModule,
    ImageModule,
    MinutesSecondsPipe,
    TabMenuModule,
    TabViewModule,
    DropdownModule,
    DividerModule,
    GalleriaModule
  ]
})
export class PrimerNgModule { }

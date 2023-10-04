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
@NgModule({
  declarations: [],
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
    ImageModule
  ]
})
export class PrimerNgModule { }

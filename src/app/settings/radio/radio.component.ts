import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent {
  
  async getAudioStream(source: 'mic' | 'desktop') {
  if (source === 'mic') {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  } else {
    // Solo funciona en HTTPS y con permisos del navegador
    return await navigator.mediaDevices.getDisplayMedia({ audio: true });
  }
}
}

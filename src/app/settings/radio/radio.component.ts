import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit, OnDestroy {

  sourceType: 'mic' | 'screen' = 'mic';
  status = '🔄 Conectando al servidor...';
  statusClass: 'pending' | 'active' | 'error' = 'pending';
  isTransmitting = false;

  mics: MediaDeviceInfo[] = [];
  selectedMic: string = ''; // deviceId
  isPaused = false;
  private socket!: WebSocket;
  private audioContext!: AudioContext;
  private processorNode!: ScriptProcessorNode;

  ngOnInit() {
    this.initSocket();
    this.loadAvailableMics();
  }

  ngOnDestroy() {
    if (this.socket) this.socket.close();
    if (this.audioContext) this.audioContext.close();
  }

  private initSocket() {
    this.socket = new WebSocket(environment.RADIO_ENDPOINT);

    this.socket.onopen = () => {
      this.updateStatus('🟢 Conectado. Listo para transmitir.', 'active');
      this.socket.send(JSON.stringify({ type: 'broadcaster' }));
    };

    this.socket.onerror = () => {
      this.updateStatus('❌ Error en la conexión.', 'error');
    };

    this.socket.onclose = () => {
      this.updateStatus('🔌 Conexión cerrada.', 'error');
    };
  }

  private async loadAvailableMics() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.mics = devices.filter(d => d.kind === 'audioinput');
      if (this.mics.length > 0) {
        this.selectedMic = this.mics[0].deviceId;
      } else {
        this.updateStatus('❌ No se detectaron micrófonos.', 'error');
      }
    } catch (err) {
      console.error('Error al listar micrófonos:', err);
      this.updateStatus('❌ No se pudo acceder a los dispositivos.', 'error');
    }
  }
  async requestMicPermission() {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await this.loadAvailableMics(); // volver a cargar después del permiso
      this.updateStatus('🎤 Permiso concedido, micrófonos cargados.', 'active');
    } catch (err) {
      console.error('Permiso denegado o no hay micrófono:', err);
      this.updateStatus('❌ No se puede acceder al micrófono.', 'error');
    }
  }

  async startTransmission() {
    this.isTransmitting = true;
    this.updateStatus('⏳ Iniciando transmisión...', 'pending');

    try {
      let stream: MediaStream;

      if (this.sourceType === 'mic') {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: this.selectedMic ? { exact: this.selectedMic } : undefined
          }
        });
      } else {
        stream = await (navigator.mediaDevices as any).getDisplayMedia({ audio: true });
      }

      this.audioContext = new AudioContext();
      const source = this.audioContext.createMediaStreamSource(stream);
      this.processorNode = this.audioContext.createScriptProcessor(2048, 1, 1);

      source.connect(this.processorNode);
      this.processorNode.connect(this.audioContext.destination);

      this.processorNode.onaudioprocess = (e) => {
        if (this.isPaused) return;

        const input = e.inputBuffer.getChannelData(0);
        const buffer = new Float32Array(input);
        this.socket.send(JSON.stringify({
          type: 'audio',
          audio: Array.from(buffer)
        }));
      };

      this.updateStatus('📡 Transmitiendo audio en vivo...', 'active');
    } catch (error: any) {
      if (error.name === 'NotFoundError') {
        this.updateStatus('❌ No se encontró un micrófono disponible.', 'error');
      } else if (error.name === 'NotAllowedError') {
        this.updateStatus('❌ Permiso denegado para acceder al micrófono.', 'error');
      } else {
        this.updateStatus('❌ Error inesperado: ' + error.message, 'error');
      }
      this.isTransmitting = false;
    }
  }

  private updateStatus(message: string, cssClass: 'pending' | 'active' | 'error') {
    this.status = message;
    this.statusClass = cssClass;
  }

  pauseTransmission() {
  this.isPaused = true;
  this.updateStatus('⏸️ Transmisión en pausa.', 'pending');
}

resumeTransmission() {
  this.isPaused = false;
  this.updateStatus('📡 Transmitiendo audio en vivo...', 'active');
}
}

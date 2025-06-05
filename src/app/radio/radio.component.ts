import { Component, OnDestroy } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnDestroy{
 status = '🔄 Esperando conexión...';
  statusClass: 'pending' | 'active' | 'error' = 'pending';
  isListening = false;

  private socket!: WebSocket;
  private audioContext!: AudioContext;
  private bufferQueue: Float32Array[] = [];
  private scriptNode!: ScriptProcessorNode;
  private sourceNode!: AudioBufferSourceNode;

  private readonly bufferSize = 2048;

  startListening() {
    this.cleanup(); // cerrar cualquier conexión previa

    this.updateStatus('🔌 Conectando al servidor...', 'pending');
    this.socket = new WebSocket(environment.RADIO_ENDPOINT);

    this.socket.onopen = () => {
      this.updateStatus('🟢 Conectado. Esperando audio...', 'active');
      this.socket.send(JSON.stringify({ type: 'listener' }));
      this.isListening = true;
      this.initAudioPlayback();
    };

    this.socket.onerror = () => {
      this.updateStatus('❌ Error en la conexión.', 'error');
      this.isListening = false;
    };

    this.socket.onclose = () => {
      this.updateStatus('🔌 Conexión cerrada.', 'error');
      this.isListening = false;
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'audio' && data.audio) {
        const audioData = new Float32Array(data.audio);
        this.bufferQueue.push(audioData);
      }
    };
  }

  private initAudioPlayback() {
    this.audioContext = new AudioContext();
    this.scriptNode = this.audioContext.createScriptProcessor(this.bufferSize, 1, 1);

    this.scriptNode.onaudioprocess = (event) => {
      const output = event.outputBuffer.getChannelData(0);

      if (this.bufferQueue.length > 0) {
        const nextBuffer = this.bufferQueue.shift()!;
        output.set(nextBuffer);
      } else {
        output.fill(0); // silencio si no hay audio
      }
    };

    this.scriptNode.connect(this.audioContext.destination);
  }

  reload() {
    this.startListening();
  }

  private updateStatus(msg: string, status: 'pending' | 'active' | 'error') {
    this.status = msg;
    this.statusClass = status;
  }

  private cleanup() {
    if (this.socket) this.socket.close();
    if (this.audioContext) this.audioContext.close();
    if (this.scriptNode) this.scriptNode.disconnect();
    this.bufferQueue = [];
  }

  ngOnDestroy() {
    this.cleanup();
  }
}

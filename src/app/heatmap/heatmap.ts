import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heatmap.html',
  styleUrls: ['./heatmap.css'],
})
export class Heatmap implements OnInit, OnDestroy {
  isBrowser = false;
  private map: any;
  private L: any;
  private fullData: any[] = [];
  private heatLayer: any;
  private activeIntensities = new Set([0.1, 0.5, 0.9]); // checked by default

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.heatLayer = null;
    }
  }

  async ngOnInit() {
    if (!this.isBrowser) return;
    const L = await import('leaflet');
    (window as any).L = L;
    await import('leaflet.heat');
    this.L = L;
     const reloaded = localStorage.getItem('pageReloaded');
    if (!reloaded) {
      localStorage.setItem('pageReloaded', 'true');
      window.location.reload();
    } else {
      // Clear flag so future navigations can reload again if needed
      localStorage.removeItem('pageReloaded');
    }
    this.initMap();
    
  }

  private initMap() {
    if (!this.L) return;
    const L = this.L;

    this.map = L.map('ocean-heatmap', {
      center: [10, -30],
      zoom: 2,
      worldCopyJump: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 6,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // 🌡️ All heat data
    this.fullData = [
      [5, -40, 0.1],
      [10, -30, 0.5],
      [15, -50, 0.5],
      [-5, -25, 0.9],
      [-15, -10, 0.1],
      [0, -20, 0.5],
      [-20, 60, 0.9],
      [15, 65, 0.5],
      [10, 90, 0.9],
      [10, 91, 0.9],
      [20.28946,-146.89236,0.9],
      [21.28946,-145.89236,0.9],
      [22.28946,-144.89236,0.9],
      [23.28946,-143.89236,0.9],
      [24.28946,-142.89236,0.9],
      [25.28946,-141.89236,0.9],
      [26.28946,-140.89236,0.9],
    ];

    this.updateHeatmap();
  }

  toggleIntensity(value: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.activeIntensities.add(value);
    } else {
      this.activeIntensities.delete(value);
    }
    this.updateHeatmap();
  }

  private updateHeatmap() {
    if (!this.map) return;
    if (this.heatLayer) {
      this.map.removeLayer(this.heatLayer);
    }

    const filteredData = this.fullData.filter((d) =>
      this.activeIntensities.has(d[2])
    );
    if (!filteredData.length) {
      this.heatLayer = null;
      return;
    }

    this.heatLayer = (this.L as any).heatLayer(filteredData, {
      radius: 30,
      blur: 20,
      minOpacity: 0.4,
      gradient: {
        0.1: 'blue',
        0.5: 'yellow',
        0.9: 'red',
      },
    }).addTo(this.map);
    this.map.invalidateSize();
  }
}

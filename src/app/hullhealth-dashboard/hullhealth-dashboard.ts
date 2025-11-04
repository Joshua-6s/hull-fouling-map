import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-hullhealth-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hullhealth-dashboard.html',
  styleUrls: ['./hullhealth-dashboard.css'],
})
export class HullhealthDashboard implements OnInit {
  isBrowser = false;
  private map: any;
  private layers: { [key: string]: any } = {};
  
  legendItems = [
    { color: 'red', label: 'Tropical Zone', visible: false },
    { color: 'yellow', label: 'Temperate Zone', visible: false },
    { color: '#0077be', label: 'Cold Zone', visible: false },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  toggleLayer(color: string): void {
    const legendItem = this.legendItems.find(item => item.color === color);
    const layers = this.layers[color];
    if (legendItem && layers) {
      legendItem.visible = !legendItem.visible;
      if (Array.isArray(layers)) {
        for (const layer of layers) {
          if (legendItem.visible) {
            this.map.addLayer(layer);
          } else {
            this.map.removeLayer(layer);
          }
        }
      } else {
        if (legendItem.visible) {
          this.map.addLayer(layers);
        } else {
          this.map.removeLayer(layers);
        }
      }
    }
  }

  async ngOnInit() {
    if (!this.isBrowser) return;

    const L = await import('leaflet');

    this.map = L.map('map', {
      center: [51.505, -0.09],
      zoom: 2,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(this.map);

    const redCircle = L.circle([10.95, -132], {
      radius: 1900000,
      color: 'red',
      fillOpacity: 0.5,
    }).bindTooltip('High barnacle and algae risk ', { permanent: false, direction: 'top' });
    this.layers['red'] = redCircle;
// const marker = L.marker([51.5, -0.09])
//   .addTo(this.map)
//   .bindPopup('Hello! This is a marker.')
//   .openPopup();

    const bluePolygon = L.polygon(
      [
        [-17.432212930379, -19.573622983433],
        [-9.9163850451087, -29.201388449854],
        [-14.617090404253, -31.530490012354],
        [-17.432212930379, -19.573622983433],
      ],
      {
        color: '#0077be',
        weight: 2,
        fillOpacity: 0.5,
      }
    ).bindTooltip('Low biological growth risk ', { permanent: false, direction: 'top' });

    const sPolygon = L.polygon(
      [
        [-10.467893043517, 58.574754752097],
        [-0.33130404171702, 56.992723502097],
        [1.4263592595301, 67.539598502097],
        [-2.0886556359312, 90.039598502097],
        [-6.6444874212267, 87.227098502097],
        [-16.448268095057, 80.371629752097],
        [-8.0391725794977, 74.219286002097],
        [-8.5609908310572, 64.902879752097],
        [-14.244750150627, 61.035692252097],
        [-10.467893043517, 58.574754752097],
      ],
      {
        color: '#0077be',
        weight: 2,
        fillOpacity: 0.5,
      }
    ).bindTooltip('Low biological growth risk ', { permanent: false, direction: 'top' });

    this.layers['#0077be'] = [bluePolygon, sPolygon];

    const yellowPolygon = L.polygon(
      [
        [32.878113313833, -59.018639427904],
        [48.0181503074, -46.362389427904],
        [54.596511156771, -50.581139427904],
        [51.425520231374, -28.432701927904],
        [45.858189916102, -17.182701927904],
        [32.285649000974, -22.104576927904],
        [21.655797106914, -31.948326927904],
        [13.281010933721, -40.737389427904],
        [26.15386269464, -55.503014427904],
        [32.878113313833, -59.018639427904],
      ],
      {
        color: 'yellow',
        weight: 2,
        fillOpacity: 0.5,
      }
    ).bindTooltip('Moderate fouling potential', { permanent: false, direction: 'top' });;
    this.layers['yellow'] = yellowPolygon;

    this.map.invalidateSize();
  }
}

import { Component } from '@angular/core';
import { Heatmap } from "../heatmap/heatmap";
import {CommonModule} from "@angular/common";
import { HullhealthDashboard } from '../hullhealth-dashboard/hullhealth-dashboard';
@Component({
  selector: 'app-hull-home',
  standalone:true,
  imports: [Heatmap,CommonModule,HullhealthDashboard],
  templateUrl: './hull-home.html',
  styleUrl: './hull-home.css',
})
export class HullHome {
  isHeatMap:boolean=true;
  toggleHeatMap(){
    this.isHeatMap=!this.isHeatMap;
  }
}

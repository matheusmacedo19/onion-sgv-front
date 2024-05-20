import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { response } from 'express';
import { RouterOutlet } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DashboardOrder } from '../../../models/dashboardOrder';
import { DashboardService } from '../../../services/dashboard.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,MatTableModule,MatFormFieldModule,MatPaginator,MatInputModule,CommonModule,ChartModule,MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements AfterViewInit {
  dashboardOrders: DashboardOrder[] = [];
  displayedColumns: string[] = ['cliente', 'produto', 'valor', 'dataEntrega'];
  dataSource = new MatTableDataSource<DashboardOrder>(this.dashboardOrders);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  salesByRegionData: any;
  salesByProductData: any;

  constructor(private service : DashboardService){}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.findAll();
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll(): void{
    this.service.findAll().subscribe((response) => {
      this.dashboardOrders = response;
      this.dataSource.data = this.dashboardOrders;
      this.generateChartData();
    })
  }
  generateChartData(): void {
    this.salesByRegionData = this.generateSalesByRegionData();
    this.salesByProductData = this.generateSalesByProductData();
  }

  generateSalesByRegionData(): any {
    const salesByRegion: any = {};

    this.dashboardOrders.forEach(order => {
      const region = order.region;
      if (!salesByRegion[region]) {
        salesByRegion[region] = 0;
      }
      salesByRegion[region] += order.productPrice;
    });

    const labels = Object.keys(salesByRegion);
    const data = Object.values(salesByRegion);
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
  }

  generateSalesByProductData(): any {
    const salesByProduct: any = {};

    // Agrupar vendas por produto
    this.dashboardOrders.forEach(order => {
      const product = order.productName;
      if (!salesByProduct[product]) {
        salesByProduct[product] = 0;
      }
      salesByProduct[product]++;
    });

    // Preparar dados para o gráfico de pizza
    const labels = Object.keys(salesByProduct);
    const data = Object.values(salesByProduct);
    return {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    };
  }
}

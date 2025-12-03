import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  message = '';

  constructor(private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.resourceService.admin().subscribe(
      data => {
        this.message = data.message;
      },
      err => {
        console.error(err);
      }
    );
  }
}

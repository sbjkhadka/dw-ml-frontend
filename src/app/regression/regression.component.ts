import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.css']
})
export class RegressionComponent implements OnInit {
  regressionForm = new FormGroup({});
  constructor() { }

  ngOnInit(): void {
  }

}

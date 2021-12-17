import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ApiServiceService} from '../services/api-service.service';

@Component({
  selector: 'app-regression',
  templateUrl: './regression.component.html',
  styleUrls: ['./regression.component.css']
})
export class RegressionComponent implements OnInit {
  regressionForm = new FormGroup({});
  result;

  daysOfWeek = [
    { label: 'Monday', value: '1' },
    { label: 'Tuesday', value: '5' },
    { label: 'Wednesday', value: '6' },
    { label: 'Thursday', value: '4' },
    { label: 'Friday', value: '0' },
    { label: 'Saturday', value: '2' },
    { label: 'Sunday', value: '3' },
  ];

  neighborhoodName = [
    { label: 'Lambton Baby Point', value: '7' },
    { label: 'Little Portugal', value: '8' },
  ];

  locationType = [
    { label: 'Apartment (Rooming House, Condo)', value: '9' },
    { label: 'Police / Courts (Parole Board, Probation Office)', value: '10' },
  ];

  premiseType = [
    { label: 'Apartment', value: '11' },
    { label: 'Commercial', value: '12' },
    { label: 'Educational', value: '13' },
    { label: 'House', value: '14' },
    { label: 'Other', value: '15' },
    { label: 'Outside', value: '16' },
    { label: 'Transit', value: '17' },
  ];

  bikeSpeedRange = [
    { label: '1 - 5 Km/h', value: '20' },
    { label: '6 - 10 Km/h', value: '25' },
    { label: '11 - 15 Km/h', value: '18' },
    { label: '16 - 20 Km/h', value: '19' },
    { label: '21 - 25 Km/h', value: '21' },
    { label: '26 - 30 Km/h', value: '22' },
    { label: '31 - 35 Km/h', value: '23' },
    { label: '36 - 40 Km/h', value: '24' },
  ];

  bikeCost = [
    { label: '$0 - $500', value: '26' },
    { label: '$501 - $1000', value: '29' },
    { label: '$1001 - $1500', value: '27' },
    { label: '$1501 - $2000', value: '28' },
  ];

  payload = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  constructor(private formBuilder: FormBuilder,
              private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.regressionForm = this.formBuilder.group({
      daysOfWeek: new FormControl(''),
      neighborhoodName: new FormControl(''),
      locationType: new FormControl(''),
      premiseType: new FormControl(''),
      bikeSpeedRange: new FormControl(''),
      bikeCost: new FormControl('')
    });
  }

  resetForm(): void {
    this.regressionForm = new FormGroup({
      daysOfWeek: new FormControl(''),
      neighborhoodName: new FormControl(''),
      locationType: new FormControl(''),
      premiseType: new FormControl(''),
      bikeSpeedRange: new FormControl(''),
      bikeCost: new FormControl('')
    });
    this.result = undefined;
  }

  predict(): void {
    this.initializePayload();
    const positions =  [
      Number(this.regressionForm.value.daysOfWeek),
      Number(this.regressionForm.value.neighborhoodName),
      Number(this.regressionForm.value.locationType),
      Number(this.regressionForm.value.premiseType),
      Number(this.regressionForm.value.bikeSpeedRange),
      Number(this.regressionForm.value.bikeCost)
    ];

    for (const position of positions) {
      this.payload[position] = 1;
    }

    const payload = {
      payload: this.payload
    };

    this.apiService.predictFromRegressionAlgorithm(payload).subscribe(response => {
      console.log(response);
      this.result = response;
    });
    console.log('payload', payload);
  }

  initializePayload(): void {
    this.payload = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

}

// Tuesday, Lambton, Rooming house, Apartment, 21_25, 501_100/0_500


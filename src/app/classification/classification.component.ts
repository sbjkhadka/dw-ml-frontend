import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../services/api-service.service';
import {Form, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ClassificationModel} from './model/classification.model';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {

  result;
  classificationForm: FormGroup;
  bikeTypes = [
    { label: 'OT', value: '4' },
    { label: 'TO', value: '10' },
    { label: 'MT', value: '3' },
    { label: 'RG', value: '7' },
    { label: 'RC', value: '5' },
    { label: 'BM', value: '0' },
    { label: 'EL', value: '1' },
    { label: 'SC', value: '8' },
    { label: 'RE', value: '6' },
    { label: 'FO', value: '2' },
    { label: 'TR', value: '11' },
    { label: 'TA', value: '9' },
    { label: 'UN', value: '12' }
  ];

  bikeSpeeds = [
    { label: '6_10', value: '8' },
    { label: '1_5', value: '2' },
    { label: '21_25', value: '3' },
    { label: '16_20', value: '1' },
    { label: '26_30', value: '4' },
    { label: '11_15', value: '0' },
    { label: '31_35', value: '5' },
    { label: '36_40', value: '6' },
    { label: '41_45', value: '7' },
  ];

  bikeCosts = [
    { label: '501_1000', value: '3' },
    { label: '1001_1500', value: '1' },
    { label: '0_500', value: '0' },
    { label: '1501_2000', value: '2' }
  ];
  constructor(private apiService: ApiServiceService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const pl = {payload: [1, 13, 3, 3, 0, 2]};
    // this.apiService.predictFromClassificationAlgorithm(pl).subscribe(res => {
    //   console.log(res);
    //   this.result = res;
    // });
    this.initializeForm();
  }

  initializeForm(): void {
    this.classificationForm = this.formBuilder.group({
      Occurrence_DayOfWeek_n: new FormControl(''),
      Occurrence_Hour_n: new FormControl(''),
      Bike_Type_n: new FormControl(''),
      Bike_Speed_Range_n: new FormControl(''),
      Bike_Cost_Range_n: new FormControl(''),
      Premises_Type_n: new FormControl(1)
    });
  }

  // 6, 17, 10, 2, 1, 3
  // Wed, 17, TO, 1_5, 1001_1500, House
  predict(): void {
    const pl = {
      payload: [
        Number(this.classificationForm.value.Occurrence_DayOfWeek_n),
        Number(this.classificationForm.value.Occurrence_Hour_n),
        Number(this.classificationForm.value.Bike_Type_n),
        Number(this.classificationForm.value.Bike_Speed_Range_n),
        Number(this.classificationForm.value.Bike_Cost_Range_n),
        Number(this.classificationForm.value.Premises_Type_n)
      ]
    };

    this.apiService.predictFromClassificationAlgorithm(pl).subscribe(response => {
      this.result = response;
    });

    console.log('payload', pl);

  }

  resetForm(): void {
    this.classificationForm = new FormGroup({
      Occurrence_DayOfWeek_n: new FormControl(),
      Occurrence_Hour_n: new FormControl(),
      Bike_Type_n: new FormControl(),
      Bike_Speed_Range_n: new FormControl(),
      Bike_Cost_Range_n: new FormControl(),
      Premises_Type_n: new FormControl()
    });
    this.result = undefined;
  }

}

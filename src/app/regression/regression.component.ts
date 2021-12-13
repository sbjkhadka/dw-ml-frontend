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
    { label: 'Occurrence_DayOfWeek_Friday', value: '0' },
    { label: 'Occurrence_DayOfWeek_Monday', value: '1' },
    { label: 'Occurrence_DayOfWeek_Saturday', value: '2' },
    { label: 'Occurrence_DayOfWeek_Sunday', value: '3' },
    { label: 'Occurrence_DayOfWeek_Thursday', value: '4' },
    { label: 'Occurrence_DayOfWeek_Tuesday', value: '5' }
  ];

  neighborhoodName = [
    { label: 'NeighbourhoodName_Beechborough-Greenbrook (112)', value: '6' },
    { label: 'NeighbourhoodName_Clanton Park (33)', value: '7' },
    { label: 'NeighbourhoodName_Edenbridge-Humber Valley (9)', value: '8' },
    { label: 'NeighbourhoodName_LAmoreaux (117)', value: '9' },
    { label: 'NeighbourhoodName_Mimico (includes Humber Bay Shores) (17)', value: '10' },
    { label: 'NeighbourhoodName_North St.James Town (74)', value: '11' },
    { label: 'NeighbourhoodName_Steeles (116)', value: '12' },
    { label: 'NeighbourhoodName_Stonegate-Queensway (16)', value: '13' },
    { label: 'NeighbourhoodName_West Humber-Clairville (1)', value: '14' },
    { label: 'NeighbourhoodName_Yonge-St.Clair (97)', value: '15' }
  ];

  locationType = [
    { label: 'Location_Type_BLK', value: '16' },
    { label: 'Location_Type_Go Train', value: '17' },
    { label: 'Location_Type_Group Homes (Non-Profit, Halfway House, Social Agency)', value: '18' },
    { label: 'Location_Type_Other Train Admin Or Support Facility', value: '19' },
    { label: 'Location_Type_Parking Lots (Apt., Commercial Or Non-Commercial)', value: '20' },
    { label: 'Location_Type_Schools During Un-Supervised Activity', value: '21' },
    { label: 'Location_Type_Single Home, House (Attach Garage, Cottage, Mobile)', value: '22' }
  ];

  bikeType = [
    { label: 'Bike_Type_FO', value: '23' },
    { label: 'Bike_Type_UN', value: '24' }
  ];

  bikeSpeedRange = [
    { label: 'Bike_Speed_Range_6_10', value: '25' }
  ];

  bikeCost = [
    { label: 'Bike_Cost_Range_0_500', value: '26' },
    { label: 'Bike_Cost_Range_1001_1500', value: '27' },
    { label: 'Bike_Cost_Range_1501_2000', value: '28' }
  ];

  payload = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
      bikeType: new FormControl(''),
      bikeSpeedRange: new FormControl(''),
      bikeCost: new FormControl('')
    });
  }

  resetForm(): void {
    this.regressionForm = new FormGroup({
      daysOfWeek: new FormControl(''),
      neighborhoodName: new FormControl(''),
      locationType: new FormControl(''),
      bikeType: new FormControl(''),
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
      Number(this.regressionForm.value.bikeType),
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
    this.payload = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

}


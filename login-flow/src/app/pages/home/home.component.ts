import { Component, OnInit } from '@angular/core';
import * as countryList from 'country-list';
import { countries } from 'src/app/core/countries/country-data'; 
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countryList = countries;      // first method: keep all country code and country name in a typescript file to load data in to a dropdown
  
  
  countries:Country[];            //second method:  country dropdown using package
  selectedCountry: string = '';

  constructor() {
    this.countries = countryList.getData().map((country) => ({
      label: `${country.name} (${country.code})`,
      value: country.code,
    }));
   }

  ngOnInit() {
  }

    

}


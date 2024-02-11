import { Component, OnInit } from '@angular/core';
import * as countryList from 'country-list';
import { countries } from 'src/app/core/countries/country-data'; 
import { Country } from 'src/app/models/country.model';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/core/location/geolocation.service';

@Component({
  selector: 'app-land',
  templateUrl: './land.component.html',
  styleUrls: ['./land.component.scss']
})
export class LandComponent implements OnInit {

  countryList = countries; 
  userCountry: string = '';
  userCountrycode: string = '';
  userCountryzone: string = '';
  userCurrency: string = '';
  countries:Country[];            //second method:  country dropdown using package
  selectedCountry: string = '';
  currentDateTime: string = '';
  
  constructor(private router: Router, private geolocationService:GeolocationService) {
    this.countries = countryList.getData().map((country) => ({
      label: `${country.name}`,
      value: country.code,
    }));
   }

  ngOnInit(): void {
    this.geolocationService.getLocation().subscribe((data: any) => {
      console.log(data);
      this.userCountry = data.country_name;
      this.userCountrycode = data.country;
      this.userCountryzone = data.timezone;
      this.userCurrency = data.currency;

      // Get current date and time in user's time zone
      const userTimeZone = data.timezone;
      const currentDateTime = new Date().toLocaleString('en-US', { timeZone: userTimeZone });
      this.currentDateTime = currentDateTime;
      console.log(currentDateTime);
      
    });

    // Get user's time zone without external Api
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log('User Time Zone without external Api:', userTimeZone);
  }

  navigateToCardPage() {
    // Use the router to navigate to the card page
    this.router.navigate(['/card']);
  }
}

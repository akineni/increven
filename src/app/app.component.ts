import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators'
import { PreLoaderService } from './_services/pre-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router, public preLoader: PreLoaderService) { 
    router.events.pipe(
      filter(value => {
        if (value instanceof NavigationStart || value instanceof NavigationEnd || 
          value instanceof NavigationCancel || value instanceof NavigationError)
            return true
          else
            return false
      })).subscribe(event => {
        if (event instanceof NavigationStart)
          this.preLoader.loading = true
        else
          this.preLoader.loading = false
      })
  }
  
}

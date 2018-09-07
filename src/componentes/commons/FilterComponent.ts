import { Component } from '@angular/core';
import { Platform, ViewController, NavParams  } from 'ionic-angular';

@Component({
    selector: 'my-filter',
    templateUrl: 'FilterComponent.html'
})
export class FilterComponent {

    public selectedFilter: string = '';
    public displayData: any = [];

    constructor(
        public platform: Platform, 
        params: NavParams,
        public viewController: ViewController) {
        
        this.displayData = params.get('datahome');
    }

    filtered() {
        this.viewController.dismiss({
            filter: this.selectedFilter
        })
    }


    open(event, item) {
        event.stopPropagation();
        this.viewController.dismiss({item:item});
    }

}

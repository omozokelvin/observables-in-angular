import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, filter, throttleTime } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  // componentDestroyed$: Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000)
    //   .subscribe(count => console.log(count));

    // interval(1000)
    //   .pipe(takeUntil(this.componentDestroyed$))
    //   .subscribe(count => console.log(count));


    //an error cancels the observable, it doesn't complete it
    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if(count === 5) {
          observer.complete();
        }
        if(count > 3) {
          observer.error(new Error('Count is greater than 3'));
        }
        count++;
      }, 1000)
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => data > 0),
        map((data: number) => `Round ${data + 1}`)
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log('completed');
        }
      )
  }

  ngOnDestroy(): void {
    // this.componentDestroyed$.next(true)
    // this.componentDestroyed$.complete()

    this.firstObsSubscription.unsubscribe();
  }

}

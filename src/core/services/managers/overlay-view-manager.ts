import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {SebmGoogleMapOverlayView} from '../../directives/google-map-overlay-view';

import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {OverlayView} from '../google-maps-types';


@Injectable()
export class OverlayViewManager {
  private _overlayViews: Map<SebmGoogleMapOverlayView, Promise<OverlayView>> =
      new Map<SebmGoogleMapOverlayView, Promise<OverlayView>>();

  constructor(private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone) {}

  deleteOverlayView(overlayView: SebmGoogleMapOverlayView): Promise<void> {
    const m = this._overlayViews.get(overlayView);
    if (m == null) {
      // overlayView already deleted
      return Promise.resolve();
    }
    return m.then((m: OverlayView) => {
      return this._zone.run(() => {
        m.setMap(null);
        this._overlayViews.delete(overlayView);
        overlayView = null;
      });
    });
  }

  addOverlayView(overlayView: SebmGoogleMapOverlayView) {
    const overlayViewPromise = this._mapsWrapper.createOverlayView({
        position: {lat: overlayView.latitude, lng: overlayView.longitude},
        objectId: overlayView.objectId,
        objectContent: overlayView.objectContent,
        class: overlayView.class,
        type: overlayView.type,
        textColor: overlayView.textColor,
        color: overlayView.color,
        count: overlayView.count
    });

    this._overlayViews.set(overlayView, overlayViewPromise);
  }

  getNativeoverlayView(overlayView: SebmGoogleMapOverlayView): Promise<OverlayView> {
    return this._overlayViews.get(overlayView);
  }

  createEventObservable<T>(eventName: string, overlayView: SebmGoogleMapOverlayView): Observable<T> {
    return Observable.create((observer: Observer<T>) => {
      this._overlayViews.get(overlayView).then((m: OverlayView) => {
        m.addListener(eventName, (e: T) => this._zone.run(() => observer.next(e)));
      });
    });
  }
}

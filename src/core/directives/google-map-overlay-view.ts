import {Directive, SimpleChange, OnDestroy, ElementRef, OnChanges, EventEmitter, ContentChild, AfterContentInit} from '@angular/core';

import * as mapTypes from '../services/google-maps-types';
import {OverlayViewManager} from '../services/managers/overlay-view-manager';
import {SebmGoogleMapInfoWindow} from './google-map-info-window';
import {GoogleMapsAPIWrapper} from '../services/google-maps-api-wrapper';
import {SebmGoogleMapInfoBox} from './google-map-info-box';

let markerId = 1;

/**
 * SebmGoogleMapMarker renders a map marker inside a {@link SebmGoogleMap}.
 *
 * ### Example
 * ```typescript
 * import {Component} from 'angular2/core';
 * import {SebmGoogleMap, SebmGoogleMapMarker} from 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-overlay-view [latitude]="lat" [longitude]="lng">
 *      </sebm-google-map-overlay-view>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 */
@Directive({
  selector: 'sebm-google-map-overlay-view',
  inputs: ['latitude', 'longitude', 'objectId', 'objectContent', 'class', 'type', 'textColor','color', 'label', 'count'],
  outputs: ['markerClick', 'dragEnd']
})
export class SebmGoogleMapOverlayView implements OnDestroy,
    OnChanges, AfterContentInit {
  /**
   * The latitude position of the marker.
   */
  latitude: number;

  /**
   * The longitude position of the marker.
   */
  longitude: number;

  /**
   * The id of the marker object.
   */
  objectId: number;

  /**
   * The content of the marker object.
   */
  objectContent: string;

  /**
   * An additional class name
   *
   * @type {string}
   */
  class: string;

  /**
   * The type of an clusterMarker is passed
   */
  type: string;

  /**
   * The color of text in an clusterMarker is passed
   */
  textColor: string;

  /**
   * The color of an clusterMarker is passed
   */
  color: string;

   /**
   * The label of an clusterMarker is passed
   */
  label: string;

   /**
   * The count of available clusterMarkers is passed
   */
  count: number;

  /**
   * This event emitter gets emitted when the user clicks on the marker.
   */
  markerClick: EventEmitter<void> = new EventEmitter<void>();

  @ContentChild(SebmGoogleMapInfoWindow) private _infoWindow: SebmGoogleMapInfoWindow;
  @ContentChild(SebmGoogleMapInfoBox) private _infoBox: SebmGoogleMapInfoBox;

  private _overviewAddedToManager: boolean = false;
  private _id: string;

  constructor(private _overlayViewManager: OverlayViewManager, private _elem: ElementRef, private _mapsWrapper: GoogleMapsAPIWrapper) {
      this._id = (markerId++).toString();
    }

  /* @internal */
  ngAfterContentInit() {
    if (this._infoWindow != null) {
        this._infoWindow.hostOverlayView = this;
    }
    if (this._infoBox != null) {
        this._infoBox.hostOverlayView = this;
    }
  }

  /** @internal */
  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    if (typeof this.latitude !== 'number' || typeof this.longitude !== 'number') {
      return;
    }

    if (!this._overviewAddedToManager) {
        this._overlayViewManager.addOverlayView(this);
        this._overviewAddedToManager = true;
        this._addEventListeners();
        return;
    }
  }

  private _addEventListeners() {
    this._overlayViewManager.createEventObservable('click', this).subscribe(() => {
      if (this._infoWindow != null) {
          this._infoWindow.open();
      }else if (this._infoBox != null) {
          this._infoBox.open();
      }
      this.markerClick.next(null);
    });
  }

  /** @internal */
  id(): string { return this._id; }

  /** @internal */
  toString(): string { return 'SebmGoogleMapOverlayView-' + this._id.toString(); }

  /** @internal */
  ngOnDestroy() {
      this._overlayViewManager.deleteOverlayView(this);
    }
}

import {Component, SimpleChange, OnDestroy, OnChanges, ElementRef} from '@angular/core';
import {InfoBoxManager} from '../services/managers/info-box-manager';
import {SebmGoogleMapMarker} from './google-map-marker';
import {SebmGoogleMapOverlayView} from './google-map-overlay-view'
import * as mapTypes from '../services/google-maps-types';

let infoBoxId = 0;

/**
 * SebmGoogleMapInfoBox renders a info window inside a {@link SebmGoogleMapMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import {Component} from '@angular/core';
 * import {SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow} from
 * 'angular2-google-maps/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  directives: [SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
 *  styles: [`
 *    .sebm-google-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <sebm-google-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <sebm-google-map-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <sebm-google-map-info-box [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </sebm-google-map-info-box>
 *      </sebm-google-map-marker>
 *    </sebm-google-map>
 *  `
 * })
 * ```
 * InfoBox
 * Documentation: http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html
 * Example: http://jsfiddle.net/jehj3/597/
 */


@Component({
    selector: 'sebm-google-map-info-box',
    inputs: [
        'latitude',
        'longitude',
        'alignBottom',
        'boxClass',
        'boxStyle',
        'closeBoxMargin',
        'closeBoxURL',
        'disableAutoPan',
        'enableEventPropagation',
        'infoBoxClearance',
        'isHidden',
        'maxWidth',
        'pane',
        'pixelOffset',
        'position',
        'visible',
    ],
    template:
    `
        <div class='sebm-google-map-info-box-content'>
            <ng-content></ng-content>
        </div>
    `
})
export class SebmGoogleMapInfoBox implements OnDestroy, OnChanges {

    /**
     * Align the bottom left corner of the InfoBox to the position location
     * (default is false which means that the top left corner of the InfoBox is aligned).
     */
    alignBottom: boolean = false;

    /**
      * The name of the CSS class defining the styles for the InfoBox container.
      * The default value is "infoBox".
      */
    boxClass: string = "marker-tooltip";

    /**
     * An object literal whose properties define specific CSS style values to be applied to the InfoBox.
     * Style values defined here override those that may be defined in the boxClass style sheet.
     * If this property is changed after the InfoBox has been created, all previously set styles (except those defined in the style sheet)
     * are removed from the InfoBox before the new style values are applied.
     */
    boxStyle: mapTypes.BoxStyle = { background:'', opacity: 1, width: "" };

    /**
     * The CSS margin style value for the close box. The default is "2px" (a 2-pixel margin on all sides).
     */
    closeBoxMargin: string = "10px 2px 2px 2px";

    /**
     * The URL of the image representing the close box.
     * Note: The default is the URL for Google's standard close box.
     * Set this property to "" if no close box is required.
     */
    closeBoxURL: string = "http://www.google.com/intl/en_us/mapfiles/close.gif";

    /**
     * Holds the native element that is used for the info window content.
     */
    content: string | Node;

    /**
     * Disable auto-pan on open. By default, the info window will pan the map so that it is fully
     * visible when it opens.
     */
    disableAutoPan: boolean = false;

    /**
     * Propagate mousedown, mousemove, mouseover, mouseout, mouseup, click, dblclick, touchstart, touchend, touchmove, and contextmenu events in the
     * InfoBox (default is false to mimic the behavior of a google.maps.InfoWindow).
     * Set this property to true if the InfoBox is being used as a map label.
     */
    enableEventPropagation: boolean = false;

    /**
     * Minimum offset (in pixels) from the InfoBox to the map edge after an auto-pan.
     */
    infoBoxClearance: mapTypes.SizeLiteral = { width: 1, height: 1 };

    /**
     * Hide the InfoBox on open. [Deprecated in favor of the visible property.] The default value is false.
     */
    isHidden: boolean = false;

    /**
     * Maximum width of the infowindow, regardless of content's width. This value is only considered
     * if it is set before a call to open. To change the maximum width when changing content, call
     * close, update maxWidth, and then open.
     */
    maxWidth: number = 0;

    /**
     * The pane where the InfoBox is to appear (default is "floatPane").
     * Set the pane to "mapPane" if the InfoBox is being used as a map label.
     * Valid pane names are the property names for the google.maps.MapPanes object.
     * More at: https://developers.google.com/maps/documentation/javascript/reference#MapPanes
     */
    pane: string = "floatPane";

    /*
     * The offset (in pixels) from the top left corner of the InfoBox (or the bottom left corner if the alignBottom property is true) to the map pixel corresponding to position.
     */
    pixelOffset: mapTypes.SizeLiteral = { width: -118, height: -20 };

    /*
     *
     */
    visible: boolean = true;

    /**
    * All InfoWindows are displayed on the map in order of their zIndex, with higher values
    * displaying in front of InfoWindows with lower values. By default, InfoWindows are displayed
    * according to their latitude, with InfoWindows of lower latitudes appearing in front of
    * InfoWindows at higher latitudes. InfoWindows are always displayed in front of markers.
    */
    zIndex: number;

    /**
     * The latitude geographic location at which to display the InfoBox.
     * The latitude position of the info window (only usefull if you use it ouside of a {@link
     * SebmGoogleMapMarker}).
     */
    latitude: number;

    /**
     * The longitude geographic location at which to display the InfoBox.
     * The longitude position of the info window (only usefull if you use it ouside of a {@link
     * SebmGoogleMapMarker}).
     */
    longitude: number;

    /**
     * Holds the marker that is the host of the info window (if available)
     */
    hostMarker: SebmGoogleMapMarker;

    /**
     * Holds the marker that is the host of the info window (if available)
     */
    hostOverlayView: SebmGoogleMapOverlayView;

    private static _infoBoxOptionsInputs: string[] = ['disableAutoPan', 'maxWidth'];
    private _infoBoxAddedToManager: boolean = false;
    private _id: string = (infoBoxId++).toString();

    constructor(private _infoBoxManager: InfoBoxManager, private _el: ElementRef) {

    }

    ngOnInit() {
        this.content = this._el.nativeElement.querySelector('.sebm-google-map-info-box-content');
        this._infoBoxManager.addInfoBox(this);
        this._infoBoxAddedToManager = true;
    }

    /** @internal */
    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        if (!this._infoBoxAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoBoxManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoBoxManager.setZIndex(this);
        }
        this._setInfoBoxOptions(changes);
    }

    private _setInfoBoxOptions(changes: { [key: string]: SimpleChange }) {
        let options: { [propName: string]: any } = {};
        let optionKeys = Object.keys(changes).filter(
            k => SebmGoogleMapInfoBox._infoBoxOptionsInputs.indexOf(k) !== -1);
        optionKeys.forEach((k) => { options[k] = changes[k].currentValue; });
        this._infoBoxManager.setOptions(this, options);
    }

    /**
     * Opens the info window.
     */
    open(): Promise<void> { return this._infoBoxManager.open(this); }

    /**
     * Closes the info window.
     */
    close(): Promise<void> {
        return this._infoBoxManager.close(this);
    }

    /** @internal */
    id(): string { return this._id; }

    /** @internal */
    toString(): string { return 'SebmGoogleMapInfoBox-' + this._id.toString(); }

    /** @internal */
    ngOnDestroy() {
        this._infoBoxManager.deleteInfoBox(this);
    }
}

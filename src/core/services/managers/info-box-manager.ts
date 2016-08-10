import {Injectable, NgZone} from '@angular/core';
import {SebmGoogleMapInfoBox} from '../../directives/google-map-info-box';
import {GoogleMapsAPIWrapper} from '../google-maps-api-wrapper';
import {MarkerManager} from './marker-manager';
import {OverlayViewManager} from './overlay-view-manager';
import {InfoBox, InfoBoxOptions} from '../google-maps-types';

@Injectable()
export class InfoBoxManager {

    private _infoBoxes: Map<SebmGoogleMapInfoBox, Promise<InfoBox>> = new Map<SebmGoogleMapInfoBox, Promise<InfoBox>>();

    constructor(
        private _mapsWrapper: GoogleMapsAPIWrapper, private _zone: NgZone,
        private _markerManager: MarkerManager, private _overlayViewManager: OverlayViewManager) { }

    deleteInfoBox(infoBox: SebmGoogleMapInfoBox): Promise<void> {
        const iBox = this._infoBoxes.get(infoBox);
        if (iBox == null) {
            // info window already deleted
            return Promise.resolve();
        }

        return iBox.then((i: InfoBox) => {
            return this._zone.run(() => {
                i.close();
                this._infoBoxes.delete(infoBox);
            });
        });
    }

    setPosition(infoBox: SebmGoogleMapInfoBox): Promise<void> {
        return this._infoBoxes.get(infoBox).then((i: InfoBox) => i.setPosition({
            lat: infoBox.latitude,
            lng: infoBox.longitude
        }));
    }

    setZIndex(infoBox: SebmGoogleMapInfoBox): Promise<void> {
        return this._infoBoxes.get(infoBox)
            .then((i: InfoBox) => i.setZIndex(infoBox.zIndex));
    }

    open(infoBox: SebmGoogleMapInfoBox): Promise<void> {
        return this._infoBoxes.get(infoBox).then((w) => {
            if (infoBox.hostOverlayView != null) {
                return this._overlayViewManager.getNativeoverlayView(infoBox.hostOverlayView).then((overlayView) => {
                    return this._mapsWrapper.getMap().then((map) => w.open(map, overlayView));
                });
            }
            return this._mapsWrapper.getMap().then((map) => w.open(map));
        });
    }

    close(infoWindow: SebmGoogleMapInfoBox): Promise<void> {
        return this._infoBoxes.get(infoWindow).then((w) => w.close());
    }

    setOptions(infoWindow: SebmGoogleMapInfoBox, options: InfoBoxOptions) {
        return this._infoBoxes.get(infoWindow).then((i: InfoBox) => i.setOptions(options));
    }

    addInfoBox(infoBox: SebmGoogleMapInfoBox) {
        const options: InfoBoxOptions = {
            alignBottom: infoBox.alignBottom,
            boxClass: infoBox.boxClass,
            boxStyle: infoBox.boxStyle,
            closeBoxMargin: infoBox.closeBoxMargin,
            closeBoxURL: infoBox.closeBoxURL,
            content: infoBox.content,
            disableAutoPan: infoBox.disableAutoPan,
            enableEventPropagation: infoBox.enableEventPropagation,
            infoBoxClearance: infoBox.infoBoxClearance,
            isHidden: infoBox.isHidden,
            maxWidth: infoBox.maxWidth,
            pane: infoBox.pane,
            pixelOffset: infoBox.pixelOffset,
            visible: infoBox.visible
        };

        if (typeof infoBox.latitude === 'number' && typeof infoBox.longitude === 'number') {
            options.position = { lat: infoBox.latitude, lng: infoBox.longitude };
        }
        const infoBoxPromise = this._mapsWrapper.createInfoBox(options);
        this._infoBoxes.set(infoBox, infoBoxPromise);
    }
}

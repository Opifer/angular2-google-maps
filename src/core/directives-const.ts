import {SebmGoogleMap} from './directives/google-map';
import {SebmGoogleImageMapType} from './directives/google-image-map-type';
import {SebmGoogleMapCircle} from './directives/google-map-circle';
import {SebmGoogleMapInfoBox} from './directives/google-map-info-box';
import {SebmGoogleMapInfoWindow} from './directives/google-map-info-window';
import {SebmGoogleMapMarker} from './directives/google-map-marker';
import {SebmGoogleMapOverlayView} from './directives/google-map-overlay-view';

export const GOOGLE_MAPS_DIRECTIVES: any[] =
    [SebmGoogleImageMapType, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoBox, SebmGoogleMapInfoWindow, SebmGoogleMapCircle, SebmGoogleMapOverlayView];

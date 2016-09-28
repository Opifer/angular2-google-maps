export var google: any;

export interface GoogleMap extends MVCObject {
  constructor(el: HTMLElement, opts?: MapOptions): void;
  panTo(latLng: LatLng|LatLngLiteral): void;
  setZoom(zoom: number): void;
  getCenter(): LatLng;
  setCenter(latLng: LatLng|LatLngLiteral): void;
  getBounds(): LatLngBounds;
  getZoom(): number;
  setOptions(options: MapOptions): void;
  panToBounds(latLngBounds: LatLngBounds|LatLngBoundsLiteral): void;
  fitBounds(bounds: LatLngBounds|LatLngBoundsLiteral): void;
}

export interface LatLng {
  constructor(lat: number, lng: number): void;
  lat(): number;
  lng(): number;
}

export interface Marker extends MVCObject {
  constructor(options?: MarkerOptions): void;
  setMap(map: GoogleMap): void;
  setPosition(latLng: LatLng|LatLngLiteral): void;
  setTitle(title: string): void;
  setLabel(label: string|MarkerLabel): void;
  setDraggable(draggable: boolean): void;
  setIcon(icon: string): void;
  setOpacity(opacity: number): void;
  setVisible(visible: boolean): void;
  getLabel(): MarkerLabel;
}

export interface MarkerOptions {
  position: LatLng|LatLngLiteral;
  title?: string;
  map?: GoogleMap;
  label?: string|MarkerLabel;
  draggable?: boolean;
  icon?: string;
  opacity?: number;
  visible?: boolean;
}

export interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}

export interface OverlayView {
  constructor(): void;
  setMap(map: GoogleMap): void;
  draw(): void;
  onAdd(): void;
  onRemove(): void;
  addListener(eventType: string, fn: Function): void;
  getPosition():LatLng;
}

export interface OverlayViewOptions {
  position: LatLng|LatLngLiteral;
  map?: GoogleMap;
  objectId?: number;
  objectContent?: string;
  class?: string;
  type?: string;
  color?: string;
  label?: string;
  count?: number;
}

export interface Circle extends MVCObject {
  getBounds(): LatLngBounds;
  getCenter(): LatLng;
  getDraggable(): boolean;
  getEditable(): boolean;
  getMap(): GoogleMap;
  getRadius(): number;
  getVisible(): boolean;
  setCenter(center: LatLng|LatLngLiteral): void;
  setDraggable(draggable: boolean): void;
  setEditable(editable: boolean): void;
  setMap(map: GoogleMap): void;
  setOptions(options: CircleOptions): void;
  setRadius(radius: number): void;
  setVisible(visible: boolean): void;
}

export interface CircleOptions {
  center?: LatLng|LatLngLiteral;
  clickable?: boolean;
  draggable?: boolean;
  editable?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  map?: GoogleMap;
  radius?: number;
  strokeColor?: string;
  strokeOpacity?: number;
  strokePosition?: 'CENTER'|'INSIDE'|'OUTSIDE';
  strokeWeight?: number;
  visible?: boolean;
  zIndex?: number;
}

export interface LatLngBounds {
  contains(latLng: LatLng): boolean;
  equals(other: LatLngBounds|LatLngBoundsLiteral): boolean;
  extend(point: LatLng): void;
  getCenter(): LatLng;
  getNorthEast(): LatLng;
  getSouthWest(): LatLng;
  intersects(other: LatLngBounds|LatLngBoundsLiteral): boolean;
  isEmpty(): boolean;
  toJSON(): LatLngBoundsLiteral;
  toSpan(): LatLng;
  toString(): string;
  toUrlValue(precision?: number): string;
  union(other: LatLngBounds|LatLngBoundsLiteral): LatLngBounds;
}

export interface LatLngBoundsLiteral {
  east: number;
  north: number;
  south: number;
  west: number;
}

export interface LatLngLiteral {
  lat: number;
  lng: number;
}

export interface MouseEvent { latLng: LatLng; }

export interface MapOptions {
  center?: LatLng|LatLngLiteral;
  zoom?: number;
  disableDoubleClickZoom?: boolean;
  disableDefaultUI?: boolean;
  backgroundColor?: string;
  draggableCursor?: string;
  draggingCursor?: string;
  keyboardShortcuts?: boolean;
  zoomControl?: boolean;
  styles?: MapTypeStyle[];
  streetViewControl?: boolean;
  scaleControl?: boolean;
  mapTypeId?: string;
  mapTypeControlOptions?: MapTypeControlOptions;
}

export interface MapTypeStyle {
  elementType: 'all'|'geometry'|'geometry.fill'|'geometry.stroke'|'labels'|'labels.icon'|
      'labels.text'|'labels.text.fill'|'labels.text.stroke';
  featureType: 'administrative'|'administrative.country'|'administrative.land_parcel'|
      'administrative.locality'|'administrative.neighborhood'|'administrative.province'|'all'|
      'landscape'|'landscape.man_made'|'landscape.natural'|'landscape.natural.landcover'|
      'landscape.natural.terrain'|'poi'|'poi.attraction'|'poi.business'|'poi.government'|
      'poi.medical'|'poi.park'|'poi.place_of_worship'|'poi.school'|'poi.sports_complex'|'road'|
      'road.arterial'|'road.highway'|'road.highway.controlled_access'|'road.local'|'transit'|
      'transit.line'|'transit.station'|'transit.station.airport'|'transit.station.bus'|
      'transit.station.rail'|'water';
  stylers: MapTypeStyler[];
}

/**
 *  If more than one key is specified in a single MapTypeStyler, all but one will be ignored.
 */
export interface MapTypeStyler {
  color?: string;
  gamma?: number;
  hue?: string;
  invert_lightness?: boolean;
  lightness?: number;
  saturation?: number;
  visibility?: string;
  weight?: number;
}

export interface InfoWindow {
  constructor(opts?: InfoWindowOptions): void;
  close(): void;
  getContent(): string|Node;
  getPosition(): LatLng;
  getZIndex(): number;
  open(map?: GoogleMap, anchor?: MVCObject): void;
  setContent(content: string|Node): void;
  setOptions(options: InfoWindowOptions): void;
  setPosition(position: LatLng|LatLngLiteral): void;
  setZIndex(zIndex: number): void;
}

export interface InfoBox {
    constructor(opts?: InfoBoxOptions): void;
    close(): void;
    getContent(): string | Node;
    getPosition(): LatLng;
    getZIndex(): number;
    open(map?: GoogleMap, anchor?: MVCObject): void;
    setContent(content: string | Node): void;
    setOptions(options: InfoBoxOptions): void;
    setPosition(position: LatLng | LatLngLiteral): void;
    setZIndex(zIndex: number): void;
}

export interface MVCObject { addListener(eventName: string, handler: Function): MapsEventListener; }

export interface MapsEventListener { remove(): void; }

export interface Size {
  height: number;
  width: number;
  constructor(width: number, height: number, widthUnit?: string, heightUnit?: string): void;
  equals(other: Size): boolean;
  toString(): string;
}

export interface InfoWindowOptions {
  content?: string|Node;
  disableAutoPan?: boolean;
  maxWidth?: number;
  pixelOffset?: Size;
  position?: LatLng|LatLngLiteral;
  zIndex?: number;
}

export interface MapTypeRegistry { set(id: string, mapType: any): void; }

export interface MapTypeControlOptions { mapTypeIds: string[]; }

export interface ImageMapTypeCoord {
  x: number;
  y: number;
}
export interface ImageMapTypeTileSize {
  height: number;
  width: number;
}

export interface ImageMapTypeOptions {
  tileSize?: ImageMapTypeTileSize;
  maxZoom: number;
  minZoom: number;
  radius: number;
  name: string;
  alt?: string;
  getTileUrl(coord: ImageMapTypeCoord, zoom: number): string;
}

export class OverlayViewClass {
  public latlng : number;
  overlayView: any;
  ID: number;
  Content: string;
  class: string;
  type: string;
  textColor: string;
  color: string;
  label: string;
  count: number;

  constructor(options: any, google: any) {
    this.latlng = new google.maps.LatLng(options.position.lat, options.position.lng);
    this.ID = options.objectId;
    this.Content = options.objectContent;
    this.class = options.class;
    this.type = options.type;
    this.textColor = options.textColor;
    this.color = options.color;
    this.count = options.count;

    this.overlayView = new google.maps.OverlayView();

    var self = this;

    this.overlayView.getPosition = function() {
      var position = self.latlng
      return position;
    }

    this.overlayView.remove = function() {
        if (this.div) {
    		this.div.parentNode.removeChild(this.div);
    		this.div = null;
    	}
    }

    this.overlayView.draw = function() {
      var div = this.div;

      if (!div) {

        div = this.div = document.createElement('div');

        div.className = 'marker';

        if (self.class != null) {
            div.className += ' marker-'+self.class;
        }

        div.innerHTML = '<span class="marker-id">'+ self.ID +'</span>';

         google.maps.event.addDomListener(div, "click", handler);
         google.maps.event.addDomListener(div, "touchend", handler);
         
        function handler(event:any) {
            google.maps.event.trigger(self.overlayView, "click");
            event.stopPropagation();
        }

       
        var panes = this.getPanes();
            panes.overlayImage.appendChild(div);

          if (self.type === 'cluster'){
              div.innerHTML = '<span class="marker-label">'+ self.Content +'</span>' + '<div style="background-color:' + self.color + '" class="cluster-background">'+ '<span style="color:' + self.textColor + '" class="marker-id">' + self.count + '</span>' + '</div>';

              if (self.color === '#ffffff') {
                  // console.log(self.color);              
              }
          }    
        }

        var point = this.getProjection().fromLatLngToDivPixel(self.latlng);

        if (point) {
            div.style.left = point.x + 'px';
            div.style.top = point.y + 'px';
        }
      }
    }

  getOverlayView() : any {
      return this.overlayView;
    }
}

export interface SizeLiteral {
    height: number;
    width: number;
}

export interface InfoBoxOptions {
    alignBottom?: boolean;
    boxClass?: string;
    boxStyle?: BoxStyle;
    closeBoxMargin?: string;
    closeBoxURL?: string;
    content?: string | Node;
    disableAutoPan?: boolean;
    enableEventPropagation?: boolean;
    infoBoxClearance?: Size | SizeLiteral;
    isHidden?: boolean;
    maxWidth?: number;
    pane?: string;
    pixelOffset?: Size | SizeLiteral;
    position?: LatLng | LatLngLiteral;
    visible?: boolean;
    zIndex?: number;
}

export interface BoxStyle {
    background?: string | Node;
    opacity?: number;
    width?: string;
}

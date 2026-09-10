declare module '@svg-maps/india' {
  export interface SVGLocation {
    id: string;
    name: string;
    path: string;
  }
  export interface SVGMapData {
    label: string;
    viewBox: string;
    locations: SVGLocation[];
  }
  const IndiaMap: SVGMapData;
  export default IndiaMap;
}

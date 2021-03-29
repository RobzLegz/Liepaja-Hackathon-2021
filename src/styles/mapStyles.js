export const mapStyles = [
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        hue: "#ff0000",
      },
    ],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        color: "#f0f0f0",
      },
      {
        lightness: -7,
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#1994bf",
      },
      {
        saturation: -69,
      },
      {
        gamma: 0.99,
      },
      {
        lightness: 33,
      },
    ],
  },
  {
    featureType: "poi.government",
    stylers: [
      {
        color: "#9e5916",
      },
      {
        lightness: 46,
      },
    ],
  },
  {
    featureType: "transit.station",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    stylers: [
      {
        color: "#333333",
      },
      {
        lightness: 22,
      },
    ],
  },
];

# react-simple-zoom
A React component to zoom to a larger image within it's existing container.

## Demo

[Check out the demo here](https://benhodgson87.github.io/react-simple-zoom/examples/dist/index.html) by hovering over the image. Note on devices without hover support you'll just see a static image.

## Installation

`yarn add react-simple-zoom --dev`

or

`npm install react-simple-zoom --save-dev`

## Usage

```jsx
<SimpleZoom
  thumbUrl={'http://via.placeholder.com/480x640'}
  fullUrl={'http://via.placeholder.com/960x1280'}
  zoomScale={3.6}
  onEnterCallback={() => { // Do something on mouseenter }}
  onExitCallback={() => { // Do something on mouseout }}
  onExitTimeout={2000}
/>
```

#### props.thumbUrl
Pass through a URL that will be the initial thumbnail image. This will also be the fallback used by devices without hover support.

This simply renders an `<img>` tag so most image formats will be fine.

#### props.fullUrl
URL for higher resolution image that will be zoomed into. This is preloaded when the component mounts to avoid a delay on hover.

This renders as a CSS background image, so again most formats should work fine.

#### props.zoomScale *(Optional)*
How many times you want the image to be magnified. Defaults to 2.4x.

#### props.onEnterCallback *(Optional)*
Pass a function that will be called when the user's begins hovering over the component.

#### props.onExitCallback *(Optional)*
Pass a function that will be called when the user stops hovering over the component.

#### props.onExitTimeout *(Optional)*
Pass a delay in milliseconds for the exit callback. The exit callback will only be called if the user hovers over the component for longer than this delay. Useful for firing analytics events based on interaction with the component.

## Issues & Contributing

Please log any issues or bugs on the Github issues tab above, and feel free to contribute by opening a Pull Request.

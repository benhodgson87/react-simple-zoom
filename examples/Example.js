import React, { Component } from 'react';
import SimpleZoom from '../src/index';

class Example extends Component {
  entered() {
    console.log('You moused over!')
  }

  exited() {
    console.log(`I should only run if you hover for more than 2s`)
  }

  render() {
    return (
      <div style={{ width: '25%' }}>
        <SimpleZoom
          thumbUrl={'http://via.placeholder.com/480x640'}
          fullUrl={'http://via.placeholder.com/960x1280'}
          zoomScale={2.4}
          onEnterCallback={this.entered}
          onExitCallback={this.exited}
          onExitTimeout={2000}
        />
      </div>
    )
  }
}

export default Example;

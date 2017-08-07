import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as style from './index.css'

class SimpleZoom extends Component {
  static propTypes = {
    thumbUrl: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
    zoomScale: PropTypes.number,
    onEnterCallback: PropTypes.func,
    onExitCallback: PropTypes.func,
    onExitTimeout: PropTypes.number,
  }

  static defaultProps = {
    zoomScale: 2.4,
  }

  constructor(props) {
    super(props)
    this.state = {
      timerCount: 0,
    }
    this.timerInstance = null
  }

  componentWillMount() {
    const img = new Image()
    img.src = this.props.fullUrl
  }

  startHoverTimer() {
    const updateInt = 10
    this.timerInstance = setInterval(() => {
      this.setState((prevState) => ({
        timerCount: prevState.timerCount + updateInt,
      }))
    }, updateInt)
  }

  endHoverTimer() {
    const timeout = this.props.onExitTimeout || 0
    clearInterval(this.timerInstance)
    if (this.props.onExitCallback && this.state.timerCount >= timeout) this.props.onExitCallback()
    this.setState({ timerCount: 0 })
  }

  zoomPositionHandler(e) {
    const container = this.imgThumb
    const target = this.imgZoomed
    const containerBox = container.getBoundingClientRect()
    const transform = {
      x: (e.clientX - containerBox.left) / containerBox.width * 100,
      y: (e.clientY - containerBox.top) / containerBox.height * 100,
    }

    target.style.height = containerBox.height
    target.style.transformOrigin = `${transform.x}% ${transform.y}%`
  }

  componentMouseEnter(e) {
    e.preventDefault()
    this.startHoverTimer()
    if (this.props.onEnterCallback) this.props.onEnterCallback()
  }

  componentMouseLeave(e) {
    e.preventDefault()
    this.endHoverTimer()
  }

  componentMouseMove(e) {
    e.preventDefault()
    this.zoomPositionHandler(e)
  }

  renderThumb() {
    return (
      <img
        data-ref='imgThumb'
        ref={r => {
          this.imgThumb = r
        }}
        style={{

        }}
        src={this.props.thumbUrl}
      />
    )
  }

  renderFull() {
    return (
      <div
        className={style.simpleZoom__zoomed}
        data-ref='imgZoomed'
        ref={r => {
          this.imgZoomed = r
        }}
        style={{
          backgroundImage: `url(${this.props.fullUrl})`,
          transform: `scale(${this.props.zoomScale})`,
        }}
      />
    )
  }

  render() {
    if (!this.props.thumbUrl) return null
    return (
      <div
        ref={r => {
          this.imgContainer = r
        }}
        data-ref='imgContainer'
        className={style.simpleZoom}
        onMouseEnter={e => this.componentMouseEnter(e)}
        onMouseLeave={e => this.componentMouseLeave(e)}
        onMouseMove={e => this.componentMouseMove(e)}
      >
        { this.renderThumb() }
        { this.renderFull() }
      </div>
    )
  }
}

export default SimpleZoom

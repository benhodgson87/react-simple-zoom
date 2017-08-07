import React from 'react'
import { mount } from 'enzyme'
import SimpleZoom from './index'

const mountComponent = props => {
  return mount(<SimpleZoom {...props} />)
}

describe('Simple Zoom Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('does not render if no thumbnail supplied', () => {
    const wrapper = mountComponent({
      fullUrl: 'http://foo.bar/full.jpg',
    })
    expect(wrapper.find('[data-ref="imgContainer"]').exists()).toBe(false)
  })

  test('renders if thumbnail in API response', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
    })
    expect(wrapper.find('[data-ref="imgContainer"]').exists()).toBe(true)
  })

  test('renders plan thumbnail as image', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
    })
    expect(wrapper.find('[data-ref="imgThumb"]').html()).toContain(
      `src="http://foo.bar/thumb.jpg"`
    )
  })

  test('creates a zoomed image container with the large image as a CSS background', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
    })
    expect(wrapper.find('[data-ref="imgZoomed"]').html()).toContain(
      `background-image: url(http://foo.bar/full.jpg)`
    )
  })

  test('starts a timer on mouse enter, and updates state in ms', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
    })
    wrapper.find('[data-ref="imgContainer"]').simulate('mouseenter')
    jest.runTimersToTime(1000)
    expect(wrapper.state('timerCount')).toBe(1000)
  })

  test('runs callback function on enter', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
      onEnterCallback: jest.fn(),
    })
    wrapper.find('[data-ref="imgContainer"]').simulate('mouseenter')
    expect(wrapper.prop('onEnterCallback')).toHaveBeenCalled()
  })

  test('omits callback function on mouseout if user interacted for less than timeout', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
      onExitCallback: jest.fn(),
      onExitTimeout: 2000,
    })
    wrapper.find('[data-ref="imgContainer"]').simulate('mouseenter')
    jest.runTimersToTime(1000)
    wrapper.find('[data-ref="imgContainer"]').simulate('mouseleave')
    expect(wrapper.prop('onExitCallback')).not.toHaveBeenCalled()
  })

  test('fires the callback function on mouseout if user interacted for longer than timeout', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
      onExitCallback: jest.fn(),
      onExitTimeout: 1000,
    })
    wrapper.find('[data-ref="imgContainer"]').simulate('mouseenter')
    jest.runTimersToTime(2500)
    wrapper.find('[data-ref="imgContainer"]').simulate('mouseleave')
    expect(wrapper.prop('onExitCallback')).toHaveBeenCalled()
  })

  test('sets a height attribute for zoomed plan on mouse enter', () => {
    const wrapper = mountComponent({
      thumbUrl: 'http://foo.bar/thumb.jpg',
      fullUrl: 'http://foo.bar/full.jpg',
    })
    wrapper.find('[data-ref="imgContainer"]').simulate('mouseenter')
    wrapper.find('[data-ref="imgZoomed"]').simulate('mousemove')
    expect(wrapper.find('[data-ref="imgZoomed"]').html()).toContain('height')
  })

})

import { mount } from '@vue/test-utils'
import { useImage } from '@vueuse/core'
import { beforeEach } from 'node:test'
import { ImageCompare } from 'primevue'
import PrimeVue from 'primevue/config'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createApp } from 'vue'

import ImageCompareWidget from './ImageCompareWidget.vue'

vi.mock('@vueuse/core', () => ({
  useImage: vi.fn().mockReturnValue({ isLoading: false, error: false })
}))

describe('ImageCompareWidget', () => {
  beforeAll(() => {
    // Create a Vue app instance for PrimeVue
    const app = createApp({})
    app.use(PrimeVue)
  })
  beforeEach(() => {
    vi.resetAllMocks()
  })

  const mountComponent = (
    props: InstanceType<typeof ImageCompareWidget>['$props'],
    options = {}
  ) => {
    return mount(ImageCompareWidget, {
      global: {
        plugins: [PrimeVue]
      },
      props,
      ...options
    })
  }
  it('should contain images if no errors', () => {
    const wrapper = mountComponent({
      imageOne: 'foo.jpg',
      imageTwo: 'bar.jpg'
    })
    const images = wrapper.findAll('img')
    expect(images.length).toEqual(2)
    const [imageOne, imageTwo] = images
    expect(imageOne.attributes('src')).toEqual('foo.jpg')
    expect(imageTwo.attributes('src')).toEqual('bar.jpg')

    expect(wrapper.findComponent(ImageCompare).exists()).toBe(true)
  })

  it('should contain no images if there are errors', () => {
    // @ts-expect-error Mocking ref returns
    vi.mocked(useImage).mockReturnValue({ isLoading: false, error: 'oops' })
    const wrapper = mountComponent({
      imageOne: 'foo.jpg',
      imageTwo: 'bar.jpg'
    })
    const images = wrapper.findAll('img')
    expect(images.length).toEqual(0)

    expect(wrapper.findComponent(ImageCompare).exists()).toBe(false)
    expect(wrapper.find('div').text()).toContain(
      'Could not load images to compare'
    )
  })
})

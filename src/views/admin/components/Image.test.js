import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Image from './Image.vue'

function createFile(name, type, size) {
  const file = new File(['dummy content'], name, { type })
  Object.defineProperty(file, 'size', { value: size })
  return file
}

function setFileInput(wrapper, file) {
  const input = wrapper.find('input[type="file"]').element
  const event = new Event('change')
  Object.defineProperty(event, 'target', {
    writable: false,
    value: { files: [file] }
  })
  input.dispatchEvent(event)
}

describe('Image.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Image, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
  })

  it('renders the default placeholder image', () => {
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toContain('dummy-900x600.jpg')
  })

  it('accepts a valid JPEG file under 1MB and shows preview', async () => {
    const file = createFile('photo.jpg', 'image/jpeg', 500000)
    setFileInput(wrapper, file)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.file).toBe(file)
    expect(wrapper.vm.previewUrl).toContain('blob:')
    expect(wrapper.vm.fileError).toBe(null)
  })

  it('rejects a PNG file and shows error', async () => {
    const file = createFile('photo.png', 'image/png', 500000)
    setFileInput(wrapper, file)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.fileError).toContain('Please select an image')
    expect(wrapper.vm.previewUrl).toBe(null)
  })

  it('rejects a too-large JPEG file and shows error', async () => {
    const file = createFile('big.jpg', 'image/jpeg', 2000000)
    setFileInput(wrapper, file)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.fileError).toContain('Please select an image')
    expect(wrapper.vm.previewUrl).toBe(null)
  })
})

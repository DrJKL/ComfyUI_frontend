import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useImageCompareWidget } from '@/composables/widgets/useImageCompareWidget'
import type { InputSpec } from '@/schemas/nodeDef/nodeDefSchemaV2'

import { ComponentWidgetImpl } from '../../../../src/scripts/domWidget'

vi.mock('@/scripts/widgets', () => ({
  addValueControlWidgets: vi.fn()
}))

describe('useImageCompareWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle undefined spec', () => {
    const testImages: [string, string] = ['foo.jpg', 'bar.jpg']
    const constructor = useImageCompareWidget(testImages)
    const mockNode = {
      addCustomWidget: vi.fn().mockReturnValue({})
    }

    const inputSpec: InputSpec = {
      type: 'imageComparison',
      name: '$$node-image-compare'
    }

    const widget = constructor(mockNode as any, inputSpec)

    expect(mockNode.addCustomWidget).toHaveBeenCalledOnce()
    expect(widget).toBeInstanceOf(ComponentWidgetImpl)
    expect(widget.type).toBe('custom')
    expect(
      // @ts-expect-error Type constraint
      (widget as unknown as ComponentWidgetImpl<string | object, unknown>)
        .component
    ).toBeTruthy()
  })
})

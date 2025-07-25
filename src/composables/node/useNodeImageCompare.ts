import { LGraphNode } from '@comfyorg/litegraph'

import { useImageCompareWidget } from '@/composables/widgets/useImageCompareWidget'

const IMAGE_COMPARE_WIDGET_NAME = '$$node-image-compare'

/**
 * Composable for handling node image comparison
 */
export function useNodeImageCompare(images: [string, string]) {
  const imageCompareWidget = useImageCompareWidget(images)

  const findImageCompareWidget = (node: LGraphNode) =>
    node.widgets?.find((w) => w.name === IMAGE_COMPARE_WIDGET_NAME)

  const addImageCompareWidget = (node: LGraphNode) =>
    imageCompareWidget(node, {
      name: IMAGE_COMPARE_WIDGET_NAME,
      type: 'imageComparison'
    })

  /**
   * Shows text preview for a node
   * @param node The graph node to show the preview for
   */
  function showImageCompare(
    node: LGraphNode,
    image_compare_images: [string, string]
  ) {
    const widget = findImageCompareWidget(node) ?? addImageCompareWidget(node)
    widget.value = image_compare_images
    node.setDirtyCanvas?.(true)
  }

  /**
   * Removes text preview from a node
   * @param node The graph node to remove the preview from
   */
  function removeImageCompare(node: LGraphNode) {
    if (!node.widgets) return

    const widgetIdx = node.widgets.findIndex(
      (w) => w.name === IMAGE_COMPARE_WIDGET_NAME
    )

    if (widgetIdx > -1) {
      node.widgets[widgetIdx].onRemove?.()
      node.widgets.splice(widgetIdx, 1)
    }
  }

  return {
    showImageCompare,
    removeImageCompare
  }
}

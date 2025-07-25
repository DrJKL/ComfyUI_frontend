import { type LGraphNode } from '@comfyorg/litegraph'
import { ref } from 'vue'

import ImageCompareWidget from '@/components/common/ImageCompareWidget.vue'
import { type InputSpec } from '@/schemas/nodeDef/nodeDefSchemaV2'
import {
  ComponentWidgetImpl,
  type ComponentWidgetStandardProps
} from '@/scripts/domWidget'
import { type BaseDOMWidget, addWidget } from '@/scripts/domWidget'
import { type ComfyWidgetConstructorV2 } from '@/scripts/widgets'

type ImageCompareCustomProps = Omit<
  InstanceType<typeof ImageCompareWidget>['$props'],
  ComponentWidgetStandardProps
>

const addImageCompareWidget = (
  node: LGraphNode,
  inputSpec: InputSpec,
  images: [string, string]
) => {
  const [imageOne, imageTwo] = images
  const widgetValue = ref<ImageCompareCustomProps>({
    imageOne,
    imageTwo
  })
  const widget = new ComponentWidgetImpl<
    ImageCompareCustomProps,
    ImageCompareCustomProps
  >({
    node,
    name: inputSpec.name,
    component: ImageCompareWidget,
    inputSpec,
    props: {
      imageOne,
      imageTwo
    },
    options: {
      getValue: () => widgetValue.value,
      setValue: (value: ImageCompareCustomProps) => {
        widgetValue.value = value
      }
    }
  })
  addWidget(node, widget as BaseDOMWidget<object | string>)
  return widget
}

export const useImageCompareWidget = (images: [string, string]) => {
  const widgetConstructor: ComfyWidgetConstructorV2 = (
    node: LGraphNode,
    inputSpec: InputSpec
  ) => {
    return addImageCompareWidget(node, inputSpec, images)
  }

  return widgetConstructor
}

import { ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react'
import Image from '@tiptap/extension-image'
import ResizableImageComponent from './ResizableImageComponent'

const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      'data-filename': {
        default: null,
        parseHTML: element => element.getAttribute('data-filename'),
        renderHTML: attributes => {
          if (!attributes['data-filename']) return {}
          return { 'data-filename': attributes['data-filename'] }
        },
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(
      ResizableImageComponent as unknown as React.ComponentType<NodeViewProps>
    )
  },
})

export default CustomImage
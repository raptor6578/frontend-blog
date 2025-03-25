import { useRef, useState } from 'react'
import Image from '@tiptap/extension-image'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'


const ResizableImage = Image.extend({

  name: 'resizableImage',
  
  addNodeView() {
    return ReactNodeViewRenderer(({ node, updateAttributes }) => {
      const { src, width = 300 } = node.attrs
      const imgRef = useRef<HTMLImageElement>(null)
      const [imgWidth, setImgWidth] = useState(width)

      const handleResize = (e: React.MouseEvent) => {
        const startX = e.clientX
        const startWidth = imgRef.current?.offsetWidth || 0

        const onMouseMove = (moveEvent: MouseEvent) => {
          const newWidth = startWidth + (moveEvent.clientX - startX)
          setImgWidth(newWidth)
        }

        const onMouseUp = () => {
          updateAttributes({ width: imgWidth })
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }

      return (
        <NodeViewWrapper className="resizable-image" style={{ position: 'relative', display: 'inline-block' }}>
          <img
            ref={imgRef}
            src={src}
            style={{ width: `${imgWidth}px`, maxWidth: '100%' }}
            draggable={false}
          />
          <span
            contentEditable={false}
            onMouseDown={handleResize}
          />
        </NodeViewWrapper>
      )

    })
  }
})

export default ResizableImage
// ResizableImageComponent.tsx
import { NodeViewWrapper } from '@tiptap/react'
import { useRef, useState } from 'react'

interface ResizableImageProps {
  node: {
    attrs: {
      src: string;
      width?: number;
    };
  };
  updateAttributes: (attributes: { width: number }) => void;
}

const ResizableImageComponent = ({ node, updateAttributes }: ResizableImageProps) => {
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
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 12,
          height: 12,
          background: 'rgba(0, 0, 0, 0.4)',
          borderRadius: '3px',
          cursor: 'se-resize',
          zIndex: 10,
        }}
      />
    </NodeViewWrapper>
  )
}

export default ResizableImageComponent

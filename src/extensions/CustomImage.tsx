import { Image as ImageExtension } from '@tiptap/extension-image'
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'

const CustomImage = ImageExtension.extend({
  name: 'customImage',
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: '100%',
      },
      'data-filename': {
        default: null,
        parseHTML: element => element.getAttribute('data-filename'),
        renderHTML: attributes => {
          if (!attributes['data-filename']) return {}
          return { 'data-filename': attributes['data-filename'].toLowerCase() }
        },
      },
      'data-original-src': {
        default: null,
        parseHTML: element => element.getAttribute('data-original-src'),
        renderHTML: attributes => {
          if (!attributes['data-original-src']) return {}
          return { 'data-original-src': attributes['data-original-src'] }
        },
      },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(({ node, updateAttributes }) => {
      const { src, width } = node.attrs
      const imgRef = useRef<HTMLImageElement>(null)
      const oldBlobUrlRef = useRef<string | null>(null)
      const [imgWidth, setImgWidth] = useState(width)

      const generateFileName = (src: string) => src.split('/').pop() || `image-${Date.now()}.jpg`

      useEffect(() => {
        const isHttp = src.startsWith('http')
        const alreadyConverted = node.attrs['data-original-src']

        if (isHttp && !alreadyConverted) {
          (async () => {
            try {
              const response = await fetch(src)
              const blob = await response.blob()
              const originalFileName = generateFileName(src)
              const blobUrl = URL.createObjectURL(blob)

              const tempImg = new Image()
              tempImg.src = blobUrl
              tempImg.onload = () => {
                const baseWidth = tempImg.naturalWidth

                updateAttributes({
                  src: blobUrl,
                  width: baseWidth,
                  'data-original-src': src,
                  'data-filename': originalFileName.toLowerCase(),
                })

                setImgWidth(baseWidth)
              }
            } catch (err) {
              console.warn('[CustomImage] Conversion failed:', err)
            }
          })()
        } else if (!width && imgRef.current?.naturalWidth) {
          setImgWidth(imgRef.current.naturalWidth)
        }
      }, [src, width, node.attrs, updateAttributes])

      
      const handleResize = (e: React.MouseEvent) => {
        const startX = e.clientX
        const startWidth = imgRef.current?.offsetWidth || 0

        const onMouseMove = (moveEvent: MouseEvent) => {
          const newWidth = startWidth + (moveEvent.clientX - startX)
          setImgWidth(newWidth)
        }

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove)
          document.removeEventListener('mouseup', onMouseUp)
        
          const finalWidth = imgRef.current?.offsetWidth ?? width
          const originalSrc = node.attrs['data-original-src'] || src
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.src = originalSrc
        
          img.onload = () => {
            if (img.naturalWidth === 0 || img.naturalHeight === 0) return
        
            const scale = finalWidth / img.naturalWidth
            const newWidth = finalWidth
            const newHeight = img.naturalHeight * scale
        
            const canvas = document.createElement('canvas')
            canvas.width = newWidth
            canvas.height = newHeight
        
            const ctx = canvas.getContext('2d')
            if (!ctx) return
        
            ctx.drawImage(img, 0, 0, newWidth, newHeight)
        
            canvas.toBlob((blob) => {
              if (!blob) return
        
              const newBlobUrl = URL.createObjectURL(blob)
        
              if (oldBlobUrlRef.current) {
                URL.revokeObjectURL(oldBlobUrlRef.current)
              }
              oldBlobUrlRef.current = newBlobUrl
        
              updateAttributes({
                width: newWidth,
                src: newBlobUrl,
                'data-original-src': originalSrc,
              })
            }, 'image/jpeg', 0.92)
          }
        
          img.onerror = () => {
            console.warn('Erreur lors du chargement de l’image originale pour resize.')
          }
        }
        
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
      }

      return (
        <NodeViewWrapper className="resizable-image-wrapper">
          <div className="resizable-image-inner">
            <img
              ref={imgRef}
              src={src}
              style={{ width: `${imgWidth}px`, maxWidth: '100%' }}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
            <span
              contentEditable={false}
              onMouseDown={handleResize}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>
        </NodeViewWrapper>
      )
    })
  }
})

export default CustomImage
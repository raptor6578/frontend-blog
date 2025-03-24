import { Editor } from '@tiptap/react'
import { useRef } from 'react'

type Props = {
  editor: Editor | null
  onImageSelected?: (file: File) => void
}

const TipTapToolbar = ({ editor, onImageSelected }: Props) => {

  const inputFileRef = useRef<HTMLInputElement>(null)
  const inputColorRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  const handleFileClick = () => {
    inputFileRef.current?.click()
  }

  const handleColorClick = () => {
    inputColorRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const localUrl = URL.createObjectURL(file)

    editor.chain().focus().setImage({
      src: localUrl,
      alt: '',
      'data-filename': file.name,
    } as {
      src: string
      alt: string
      'data-filename': string
    }).run()

    if (onImageSelected) {
      onImageSelected(file)
    }

    e.target.value = '' // Reset input
  }

  return (
    <div className="toolbar flex flex-wrap gap-2 mb-4 border-b pb-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active' : ''}>Underline</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>H2</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}>• List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''}>1. List</button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}>⭰</button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}>⭿</button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'active' : ''}>⭲</button>
      <button onClick={() => {
        const url = prompt('URL du lien')
        if (url) {
          editor.chain().focus().setLink({ href: url }).run()
        }
      }}>🔗 Lien</button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>❌ Lien</button>
      <button onClick={() => editor.chain().focus().setCodeBlock().run()} className={editor.isActive('codeBlock') ? 'active' : ''}>Code</button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'active' : ''}>Paragraphe</button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>🧹 Effacer bloc</button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>🧽 Effacer styles</button>
      <button onClick={handleFileClick}>📷 Image</button>
      <input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button onClick={handleColorClick}>🎨 Couleur</button>
      <input 
        type="color" 
        ref={inputColorRef}
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        title="Changer la couleur du texte"
        className="hidden"
      />
      <button onClick={() => editor?.chain().focus().unsetColor().run()}>🔄 Reset couleur</button>
    </div>
  )
}

export default TipTapToolbar

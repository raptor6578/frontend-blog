import { Editor } from '@tiptap/react'
import { useRef } from 'react'
import { TextSelection } from 'prosemirror-state'

type Props = {
  editor: Editor | null
}

const TipTapToolbar = ({ editor }: Props) => {

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

    const insertContent = []
    const doc = editor.getJSON()
    const isOnlyEmptyParagraph = doc.content?.[0].type === 'paragraph' && doc.content.length === 1

    if (isOnlyEmptyParagraph) {
      console.log(1)
      insertContent.push({type: 'paragraph'})
    }

    insertContent.push({
      type: 'image',
      attrs: {
        src: localUrl,
        alt: '',
        'data-filename': file.name,
      },
    },
    {
      type: 'paragraph',
    })

    editor
    .chain()
    .focus()
    .insertContent(insertContent)
    .command(({ tr, dispatch }) => {
      const pos = tr.doc.content.size - 1
      dispatch?.(tr.setSelection(TextSelection.create(tr.doc, pos)))
      return true
    })
    .run()
    
    e.target.value = '' 
  }

  return (
    <div className="toolbar flex flex-wrap gap-2 mb-4 border-b pb-2">
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'active' : ''}><strong>B</strong></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'active' : ''}><i>i</i></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'active group-end' : 'group-end'}><u>S</u></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'active' : ''}>H₁</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'active' : ''}>H₂</button>
      <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'active' : ''}><i className="fa-solid fa-paragraph"></i></button>
      <button onClick={() => editor.chain().focus().setCodeBlock().run()} className={editor.isActive('codeBlock') ? 'active group-end' : 'group-end'}><i className="fa-solid fa-code"></i></button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'active' : ''}><i className="fa-solid fa-list-ul"></i></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'active' : ''}><i className="fa-solid fa-list-ol"></i></button>
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'active' : ''}><i className="fa-solid fa-align-left"></i></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'active' : ''}><i className="fa-solid fa-align-center"></i></button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'active group-end' : 'group-end'}><i className="fa-solid fa-align-right"></i></button>
      <button onClick={() => {
        const url = prompt('URL du lien')
        if (url) {
          editor.chain().focus().setLink({ href: url }).run()
        }
      }}>🔗</button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} className="group-end">❌</button>
      <button onClick={handleFileClick}>🖼️</button>
      <input
        type="file"
        accept="image/*"
        ref={inputFileRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button onClick={handleColorClick} className="group-end">🎨</button>
      <input 
        type="color" 
        ref={inputColorRef}
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        title="Changer la couleur du texte"
        className="hidden"
      />
      <button onClick={() => editor.chain().focus().clearNodes().run()}>🧹 Effacer bloc</button>
      <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>🧽 Effacer styles</button>
      <button onClick={() => editor?.chain().focus().unsetColor().run()} className="group-end">🔄 Reset couleur</button>
    </div>
  )
}

export default TipTapToolbar

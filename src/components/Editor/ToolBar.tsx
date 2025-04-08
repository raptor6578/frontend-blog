import { Editor } from '@tiptap/react'
import { useRef } from 'react'
import { imageInsert } from '../../services/editorService'
import styles from './Editor.module.css'

type Props = {
  editor: Editor | null
}

const TipTapToolbar = ({ editor }: Props) => {

  const inputRefs = {
    file: useRef<HTMLInputElement>(null),
    color: useRef<HTMLInputElement>(null),
    highlight: useRef<HTMLInputElement>(null),
  }

  if (!editor) return null
  
  const triggerInput = (key: keyof typeof inputRefs) => {
    inputRefs[key].current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    imageInsert(editor, file!)
    e.target.value = '' 
  }

  return (
    <div className={styles.toolbar}>
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? styles.active : ''}><strong>B</strong></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? styles.active : ''}><i>i</i></button>
      <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? `${styles.active} ${styles.groupEnd}` : styles.groupEnd}><u>S</u></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}>H₁</button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}>H₂</button>
      <button type="button" onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? styles.active : ''}><i className="fa-solid fa-paragraph"></i></button>
      <button type="button" onClick={() => editor.chain().focus().setCodeBlock().run()} className={editor.isActive('codeBlock') ? `${styles.active} ${styles.groupEnd}` : styles.groupEnd}><i className="fa-solid fa-code"></i></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? styles.active : ''}><i className="fa-solid fa-list-ul"></i></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? styles.active : ''}><i className="fa-solid fa-list-ol"></i></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? styles.active : ''}><i className="fa-solid fa-align-left"></i></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? styles.active : ''}><i className="fa-solid fa-align-center"></i></button>
      <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? `${styles.active} ${styles.groupEnd}` : styles.groupEnd}><i className="fa-solid fa-align-right"></i></button>
      <button type="button" onClick={() => {
        const url = prompt('URL du lien')
        if (url) {
          editor.chain().focus().setLink({ href: url }).run()
        }
      }}>🔗</button>
      <button type="button" onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} className={styles.groupEnd}>❌</button>
      <button type="button" onClick={() => triggerInput('file')}>🖼️</button>
      <input
        type="file"
        accept="image/*"
        ref={inputRefs.file}
        onChange={handleFileChange}
        className={styles.hidden}
      />
      <button type="button" onClick={() => triggerInput('color')}>🎨</button>
      <input 
        type="color" 
        ref={inputRefs.color}
        onChange={(e) => editor.chain().focus().setTextColor(e.target.value).run()}
        title="Changer la couleur du texte"
        className={styles.hidden}
      />
      <button type="button" onClick={() => triggerInput('highlight')} className="group-end"><i className="fa-solid fa-highlighter"></i></button>
      <input 
        type="color" 
        ref={inputRefs.highlight}
        onChange={(e) => editor.chain().focus().setHighlight(e.target.value).run()}
        title="Changer la couleur de surlignage"
        className={styles.hidden}
      />
      <button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()}>🧽 Effacer styles</button>
      <button type="button" onClick={() => editor?.chain().focus().unsetAllColors().run()} className={styles.groupEnd}>🔄 Reset couleur</button>
    </div>
  )
}

export default TipTapToolbar

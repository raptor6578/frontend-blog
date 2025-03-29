import React, { useState, useEffect } from 'react'
import { EditorContent } from '@tiptap/react'
import TipTapToolbar from './ToolBar'
import { buildForm } from '../../services/editorService'
import { useEditorInstance } from '../../hooks/useEditorInstance'
import { prepareHtmlBeforeView } from '../../services/editorService'
import './Editor.css'

interface EditorComponent {
  postFunction: (formData: FormData) => Promise<string>
  document?: {
    title: string
    content: string
    slug: string
  }
}

const Editor: React.FC<EditorComponent> = ({ postFunction, document }) => {

  const [title, setTitle] = useState<string>('')
  const editor = useEditorInstance()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = await buildForm(editor!, title)
    await postFunction(formData)
  }

  useEffect(() => {
    if (editor && document) {
      setTitle(document.title)
      editor.commands.setContent(prepareHtmlBeforeView(document.content, document.slug))
    }
  }, [editor, document])

  return (
    <div className="editor-custom">
      <form onSubmit={handleSubmit}>  
        <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" placeholder="Titre de l'article" />
        <div className="editor-wrapper">
          <TipTapToolbar editor={editor} />
          <EditorContent editor={editor} className="editor" />
        </div>  
        <button className="submit-button" type="submit">
          Poster
        </button>
      </form>
  </div>
  )

}

export default Editor
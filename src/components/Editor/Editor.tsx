import React, { useState, useEffect } from 'react'
import { EditorContent } from '@tiptap/react'
import TipTapToolbar from './ToolBar'
import { buildForm } from '../../services/editorService'
import { useEditorInstance } from '../../hooks/useEditorInstance'
import { prepareHtmlBeforeView } from '../../services/editorService'
import axios from 'axios'
import useSpinner from '../../contexts/Spinner/useSpinner'
import './Editor.css'

interface EditorComponent {
  postFunction: (formData: FormData) => Promise<string>
  putFunction: (slug: string, formData: FormData) => Promise<string>
  setMessage: (message: string) => void
  setError: (error: string) => void
  document?: {
    title: string
    content: string
    slug: string
  }
}

const Editor: React.FC<EditorComponent> = ({ 
  postFunction, 
  putFunction, 
  setMessage, 
  setError, 
  document 
}) => {

  const [title, setTitle] = useState<string>('')
  const editor = useEditorInstance()
  const { openSpinner, closeSpinner } = useSpinner()!

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editor) return
  
    const slug = document?.slug
    const formData = await buildForm(editor, title)
    setError('')
    setMessage('')
  
    try {
      openSpinner()
      const response = slug
        ? await putFunction(slug, formData)
        : await postFunction(formData)
      
      setMessage(response)
      closeSpinner()
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message || "Une erreur réseau est survenue."
        : "Une erreur inconnue est survenue."
  
      setError(message)
      closeSpinner()
    }
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
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" placeholder="Titre de l'article" />
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
import React, { useState, useEffect } from 'react'
import { EditorContent } from '@tiptap/react'
import TipTapToolbar from './ToolBar'
import { buildForm } from '../../services/editorService'
import { useEditorInstance } from '../../hooks/useEditorInstance'
import { prepareHtmlBeforeView } from '../../services/editorService'
import useSpinner from '../../contexts/Spinner/useSpinner'
import './Editor.css'

interface EditorComponent {
  postFunction: (formData: FormData) => Promise<string>
  putFunction: (slug: string, formData: FormData) => Promise<string>
  setMessage: (message: string) => void
  setError: (error: string) => void
  document?: {
    title: string
    description: string
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
  const [description, setDescription] = useState<string>('')
  const editor = useEditorInstance()
  const { openSpinner, closeSpinner } = useSpinner()!

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editor) return
  
    const slug = document?.slug
    const formData = await buildForm(editor, title, description)
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
      if (err instanceof Error) {
        console.error(err)
        setError(err.message)
        closeSpinner()
      }
    }
  }
  
  useEffect(() => {
    if (editor && document) {
      setTitle(document.title)
      setDescription(document.description)
      editor.commands.setContent(prepareHtmlBeforeView(document.content, document.slug))
    }
  }, [editor, document])

  return (
    <div className="editor-custom">
      <form onSubmit={handleSubmit}>  
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" placeholder="Titre de l'article" />
        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="description" placeholder="Description de l'article" />
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
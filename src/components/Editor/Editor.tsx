import React, { useState, useEffect } from 'react'
import { EditorContent } from '@tiptap/react'
import TipTapToolbar from './ToolBar'
import { buildForm } from '../../services/editorService'
import { useEditorInstance } from '../../hooks/useEditorInstance'
import { prepareHtmlBeforeView } from '../../services/editorService'
import useSpinner from '../../contexts/Spinner/useSpinner'
import styles from './Editor.module.css'

interface EditorComponent {
  postFunction: (formData: FormData) => Promise<string>
  putFunction: (slug: string, formData: FormData) => Promise<string>
  messages: {
    addError: (message: string) => void,
    clearErrors: () => void,
    addSuccess: (message: string) => void,
    clearSuccess: () => void
  }
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
  messages, 
  document 
}) => {

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const editor = useEditorInstance()
  const { openSpinner, closeSpinner } = useSpinner()
  const { addSuccess, clearSuccess, addError, clearErrors } = messages

  const handleAction = async () => {
    if (!editor) return
  
    const slug = document?.slug

    const form = await buildForm(editor, title, description)
    clearErrors()
    clearSuccess()
  
    try {
      openSpinner()
      const response = slug
        ? await putFunction(slug, form)
        : await postFunction(form)
      
      addSuccess(response)
      closeSpinner()
    } catch (err) {
      if (err instanceof Error) {
        console.error(err)
        addError(err.message)
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
    <div className={styles.editor}>
      <form action={handleAction}>  
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="title" placeholder="Titre de l'article" />
        <input onChange={(e) => setDescription(e.target.value)} value={description} type="text" name="description" placeholder="Description de l'article" />
        <div className="editor-wrapper">
          <TipTapToolbar editor={editor} />
          <EditorContent editor={editor} className="editor" />
        </div>  
        <button className={styles.submitButton} type="submit">
          Poster
        </button>
      </form>
  </div>
  )

}

export default Editor
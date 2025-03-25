import React, { useState } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import slugify from 'speakingurl'
import { common, createLowlight } from 'lowlight'
import 'highlight.js/styles/github.css'

import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import ExitCode from './Extensions/ExitCode'
import ResizableImage from './Extensions/ResizableImage'
import ExtendAttributesImage from './Extensions/ExtendAttributesImage'
import TipTapToolbar from './ToolBar'
import './Editor.css'

const Editor = () => {

  const [localImages, setLocalImages] = useState<File[]>([])
  const [title, setTitle] = useState<string>('')

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: {levels: [1, 2, 3]}, codeBlock: false, code: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({lowlight: createLowlight(common),}),
      ExtendAttributesImage,
      ResizableImage,
      TextStyle,
      Color,
      Underline,
      ExitCode,
    ],
    content: ''
  })

  const handleImageSelected = (file: File) => {
    setLocalImages(prev => [...prev, file])
  }
  
  const prepareHtmlBeforePost = (html: string, title: string) => {
    const slug = slugify(title)
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
  
    doc.querySelectorAll('img[data-filename]').forEach(img => {
      const fileName = img.getAttribute('data-filename')
      if (!fileName) return
  
      img.setAttribute('src', `/${slug}/${encodeURIComponent(fileName)}`)
      img.removeAttribute('data-filename')
  
      if (!img.hasAttribute('alt')) {
        img.setAttribute('alt', '')
      }
    })
  
    return doc.body.innerHTML
  }

  const logFormData = (formData: FormData) => {
    console.log('📦 FormData contents:')
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File ->`, {
          name: value.name,
          type: value.type,
          size: value.size,
        })
      } else {
        console.log(`${key}:`, value)
      }
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const rawHtml = editor?.getHTML()
    const finalHtml = prepareHtmlBeforePost(rawHtml ?? '', title)
  
    const formData = new FormData()
    formData.append('html', finalHtml)
  
    localImages.forEach(file => {
      formData.append('images', file)
    })
  
    logFormData(formData)
  }

  return (
    <div className="editor-custom">
      <form onSubmit={handleSubmit}>  
        <input onChange={handleTitle} type="text" name="title" />
        <div className="editor-wrapper">
          <TipTapToolbar editor={editor} onImageSelected={handleImageSelected} />
          <EditorContent editor={editor} className="editor" />
        </div>  
        <button className="blue-button" type="submit">
          Poster
        </button>
      </form>
  </div>
  )

}

export default Editor
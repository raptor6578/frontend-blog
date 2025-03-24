import React, { useState } from 'react'
import './ArticlePost.css'
import Modal from 'react-modal'
import useModal from '../../../contexts/Modal/useModal'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import slugify from 'speakingurl'
import CustomImage from './CustomImage'
import TipTapToolbar from './ToolBar'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'


const ArticlePost = () => {

    const { modalArticlePostIsOpen, closeArticlePostModal } = useModal()!
    const [localImages, setLocalImages] = useState<File[]>([])
    const [title, setTitle] = useState<string>('')

    const afterOpenModal = () => {
      console.log('afterOpenModal')
    }

    const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value)
    }

    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {levels: [1, 2, 3]},
          codeBlock: false,
          code: false,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
        Link.configure({
          openOnClick: false,
        }),
        CodeBlockLowlight.configure({
          lowlight: createLowlight(common),
        }),
        CustomImage,
        TextStyle,
        Color,
        Underline
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
      <React.Fragment>
        <Modal
          contentLabel="Déposer un article"
          isOpen={modalArticlePostIsOpen}
          onRequestClose={closeArticlePostModal}
          onAfterOpen={afterOpenModal}
          className="article-post"
          overlayClassName="overlay"
        >
          <div className="close-modal">
                <button onClick={closeArticlePostModal}>X</button>
          </div>
          <div className="container-article-post">
            <form onSubmit={handleSubmit}>
              <h2>📰 Déposer un article</h2>
              <input onChange={handleTitle} type="text" name="title" />
              <TipTapToolbar editor={editor} onImageSelected={handleImageSelected} />
              <EditorContent editor={editor} className="editor" />
              <button className="blue-button" type="submit">
                Poster
              </button>
            </form>
          </div>
        </Modal>
      </React.Fragment>
  )
}

export default ArticlePost
import { Editor } from "@tiptap/core"
import hljs from 'highlight.js'
import { TextSelection } from 'prosemirror-state'

const getFilesFromHtml = async (html: string): Promise<File[]> => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const filePromises: Promise<File>[] = []
  doc.querySelectorAll('img[data-filename]').forEach((img) => {
    const filename = img.getAttribute('data-filename') || 'image.png'
    const src = img.getAttribute('src')
    if (src && src.startsWith('blob:')) {
      const promise = fetch(src)
        .then(res => res.blob())
        .then(blob => new File([blob], filename, { type: blob.type }))
      filePromises.push(promise)
    }
  })
  return Promise.all(filePromises)
}

const prepareHtmlBeforePost = (html: string) => {
  const htmlPrepared = html.replace(/<p>\s*<\/p>/g, '<br />')
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlPrepared, 'text/html')
  doc.querySelectorAll('img[data-filename]').forEach(img => {
    const fileName = img.getAttribute('data-filename')
    if (!fileName) return
    img.setAttribute('src', encodeURIComponent(fileName))
    img.removeAttribute('data-filename')
    img.removeAttribute('data-original-src')
    img.removeAttribute('width')
    if (!img.hasAttribute('alt')) {
      img.setAttribute('alt', '')
    }
  })
  return doc.body.innerHTML
}

const prepareHtmlBeforeView = (html: string, slug: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  doc.querySelectorAll('img[src]').forEach(img => {
    const src = img.getAttribute('src')
    if (src) {
      img.setAttribute('src', `http://localhost:8888/api/images/articles/${slug}/${src}`)
      img.setAttribute('style', 'max-width:1300px; text-align:center')
      const wrapper = doc.createElement('div')
      wrapper.style.textAlign = 'center'
      wrapper.appendChild(img.cloneNode(true))
      img.replaceWith(wrapper)
    }
  })
  doc.querySelectorAll('pre code').forEach(code => {
    hljs.highlightElement(code as HTMLElement)
  })
  return doc.body.innerHTML
}

const imageInsert = (editor: Editor, file: File) => {
  if (!file) return
  const localUrl = URL.createObjectURL(file)
  const insertContent = []
  const doc = editor.getJSON()
  const isOnlyEmptyParagraph = doc.content?.[0].type === 'paragraph' && doc.content.length === 1
  if (isOnlyEmptyParagraph) {
    insertContent.push({type: 'paragraph'})
  }
  insertContent.push({
    type: 'customImage',
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
}

const logsFormData = (formData: FormData) => {
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

const buildForm = async (editor: Editor, title: string, logs = false) => {
    const rawHtml = editor.getHTML()
    const finalFiles = await getFilesFromHtml(rawHtml ?? '')
    const finalHtml = prepareHtmlBeforePost(rawHtml ?? '')
    const formData = new FormData()
    formData.append('title', title)
    formData.append('content', finalHtml)
    finalFiles.forEach(file => {
      formData.append('images', file)
    })
    if (logs) {
      logsFormData(formData)
    }
    return formData
}

  export {
    getFilesFromHtml,
    prepareHtmlBeforePost,
    prepareHtmlBeforeView,
    imageInsert,
    logsFormData,
    buildForm
  }
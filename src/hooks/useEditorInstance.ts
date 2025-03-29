import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

import ExitCode from '../extensions/ExitCode'
import CustomImage from '../extensions/CustomImage'
import CustomColor from '../extensions/CustomColor'

export const useEditorInstance = () => {
  return useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, codeBlock: false, code: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      CodeBlockLowlight.configure({ lowlight: createLowlight(common) }),
      Underline,
      ExitCode,
      CustomImage,
      CustomColor,
    ],
    content: '',
  })
}

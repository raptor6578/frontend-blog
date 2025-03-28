import { Mark, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textStylePlus: {
      setTextColor: (color: string) => ReturnType
      setHighlight: (backgroundColor: string) => ReturnType
      unsetAllColors: () => ReturnType
    }
  }
}

export interface TextStylePlusAttributes {
  color?: string | null
  backgroundColor?: string | null
}

const TextStylePlus = Mark.create<{
  HTMLAttributes: Record<string, string | number | boolean>
}, TextStylePlusAttributes>({
  name: 'textStylePlus',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.color || null,
        renderHTML: (attributes: TextStylePlusAttributes) => {
          return attributes.color ? { style: `color: ${attributes.color}` } : {}
        },
      },
      backgroundColor: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.backgroundColor || null,
        renderHTML: (attributes: TextStylePlusAttributes) => {
          return attributes.backgroundColor
            ? { style: `background-color: ${attributes.backgroundColor}` }
            : {}
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: (el: HTMLElement) => (el.style.color || el.style.backgroundColor ? {} : null),
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setTextColor: (color: string) => ({ chain }) => {
        return chain().setMark(this.name, { color }).run()
      },
      setHighlight: (backgroundColor: string) => ({ chain }) => {
        return chain().setMark(this.name, { backgroundColor }).run()
      },
      unsetAllColors: () => ({ chain }) => {
        return chain().unsetMark(this.name).run()
      },
    }
  },
})

export default TextStylePlus

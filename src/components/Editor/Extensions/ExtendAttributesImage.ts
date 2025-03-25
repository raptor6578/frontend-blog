import Image from '@tiptap/extension-image'

const ExtendAttributesImage = Image.extend({

  name: 'extendedAttributesImage',

  addAttributes() {
    return {
      ...this.parent?.(),
      'data-filename': {
        default: null,
        parseHTML: element => element.getAttribute('data-filename'),
        renderHTML: attributes => {
          if (!attributes['data-filename']) return {}
          return { 'data-filename': attributes['data-filename'] }
        },
      },
    }
  },
})

export default ExtendAttributesImage
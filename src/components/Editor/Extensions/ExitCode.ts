import { Extension } from '@tiptap/core'
import { CommandProps } from '@tiptap/core'
import { TextSelection } from 'prosemirror-state'

const ExitCode = Extension.create({
  
  name: 'exitCode',

  addCommands() {
    return {
      exitCode:
        () =>
        ({ state, dispatch }: CommandProps): boolean => {
          const { $from } = state.selection

          if ($from.parent.type.name !== 'codeBlock') {
            return false
          }

          const posAfter = $from.after()
          const paragraph = state.schema.nodes.paragraph.create()

          if (dispatch) {
            const tr = state.tr.insert(posAfter, paragraph)
            tr.setSelection(TextSelection.near(tr.doc.resolve(posAfter + 1)))
            dispatch(tr)
          }

          return true
        },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Enter': () => this.editor.commands.exitCode(),
    }
  },
})

export default ExitCode

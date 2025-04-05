import { useState } from 'react'
import useSpinner from '../contexts/Spinner/useSpinner'
import { postComment } from '../services/commentService'

const usePostComment = () => {

  const { openSpinner, closeSpinner } = useSpinner()!
  const [ error, setError ] = useState<string>('')

  const post = async (contentType: string, targetId: string, content: string) => {
    setError('')
    let response
    try {
      openSpinner()
      response = await postComment(contentType, targetId, content)
      closeSpinner()
    } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
          closeSpinner()
        }
    }  
    return response
  }

  return { 
    post, 
    error, 
  }

}

export default usePostComment
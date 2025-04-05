type SetSeoParams = {
  title: string
  description: string
  image?: string
  url?: string
  siteName?: string
  type?: string
}

const setSeo = ({
    title,
    description,
    image,
    url = window.location.href,
    siteName = 'Nicolas Damm',
    type = 'website',
  }: SetSeoParams) => {

    document.title = title
    const setMeta = (nameOrProp: string, content: string, isProperty = false) => {
      if (!content) return

      const selector = isProperty
        ? `meta[property="${nameOrProp}"]`
        : `meta[name="${nameOrProp}"]`

      let element = document.querySelector(selector)
      if (element) {
        element.setAttribute('content', content)
      } else {
        element = document.createElement('meta')
        element.setAttribute(isProperty ? 'property' : 'name', nameOrProp)
        element.setAttribute('content', content)
        document.head.appendChild(element)
      }
    }
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('og:url', url, true)
    setMeta('og:type', type, true)
    setMeta('og:site_name', siteName, true)
    if (image) setMeta('og:image', image, true)
    setMeta('twitter:card', image ? 'summary_large_image' : 'summary')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    if (image) setMeta('twitter:image', image)

}

export default setSeo

export const Tag = ({ title, content }) => {
 

  return (
    <span class={`tag-${title}`}>
            {content}
    </span>
  )
}

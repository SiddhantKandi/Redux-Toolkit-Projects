import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice.js";

const ReactionButtons = ( {post} ) => {

  const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };

  const dispatch = useDispatch();

  
const reactionButtons =Object.entries(reactionEmoji).map(([name,emoji]) => {
    return (
      <button
      key = {name}
      type="button"
      className="reactionutton px-2 mx-0"
      onClick={ () => {
        dispatch(reactionAdded({postId : post.id, reaction : name}))
      }}
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  return <div>{reactionButtons}</div>
}

export default ReactionButtons;

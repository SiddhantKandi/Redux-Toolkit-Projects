import {useSelector} from 'react-redux'
import {selectAllUsers} from '../users/usersSlice.js'
import PropTypes from 'prop-types';

function PostAuthor({ userId }) {
  const users = useSelector(selectAllUsers);
  const author = users.find(user => user.id === userId);

  return (
    <>
      by {author ? author.name : 'Unknown author' }
    </>
  )
}
PostAuthor.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default PostAuthor

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentThunk, likeBlogThunk } from '../reducers/blogReducer'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import Divider from '@mui/material/Divider'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((store) => store.blogs.find((b) => b.id === id))
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  if (!blog) {
    return null
  }

  const updateLikes = async () => {
    dispatch(likeBlogThunk(blog))
  }
  const addComment = async () => {
    const updatedBlog = { ...blog, comments: [...blog.comments, comment] }
    dispatch(addCommentThunk(updatedBlog, comment))
    setComment('')
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 2 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {blog.title}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <Link href={blog.url} target="_blank" rel="noopener">
                {blog.url}
              </Link>
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="body1">likes {blog.likes}</Typography>
              <IconButton onClick={updateLikes} color="primary" size="small">
                <ThumbUpIcon />
              </IconButton>
            </Box>

            <Typography variant="body1" color="text.secondary">
              added by {blog.user.name}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h5" component="h3" gutterBottom>
            Comments
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              size="small"
              fullWidth
            />
            <Button
              onClick={addComment}
              variant="contained"
              color="primary"
              disabled={!comment.trim()}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add Comment
            </Button>
          </Box>

          {blog.comments.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No comments yet
            </Typography>
          ) : (
            <List>
              {blog.comments.map((c, index) => (
                <Box key={index}>
                  <ListItem sx={{ pl: 0 }}>
                    <ListItemText primary={c} />
                  </ListItem>
                  {index < blog.comments.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default Blog

import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

const User = () => {
  const id = useParams().id
  const user = useSelector((store) => store.users.find((u) => u.id === id))

  if (!user) {
    return null
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            Added blogs
          </Typography>
          {user.blogs.length === 0 ? (
            <Typography variant="body1" color="text.secondary">
              No blogs added yet
            </Typography>
          ) : (
            <List>
              {user.blogs.map((blog, index) => (
                <Box key={blog.id}>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/blogs/${blog.id}`}>
                      <ListItemText primary={blog.title} />
                    </ListItemButton>
                  </ListItem>
                  {index < user.blogs.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default User

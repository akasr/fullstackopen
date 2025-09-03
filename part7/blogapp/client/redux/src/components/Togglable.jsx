import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setVisibility } from '../reducers/formVisibilityReducer'

import { Button, Box } from '@mui/material'

const Togglable = (props) => {
  const visible = useSelector((store) => store.formVisibility)
  const dispatch = useDispatch()

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(setVisibility())
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} variant="contained" sx={{ mt: 1 }}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Box sx={{ p: 2, pt: 0 }}>
          <Button onClick={toggleVisibility} variant="contained" sx={{ mt: 1 }} fullWidth>
            cancel
          </Button>
        </Box>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable

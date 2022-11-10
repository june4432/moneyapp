import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

class BaseSalInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: 'YoungJun'};
      }

    render() {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              >
                
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                2022년 실수령액 계산기 😎
              </Typography>
              {/* <Button color="inherit">Login</Button> */}
            </Toolbar>
          </AppBar>
        </Box>
      );
    }
  }

export default BaseSalInfo;

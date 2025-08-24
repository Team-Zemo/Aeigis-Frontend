import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { theme } from '../../theme.js';

function Home() {
    return(
        <Box sx={{height: 400, width: '100%'}}>
          <Grid container>
            <Grid mt={25} item xs={12} md={6}>
              <Typography variant="h3" sx={{fontFamily: theme.typography.fontFamily, pl:13, fontSize : 150, fontWeight: '700'}}>See the signs,</Typography>
              <Typography variant="h3" sx={{fontFamily: theme.typography.fontFamily, pl:13, fontSize : 150, fontWeight: '700'}}>Draw the lines</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Typography>hi</Typography> */}
            </Grid>
          </Grid>
        </Box>
    )
}

export default Home;
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, TextField, MenuItem, Grid, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import ProfilePic from 'assets/images/picture-placeholder.jpg';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));


const UserCard = ({ isLoading }) => {
  const theme = useTheme();
  const workers = [
    {
      value: 'John Doe',
      label: 'John Doe',
    }
  ];
  return (
    <>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Grid container spacing={2}>
            <Grid xs={8}>
              <Box sx={{px:15, py:7}}>
                <TextField
                  id="outlined-select-worker"
                  select
                  defaultValue="John Doe"
                  sx={{width: '26ch'}}
                >
                  {workers.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Box sx={{px:15, py:0}}>
                <Button variant="contained" sx={{px:3, mx:1}}>
                  Mes
                </Button>
                <Button variant="contained" sx={{px:3, mx:1}}>
                  Publicar
                </Button>
              </Box>
            </Grid>
            <Grid xs={4}>
              <Box sx={{py:5, px:2, mx: 4}}>
                <List>
                  <ListItem alignItems="right" disableGutters sx={{ py: 0 }}>
                    <ListItemText
                      sx={{
                        py: 0,
                        mt: 0.45,
                        mb: 0.45
                      }}
                      primary={<Typography variant="h2">John Doe</Typography>}
                      secondary={
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.grey[500],
                            mt: 0.5
                          }}
                        >
                          CI: 0123456789
                        </Typography>
                      }
                    />
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={ProfilePic}
                        sx={{
                          ...theme.typography.commonAvatar,
                          ...theme.typography.largestAvatar,
                          backgroundColor: theme.palette.warning.light,
                          color: theme.palette.warning.dark
                        }}
                      >
                        
                      </Avatar>
                    </ListItemAvatar>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </CardWrapper>
      )}
    </>
  );
};

export default UserCard;

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import ProfileSection from './ProfileSection';
import { IconMenu2 } from '@tabler/icons';
import rutaImg from 'assets/images/logo-micabal-noback.png';

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          },
          mt:1.5
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <img src={rutaImg} alt="Micabal logo" width="80%"></img>
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.background.paper,
              color: theme.palette.primary.dark,
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      
      <Box sx={{mt:1.5}}>
        <h1>Nombre de sección</h1>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      <ProfileSection sx={{my:2}}/>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;

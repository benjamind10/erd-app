import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';

// Helper function to check if the user has the 'admin' role
const isAdmin = (): boolean => {
  const roles = localStorage.getItem('roles');
  return roles ? JSON.parse(roles).includes('admin') : false;
};

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  // Sidebar navigation items
  const items = [
    { label: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { label: 'Blogs', icon: <ArticleIcon />, path: '/admin/blogs' },
  ];

  // Only render if the user is an admin
  if (!isAdmin()) return null;

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)', // Adjust height to exclude the top bar (assuming it is 64px)
        width: 35, // Slimmer sidebar
        backgroundColor: 'primary.dark', // Distinguishing tone
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 2,
        boxShadow: 3,
        position: 'fixed',
        left: 0,
        top: 64, // Position below the top bar
        zIndex: 1200, // Ensure it appears above content
      }}
    >
      <List sx={{ width: '100%' }}>
        {items.map((item, index) => (
          <Tooltip key={index} title={item.label} placement="right" arrow>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: 'white',
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={{ minWidth: 0, justifyContent: 'center', color: 'white' }}
                >
                  {item.icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;

import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import ShareIcon from '@mui/icons-material/Share';
// import Collaboration from './Collaboration';

type MenuProps = {
	roomId?: string;
};

function Menu({ roomId }: MenuProps) {
	const handleClick = (action: string) => {
		console.log('Menu action:', action);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px' }}>
			<Tooltip title="Home">
				<IconButton onClick={() => handleClick('home')} size="small">
					<HomeIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Profile">
				<IconButton onClick={() => handleClick('profile')} size="small">
					<PersonIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Notifications">
				<IconButton onClick={() => handleClick('notifications')} size="small">
					<NotificationsIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Messages">
				<IconButton onClick={() => handleClick('messages')} size="small">
					<EmailIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Settings">
				<IconButton onClick={() => handleClick('settings')} size="small">
					<SettingsIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Share">
				<IconButton onClick={() => handleClick('share')} size="small">
					<ShareIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Logout">
				<IconButton onClick={() => handleClick('logout')} size="small">
					<LogoutIcon />
				</IconButton>
			</Tooltip>

			{/* <Collaboration
				roomId={roomId}
				onCodeUpdate={() => undefined}
				onRoomJoin={() => undefined}
			/> */}
		</div>
	);
}

export default Menu;
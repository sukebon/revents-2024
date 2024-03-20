import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';

interface NavBarProps {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBar({ setFormOpen }: NavBarProps) {
  return (
    <Menu inverted={true} fixed='top'>
      <Container>
        <MenuItem header>
          <img src="/logo.png" alt="logo" />
          Re-vnets
        </MenuItem>
        <MenuItem name='Events' />
        <MenuItem>
          <Button
            floated='right'
            positive={true}
            inverted={true}
            content="Create event"
            onClick={() => setFormOpen(true)}
          />
        </MenuItem>
        <MenuItem position='right'>
          <Button basic inverted content="Login" />
          <Button basic inverted content="Register" style={{ marginLeft: '0.5em' }} />
        </MenuItem>
      </Container>
    </Menu >
  );
}
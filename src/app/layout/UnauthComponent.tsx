import { Segment, Grid, Divider, GridRow, GridColumn, Header, Icon, ButtonGroup, Button, ButtonOr } from 'semantic-ui-react';
import { openModal } from '../common/modals/modalSlice';
import { useAppDispatch } from '../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
export default function UnauthComponent() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state.from || '/events';

  return (
    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical>Or</Divider>
        <GridRow verticalAlign='middle'>
          <GridColumn textAlign='center'>
            <Header icon>
              <Icon name='lock' />
              You need to be signed into do that
            </Header>
            <br />
            <ButtonGroup>
              <Button color='teal' content='Login'
                onClick={() =>
                  dispatch(openModal({ type: 'LoginForm', data: { from } }))}
              />
              <ButtonOr />
              <Button
                color='green'
                content='Register'
                onClick={() =>
                  dispatch(openModal({ type: 'RegisterForm', data: { from } }))}
              />
            </ButtonGroup>
          </GridColumn>
          <GridColumn>
            <Header icon>
              <Icon name='angle left' />
              Go back
              <Button
                style={{ marginTop: 10 }}
                content='Cancel'
                onClick={() => navigate(-1)}
              />
            </Header>
          </GridColumn>
        </GridRow>
      </Grid>
    </Segment>
  );
}
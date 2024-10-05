import { render } from '@testing-library/react';
import NotFound from '../../../components/error/NotFound';

describe('NotFound snapshots test', () => {
  it('NotFound snapshots test', () => {
    const component = render(
      <NotFound/>
    );
    expect(component).toMatchSnapshot();
  });
});
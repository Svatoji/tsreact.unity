import PlaceHolder from '@components/PlaceHolder';
import { render } from '@testing-library/react';

describe('placeHolder', () => {
  it('Renders', () => {
    const { container } = render(<PlaceHolder />);
    expect(container).toBeInTheDocument();

    expect(PlaceHolder).toBeFunction();
  });
});

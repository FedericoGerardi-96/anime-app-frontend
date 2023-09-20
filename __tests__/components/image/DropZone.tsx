import '@testing-library/jest-dom';
import {
  act,
  fireEvent,
  render,
  waitFor,
  screen,
} from '@testing-library/react';

import { ImageModal } from '../../../src/components/image/DropZone';

jest.mock('usehooks-ts', () => ({
  useMediaQuery: jest.fn().mockReturnValue(false),
}));
jest.mock('react-image-crop');
jest.mock('react-dropzone');

const onDropMock = jest.fn();
jest.mock('react-dropzone', () => ({
  useDropzone: (config: any) => {
    const filesAcepted = [
      new File(['file'], 'ping.jpeg', {
        type: 'image/jpeg',
      }),
    ];
    return {
      onDrop: onDropMock,
      acceptedFiles: filesAcepted,
      fileRejections: [],
      getRootProps: jest.fn().mockReturnValue({}),
      getInputProps: jest.fn().mockReturnValue({}),
    };
  },
}));

const image = {
  setImageSelected: () => {},
  imageSelected: {
    imageBase64: 'base64:aegeageanjgeajneaglkeag',
    imageFile: new File(['test content'], 'test.jpg', { type: 'image/jpeg' }),
  },
};

const imageNull = {
  setImageSelected: () => {},
  imageSelected: {
    imageBase64: null,
    imageFile: null,
  },
};

describe('test in <ImageModal/>', () => {
  test('should render withhout problems', () => {
    const { getByTestId } = render(<ImageModal image={image} />);
    screen.debug();
    expect(getByTestId('image-modal-page')).toBeInTheDocument();
  });

  test('should file upload withhout problems', async () => {
    const imageNull = {
      setImageSelected: () => {},
      imageSelected: {
        imageBase64: null,
        imageFile: null,
      },
    };

    const { getByTestId } = render(<ImageModal image={imageNull} />);

    window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url');
    const inputEl = getByTestId('dropzone') as HTMLInputElement;
    const file = new File(['file'], 'ping.jpeg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(inputEl, 'files', {
      value: [file],
    });

    await waitFor(() => {
      fireEvent.click(inputEl, file);
      expect(inputEl.files).toHaveLength(1);
    });
  });

  //   // test('should drop and render edit modal', async () => {
  //   //   const imageNull = {
  //   //     setImageSelected: () => {},
  //   //     imageSelected: {
  //   //       imageBase64: null,
  //   //       imageFile: null,
  //   //     },
  //   //   };
  //   //   render(<ImageModal image={imageNull} />);
  //   //   window.URL.createObjectURL = jest.fn().mockImplementation(() => 'url');
  //   //   const inputEl = screen.getByTestId('dropzone');
  //   //   const file = new File(['file'], 'ping.jpeg', {
  //   //     type: 'image/jpeg',
  //   //   });
  //   //   Object.defineProperty(inputEl, 'files', {
  //   //     value: [file],
  //   //   });
  //   //   fireEvent.drop(inputEl);
  //   //   waitFor(() =>
  //   //     expect(screen.findAllByTestId('modal-edit')).toBeInTheDocument()
  //   //   );
  //   // });

  //   // test('should change filter when change select filter', async () => {
  //   //   const file = new File(['file'], 'ping.jpeg', {
  //   //     type: 'image/jpeg',
  //   //   });

  //   //   const imageNull = {
  //   //     setImageSelected: () => {},
  //   //     imageSelected: {
  //   //       imageBase64: null,
  //   //       imageFile: null,
  //   //     },
  //   //   };

  //   //   const { getByTestId } = render(<ImageModal image={imageNull} />);

  //   //   const input = getByTestId('dropzone') as HTMLInputElement;

  //   //   act(() => {
  //   //     userEvent.upload(input, file);
  //   //   });

  //   //   screen.debug();
  //   //   // const select = await screen.getByTestId('select-filter');

  //   //   // act(() => {
  //   //   //   fireEvent.change(select, { target: { value: 'grayscale' } });
  //   //   // });

  //   //   // expect(select).toHaveValue('grayscale');
  //   // });

  //   // test.only('should change Flip Vertical when click on button', async () => {
  //   //   screen.debug();
  //   //   const horizontalFlitBtn = await screen.getByTestId('flip-horizontal');

  //   //   fireEvent.click(horizontalFlitBtn);

  //   //   expect(screen.getByTestId('left-rotate')).toHaveTextContent('90');
  //   // });
});

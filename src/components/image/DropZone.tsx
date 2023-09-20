'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Checkbox,
  Switch,
} from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/select';

import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { useMediaQuery } from 'usehooks-ts';

import {
  ArrowLeft,
  ArrowRight,
  FlipHorizontal,
  FlipVertical,
  MinusIcon,
  images,
} from '../../utils';
import { useDebounceEffect } from '../../hooks/useDebounceEffect';
import { ImageModalProps } from '../../interface';
import { PlusIcon } from '../../utils';

type ImageModalPropsC = {
  image: {
    setImageSelected: (image: ImageModalProps) => void;
    imageSelected: ImageModalProps;
  };
};

type file = {
  file: FileWithPath;
  errors: any;
};

const filters = [
  { id: 1, name: 'None', value: 'none' },
  { id: 2, name: 'Blur', value: 'blur(5px)' },
  { id: 3, name: 'Black And White ', value: 'grayscale(100%)' },
  { id: 4, name: 'Sepia', value: 'sepia(100%)' },
  { id: 5, name: 'Brightness', value: 'brightness(150%)' },
  { id: 6, name: 'Contrast', value: 'contrast(1.4)' },
  { id: 7, name: 'Tone rotation (90 degrees)', value: 'hue-rotate(90deg)' },
  { id: 8, name: 'Saturación', value: 'saturate(200%)' },
  { id: 9, name: 'Invert', value: 'invert(100%)' },
  { id: 10, name: 'Opacity', value: 'opacity(50%)' },
];

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const ImageModal = ({ image }: ImageModalPropsC) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('none');

  const mobileQuery = useMediaQuery('(max-width: 768px)');

  const [isSelectOriginalFile, setIsSelectOriginalFile] =
    useState<boolean>(false);

  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setScale(1);
    setRotate(0);
  }, [isOpen]);

  useEffect(() => {
    if (isSelectOriginalFile) {
      setScale(1);
      setRotate(0);
    }
  }, [isSelectOriginalFile]);

  const onDrop = async (acceptedFiles: any) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load',async () => {
        setImgSrc(reader.result?.toString() || '');
        await new Promise((resolve) => setTimeout(resolve, 0));
        onOpen();
      });
      reader.readAsDataURL(acceptedFiles[0]);
    }
  };

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        'image/jpeg': [],
        'image/png': [],
      },
      maxFiles: 1,
      onDrop: onDrop,
      maxSize: parseInt(process.env.NEXT_PUBLIC_MAX_SIZE_IMAGE || '200000'),
    });

  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => {
    return (
      <li key={file.path}>
        <span>{file.path}</span>
        <span className='flex gap-1'>{file.size} bytes</span>
      </li>
    );
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }: file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e: any) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {      
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        images.canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
          selectedFilter
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const handleToggleAspectClick = () => {
    if (aspect) {
      setAspect(undefined);
    } else {
      setAspect(16 / 9);

      if (imgRef.current) {
        const { width, height } = imgRef.current;
        const newCrop = centerAspectCrop(width, height, 16 / 9);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height));
      }
    }
  };

  const onSaveImageSelected = async () => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      const base64Image = await images.getBase64Image(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        scale,
        rotate,
        selectedFilter
      );
      const fileName = 'mi_imagen_recortada.jpg';
      const mimeType = 'image/jpeg';
      const blobImage = images.base64ToBlob(base64Image);
      const fileImage = images.blobToFile(blobImage, fileName, mimeType);
      image.setImageSelected({
        imageBase64: base64Image,
        imageFile: fileImage,
      });
      onClose();
    }
  };

  const fullCrop: Crop = {
    height: 150,
    unit: '%',
    width: 150,
    x: 0,
    y: 0,
  };

  const zoomIn = () => {
    setScale((e) => {
      if (e >= 3) {
        return 3;
      }
      return e + 0.05;
    });
  };
  const zoomOut = () => {
    setScale((e) => {
      if (e <= 0.5) {
        return 0.5;
      }
      return e - 0.05;
    });
  };

  const FlipHorizontalF = () => {
    setRotate((e) =>
      Math.min(180, Math.max(-180, Number(e === 90 ? -90 : 90)))
    );
  };
  const FlipVerticalF = () => {
    setRotate((e) =>
      Math.min(180, Math.max(-180, Number(e === 180 ? 0 : 180)))
    );
  };

  return (
    <>
      <div data-testid='image-modal-page' className='Crop-Controls mt-4'>
        <section className='container'>
          <div
            {...getRootProps({
              className: `dropzone bg-gray border-dashed border-2  p-6 
                          rounded-lg text-center 
                          cursor-pointer 
                          hover:border-blue-500
                          ${
                            acceptedFileItems.length === 1
                              ? 'border-primary'
                              : 'border-gray-300'
                          }`,
            })}>
            <input onClick={(e: any) => onDrop(e.target.files)} data-testid='dropzone' {...getInputProps()} />
            <p>Drag 'n' drop some file here, or click to select a file</p>
            <em className='mt-2 text-sm text-gray-500'>
              {JSON.stringify(acceptedFileItems.length)}
              {JSON.stringify(fileRejectionItems.length)}
              {JSON.stringify(isOpen)}
              (Only *.jpeg and *.png images will be accepted)
            </em>
          </div>
          <aside className='mt-4'>
            {image.imageSelected.imageFile &&
              acceptedFileItems.length === 1 && (
                <div className='flex items-center flex-col md:flex-row justify-center md:justify-around gap-4 register-image-preview'>
                  <Image
                    isBlurred
                    loading='lazy'
                    width={150}
                    height={150}
                    fallbackSrc='https://res.cloudinary.com/do3n04ysn/image/upload/v1692600735/anime-app/gw87wdnbncrslkemdxe4.png'
                    src={image.imageSelected.imageBase64!}
                    alt='user avatar'
                    className='m-5'
                    draggable='false'
                  />
                  <ul className='text-success overflow-hidden overflow-ellipsis whitespace-break-spaces w-[200px]'>
                    {acceptedFileItems}
                  </ul>
                </div>
              )}
            {fileRejectionItems.length === 1 && (
              <ul className='text-danger overflow-hidden overflow-ellipsis whitespace-nowrap w-full'>
                {fileRejectionItems}
              </ul>
            )}
          </aside>
        </section>
      </div>
      <Modal
        backdrop='opaque'
        placement='center'
        size={mobileQuery ? 'full' : 'xl'}
        scrollBehavior='inside'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}>
        <ModalContent className=''>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Select an image
              </ModalHeader>
              <ModalBody data-testid='modal-edit'>
                <div className='App'>
                  {!!imgSrc && (
                    <>
                      <div className='w-full grid grid-cols-2 p-2'>
                        <Checkbox
                          isSelected={isSelectOriginalFile}
                          onValueChange={setIsSelectOriginalFile}>
                          Use Original Size
                        </Checkbox>
                        <Switch
                          onChange={handleToggleAspectClick}
                          isSelected={aspect ? true : false}                          
                          defaultSelected
                          color='primary'>
                          Toggle aspect
                        </Switch>
                      </div>
                      <div className='w-full grid grid-cols-2'>
                        <Button
                          data-testid='flip-horizontal'
                          fullWidth
                          aria-label='Plus'
                          className='bg-grey-100'
                          onClick={FlipHorizontalF}>
                          Flip Horizontal
                          <FlipHorizontal />
                        </Button>
                        <Button
                          data-testid='flip-Vertical'
                          fullWidth
                          aria-label='Plus'
                          className='bg-grey-100'
                          onClick={FlipVerticalF}>
                          Flip Vertical
                          <FlipVertical />
                        </Button>
                      </div>
                      <div>
                        <Select
                          data-testid='select-filter'
                          aria-label='Select an Filter'
                          onChange={(e: any) =>
                            setSelectedFilter(e.target.value)
                          }
                          id='filter-select'
                          variant='underlined'
                          placeholder='Select an Filter'
                          className='w-full my-4'>
                          {filters.map((filter) => (
                            <SelectItem key={filter.value} value={filter.value}>
                              {filter.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>
                      <div className='w-full grid grid-cols-2'>
                        <Button
                          data-testid='left-rotate'
                          fullWidth
                          aria-label='left arrow'
                          className='bg-grey-100'
                          onClick={() =>
                            setRotate((e) =>
                              Math.min(180, Math.max(-180, Number(e + 2)))
                            )
                          }>
                          Rotate {rotate}
                          <ArrowLeft />
                        </Button>
                        <Button
                          data-testid='right-rotate'
                          fullWidth
                          aria-label='right arrow'
                          className='bg-grey-100'
                          onClick={() =>
                            setRotate((e) =>
                              Math.min(180, Math.max(-180, Number(e - 2)))
                            )
                          }>
                          Rotate {rotate}
                          <ArrowRight />
                        </Button>
                      </div>
                      <ReactCrop
                        className='m-10 overflow-x-hidden'
                        disabled={isSelectOriginalFile}
                        crop={isSelectOriginalFile ? fullCrop : crop}
                        onChange={(_, percentCrop) =>
                          setCrop(isSelectOriginalFile ? fullCrop : percentCrop)
                        }
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        style={{ filter: selectedFilter }}>
                        <img
                          ref={imgRef}
                          alt='Crop me'
                          src={imgSrc}
                          style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                            width: '100%',
                          }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                      <div className='w-full grid grid-cols-2'>
                        <Button
                          fullWidth
                          aria-label='Plus'
                          className='bg-grey-100'
                          onClick={zoomIn}>
                          Zoom {scale.toFixed(2)}
                          <PlusIcon />
                        </Button>
                        <Button
                          fullWidth
                          aria-label='minus'
                          className='bg-grey-100'
                          onClick={zoomOut}>
                          Zoom {scale.toFixed(2)}
                          <MinusIcon />
                        </Button>
                        <input
                          id='scale-input'
                          type='number'
                          step='0.1'
                          value={scale}
                          disabled={!imgSrc}
                          className='hidden'
                          onChange={(e) => setScale(Number(e.target.value))}
                        />
                      </div>
                    </>
                  )}

                  {!!completedCrop && (
                    <>
                      <div className='hidden'>
                        <canvas
                          ref={previewCanvasRef}
                          style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: completedCrop.width,
                            height: completedCrop.height,
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onSaveImageSelected}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

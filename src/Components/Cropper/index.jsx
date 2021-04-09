import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';

import { Box, Slider } from '@material-ui/core';
import Button from '../Button';

import { useTheme } from '../../lib/theme';

function Cropper({
  setCroppedImg,
  selectedFile,
  width,
  height,
  border,
  borderRadius,
  showCropper,
}) {
  const { thirdColor, secondaryColor, primaryColor } = useTheme();

  const editor = useRef();
  const [value, setValue] = useState(1);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  const onCrop = () => {
    if (editor) {
      const canvasScaled = editor.current.getImageScaledToCanvas().toDataURL();
      return setCroppedImg(canvasScaled, selectedFile.name);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={3}
      bgcolor={thirdColor}
      minHeight="100vh"
      className="cropper"
    >
      <Box textAlign="center" maxWidth={1} width={370}>
        <AvatarEditor
          ref={editor}
          image={selectedFile}
          width={width}
          height={height}
          borderRadius={borderRadius}
          color={[34, 34, 34, 0.7]}
          scale={value}
          rotate={0}
          border={border}
          disableHiDPIScaling
        />
      </Box>
      <Box mt={3} display="flex" alignItems="center" width={370} maxWidth={1}>
        <Box component="span" mr={3} />
        <Box flexGrow={1} display="flex">
          <Slider
            value={value}
            onChange={handleChange}
            min={1}
            step={0.1}
            max={5}
          />
        </Box>
        <Box component="span" ml={3} />
      </Box>
      <Box width={370} my={2} maxWidth={1}>
        <Button onClick={onCrop}>Сохранить</Button>
      </Box>
      <Box width={370} maxWidth={1}>
        <Button
          onClick={() => showCropper(false)}
          bgcolor="transparent"
          hoverBg={secondaryColor}
          color={primaryColor}
        >
          Отменить
        </Button>
      </Box>
    </Box>
  );
}

Cropper.propTypes = {
  setCroppedImg: PropTypes.func.isRequired,
  showCropper: PropTypes.func.isRequired,
  selectedFile: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  border: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default Cropper;

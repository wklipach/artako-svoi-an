import React from 'react';

import { Box } from '@material-ui/core';

import CommentsTimeIcon from '../../CustomIcons/commentsTimeIcon';
import SendIcon from '../../CustomIcons/sendIcon';
import FileUploadIcon from '../../CustomIcons/fileIcon';

import s from '../../../styles/Profile.module.scss';

function Comments({ primaryColor }) {
  return (
    <Box>
      <Box
        component="span"
        color={primaryColor}
        fontSize={17}
        fontWeight={500}
        style={{ cursor: 'pointer' }}
      >
        Посмотреть все комментарии
        <Box component="span" ml={0.5}>
          (26)
        </Box>
      </Box>
      <Box mt={3} display="flex" justifyConent="flex-start" maxWidth={516}>
        <Box component="img" src="DJI.png" width={52} height={52} />
        <Box display="flex" flexDirection="column" ml={1.5}>
          <Box
            component="span"
            color={primaryColor}
            fontSize={15}
            fontWeight={600}
          >
            Дональд Дрейпер
          </Box>
          <Box
            component="span"
            color={primaryColor}
            fontSize={15}
            fontWeight={500}
            py={0.5}
          >
            message
          </Box>
          <Box display="flex" alignItems="center">
            <CommentsTimeIcon />
            <Box component="span" color="rgba(0, 49, 102, 0.6);" fontSize={12}>
              15:20
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt={2} height={44} width={1} position="relative">
        <textArea
          className={s.textArea}
          placeholder="Оставьте комментарий..."
        />
        <Box
          position="absolute"
          top={12}
          right={12}
          zIndex={3}
          style={{ cursor: 'pointer' }}
        >
          <SendIcon />
        </Box>
        <Box
          position="absolute"
          top={16}
          right={56}
          zIndex={3}
          style={{ cursor: 'pointer' }}
        >
          <FileUploadIcon />
        </Box>
      </Box>
    </Box>
  );
}

export default Comments;

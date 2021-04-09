import React from 'react';
import Box from '@material-ui/core/Box';
import CommentsTimeIcon from '../../CustomIcons/commentsTimeIcon';
import CommentIcon from '../../CustomIcons/commentIcon';

function NewsMobile({ primaryColor }) {
  return (
    <Box
      mt={5}
      mx={2.5}
      maxHeight={400}
      height={440}
      borderRadius={19}
      position="relative"
      // onClick={() => push(`/place?id=${item.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <Box position="relative">
        <Box borderRadius={19} minHeight={236} width={1} bgcolor="#ccc" />
        <Box position="absolute" top={0} right={0} />
      </Box>
      <Box
        py={3}
        px={2.5}
        width={1}
        bgcolor="#FFFFFF"
        position="absolute"
        border="1px solid rgba(0, 49, 102, 0.16)"
        borderRadius={19}
        top={200}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          component="span"
          fontSize={17}
          color={primaryColor}
          fontWeight={600}
        >
          Мэрия предупредила Сбер, ВТБ, Mail.ru Group и другие...
        </Box>
        <Box mt={2} display="flex">
          <Box pr={2.5}>
            <CommentsTimeIcon />
            <Box component="span" color={primaryColor} pl={1}>
              19 Июн 2020 в 12:20
            </Box>
          </Box>
          <Box>
            <CommentIcon />
            <Box component="span" color={primaryColor} pl={1}>
              2.4k
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NewsMobile;

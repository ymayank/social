import React from 'react';
import { Snackbar, IconButton } from '@material-ui/core';
import { Close  } from '@material-ui/icons';
import { observer, inject } from 'mobx-react';

function Toast(props) {
    const { toast, hideToast } = props.home;
    return (
        <Snackbar
            anchorOrigin={{ vertical: toast.vertical, horizontal: toast.horizontal }}
            open={toast.open}
            onClose={hideToast}
            message={toast.message}
            key={toast.vertical + toast.horizontal}
            autoHideDuration={toast.autoHideDuration}
            action={<IconButton size="small" aria-label="close" color="inherit" onClick={hideToast}>
            <Close fontSize="small" />
            </IconButton>}
      />
    );
}

export default inject('home')(observer(Toast));
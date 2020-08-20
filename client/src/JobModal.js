import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function JobModal({job, open, handleClose}) {

    if (!job.title){return <div/>}

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {job.title} 
                    <img className={'detail-logo'} src={job.company_logo}/>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                        dangerouslySetInnerHTML = {{__html: job.description}}
                    />
                </DialogContent>
                <DialogActions>
                    <a className={'apply-button'} href={job.url} target="_blank">
                        <Button color="primary">
                            Apply
                        </Button>
                    </a>
                    <Button onClick={handleClose} color="secondary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
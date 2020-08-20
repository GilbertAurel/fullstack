import React from "react";

// Material UI
import Typography from '@material-ui/core/Typography';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
 
import Job from './Job';
import JobModal from './JobModal';
// import { DialogContent } from "@material-ui/core";


export default function Jobs({jobs}){

    // Job modal
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    // Stepper state and pagination
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = Math.ceil(jobs.length / 20);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const jobsOnPage = jobs.slice(activeStep * 20, (activeStep * 20)+20);
      
    return(
        <div className="jobs">
            <JobModal job={selectedJob} open={open} handleClose={handleClose}/>
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                {jobs.length} jobs available
            </Typography>
            {
                jobsOnPage.map(
                    (job,i) => <Job key={i} job={job} onClick={() => {
                        handleClickOpen();
                        selectJob(job);
                    } } />
                )
            }
            {/* <div>
                Page {activeStep + 1} of {maxSteps - 1}
            </div> */}
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                    Next
                    {<KeyboardArrowRight />}
                </Button>
                }
                backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {<KeyboardArrowLeft />}
                    Back
                </Button>
                }
            />
        </div>
    );
}
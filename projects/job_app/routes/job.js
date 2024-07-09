import express from 'express';
import {createJob, deleteJob, listJob, updateJob} from '../controller/job.js';

const router = express.Router();

router.post('/',createJob);
router.get('/',listJob);
router.put('/:id',updateJob);
router.delete('/:id',deleteJob)

export default router;
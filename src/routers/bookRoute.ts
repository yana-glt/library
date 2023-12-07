import express ,{Router, Request, Response} from 'express';
import BookController from '../controllers/bookController';

const router:Router = express.Router();

router.get('/', BookController.getBook);

export default router;
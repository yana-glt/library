import express ,{Router, Request, Response} from 'express';
import BookController from '../controllers/bookController';

const router:Router = express.Router();

router.get('/', BookController.getBook);
// router.get('/', (req:Request, res:Response) => {
//     res.send("the first book get response");
// })
// router.post('/', (req:Request, res:Response) => {
//     res.send("the first book post response");
// })
// router.put('/:id', (req:Request, res:Response) => {
//     res.send("the first book update response");
// })
// router.delete('/:id', (req:Request, res:Response) => {
//     res.send("the first book delete response");
// })
export default router;
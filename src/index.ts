import express, {Request, Response} from "express";

const cors = require('cors') as any;
import taskRouter from "./routes/tasks";
import multer from "multer";
import path from "node:path";
import {deleteAllFiles, deleteFile, fileExists, getAllFilesSorted} from "./helper/helper";

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext)
        cb(null, `${baseName}-${Date.now()}${ext}`);
    }
});

const upload = multer({storage})

app.use(cors());

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/tasks', taskRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the todo application!');
})

app.get('/about', (req: Request, res: Response) => {
    res.send('About this application');
})

app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({error: 'File is required'});
    }
    const filePath = `/uploads/${req.file.filename}`

    res.status(200).json({
        message: 'File uploaded successfully',
        filePath: filePath,
    });
})

app.get('/uploads/file/:filename', (req: Request, res: Response) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', fileName);

    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).json({error: 'File not found'});
        }
    });
})

app.get('/uploads/lastfile', async (req: Request, res: Response) => {
    const files = await getAllFilesSorted(path.join(__dirname, "uploads"));
    const file = files[0];
    const filePath = path.join(__dirname, "uploads", file);
    res.status(200).json({
        file: file,
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
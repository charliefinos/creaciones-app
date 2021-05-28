import path from 'path'
import express from 'express'
import multer from 'multer'
import pkg from 'cloudinary'
import asyncHandler from 'express-async-handler'

const cloudinary = pkg

const router = express.Router()


const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only')
    }
}

const upload = multer({
    storage,
    fielFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

function uploadToCloudinary(image) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(image, (err, url) => {
            if (err) return reject(err);
            return resolve(url);
        })
    });
}

router.post('/', upload.single('image'), asyncHandler(async (req, res) => {
    console.log(req.file.path)
    const uploadPhoto = await cloudinary.v2.uploader.upload(`${req.file.path.replace(/\\/g, "/")}`)
    console.log(uploadPhoto) // This will give you all the information back from the uploaded photo result
    console.log(uploadPhoto.url)  // This is what we want to send back now in the  res.send

    if (uploadPhoto) {
        res.json({
            image: uploadPhoto.url
        })
    } else {
        res.status(500)
    }

}))
// router.post('/', upload.single('image'), (req, res) => {
//     res.send(`/${req.file.path.replace(/\\/g, "/")}`)
// })

export default router
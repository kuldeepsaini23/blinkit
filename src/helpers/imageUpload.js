import fs from 'fs'
import AWS from 'aws-sdk'

// Destructuring assignment for better readability
const {
  AWS_S3_BUCKET_NAME,
  AWS_S3_BUCKET_REGION,
  AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY,
} = process.env

// Check if all required environment variables are set 
if (
  !AWS_S3_BUCKET_NAME ||
  !AWS_S3_BUCKET_REGION ||
  !AWS_S3_ACCESS_KEY || 
  !AWS_S3_SECRET_KEY
) {
  throw new Error('One or more AWS S3 environment variables are missing.')
}

const s3 = new AWS.S3({
  accessKeyId: AWS_S3_ACCESS_KEY,
  secretAccessKey: AWS_S3_SECRET_KEY,
  region: AWS_S3_BUCKET_REGION,
})

// Use async/await for better readability
export default async function uploadImage(file) {
  try {


    // Specify the folder path in the Key property
    const folderPath = 'users' 
    const key = `${folderPath}/${file.name}`

    const params = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key, // Use the specified folder path in the key
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }

    // Use the promise version of S3.upload
    const data = await s3.upload(params).promise()

    // Log success message for better debugging
    console.log('File uploaded successfully:', data.Location)

    return data
  } catch (error) {
    // Log error for better debugging
    console.error('Error uploading file:', error.message)

    // Rethrow the error to propagate it up the chain
    throw error
  }
}

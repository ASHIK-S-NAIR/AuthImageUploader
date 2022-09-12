
# AuthImageUploader

Rest api method in nodejs which allows only authenticated users to upload the image of maximum size of 500KB.


## API Reference

#### POST Signup

```http
  POST /api/v1/auth/signup
```
Takes five values and returns the stored user details.

```http
--- userFirstName
--- userLastName
--- userPhoneNumber
--- userEmail
--- userPassword
```

#### POST login

```http
  POST /api/v1/auth/login
```
Takes two values and returns the token with user details.
```http
--- userEmail
--- userPassword
```

#### POST image

```http
  POST /api/v1/image/${userId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | **Required**. Id of user to upload Image |

Takes image with token and returns the stored image details.
```http
--- image
```

## Deployment

Project is deployed on Heroku. Database used is mongoDB Atlas. Cloudinary is used for storing images.
 Deployment Link : https://authimageuploader.herokuapp.com




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URL`
 
`SECRET`

`CLOUDINARY_CLOUDNAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`




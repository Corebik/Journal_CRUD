// import { Cloudinary } from "cloudinary";

// const cloudinary = new Cloudinary({
//     cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
//     api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
//     api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
//     secure: true
//   });

//   export const deleteImageCloudinary = async({ imageUrls = [] }) => {

//     const removeAction = cloudinary.v2.api.delete_resources(imageUrls);
//     removeAction
//       .then(result => console.log(result))
//       .catch(error => console.log(error));

// }
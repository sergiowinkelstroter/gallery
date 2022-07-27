import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 as createID } from "uuid";

export const getAll = async () => {
  let list: Photo[] = [];

  const imagesFolder = ref(storage, "images");
  const photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    let photoUrl = await getDownloadURL(photoList.items[i]);

    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
    });
  }

  return list;
};

export const insert = async (file: File) => {
  if (["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
    let randomName = createID();
    let newFile = ref(storage, `images/${randomName}`);
    let upload = await uploadBytes(newFile, file);
    let photoUrl = await getDownloadURL(upload.ref);
    return {
      name: upload.ref.name,
      url: photoUrl,
    } as Photo;
  } else {
    return new Error("Tipo de arquivo não permitido.");
  }
};

export const deleteFile = async (name: string) => {
  const desertRef = ref(storage, `images/${name}`);

  deleteObject(desertRef)
    .then(() => {
      console.log("File deleted successfully");
    })
    .catch(() => {
      console.log("Uh-oh, an error occurred!");
    });
};

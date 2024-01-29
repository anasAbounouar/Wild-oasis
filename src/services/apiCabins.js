import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("cabins could not be loaded");
  }

  return cabins;
}
export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("cabin could not be deleted");
  }
}

export async function createCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin?.image?.name?.replaceAll("/", "")}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //a create cabin
  let data, error;
  if (!id) {
    ({ data, error } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePath }])
      .select());
    if (error) {
      console.error(error);
      throw new Error("cabins could not be created");
    }
  }
  //b edit cabin
  else {
    console.log(newCabin);
    ({ data, error } = await supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select());
    if (error) {
      console.error(error);
      throw new Error("cabins could not be modified");
    }
  }

  //upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3 delete if there is an error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      " Cabin image could not be uploaded so the cabin was not created",
    );
  }
  return data;
}
// export async function createCabin(newCabin, id) {
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   const imageName = `${Math.random()}-${newCabin.image.name.replaceAll("/", "")}`;
//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

//   let data, error;

//   // Create or update cabin
//   if (!id) {
//     // Create cabin
//     ({ data, error } = await supabase
//       .from("cabins")
//       .insert([{ ...newCabin, image: imagePath }])
//       .single());
//   } else {
//     // Edit cabin
//     ({ data, error } = await supabase
//       .from("cabins")
//       .update({ ...newCabin, image: imagePath })
//       .eq("id", id)
//       .single());
//   }

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin operation failed");
//   }
//   // Upload image
//   if (!hasImagePath) {
//     const { error: storageError } = await supabase.storage
//       .from("cabin-images")
//       .upload(imageName, newCabin.image);
//     if (storageError) {
//       // Optionally, delete the cabin if image upload fails
//       await supabase.from("cabins").delete().eq("id", data.id);
//       console.error(storageError);
//       throw new Error("Cabin image could not be uploaded");
//     }
//   }
//   return data;
// }

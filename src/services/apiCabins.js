import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

export async function getCabins() {
  console.log("get cabins");
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
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl) || false;
  console.log(hasImagePath);
  const imageName = `${Math.random()}-${newCabin.image.name.replaceAll("/", "")}`;
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  //a create cabin
  if (!id) {
    query.insert([{ ...newCabin, image: imagePath }]);
  }
  //b edit
  if (id) {
    query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query.select().single();
  //b edit cabin
  if (error) {
    console.error(error);
    throw new Error("cabins could not be created");
  }
  //upload image

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

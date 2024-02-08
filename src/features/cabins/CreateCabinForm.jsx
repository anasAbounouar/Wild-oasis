import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // const queryClient = useQueryClient();
  // const { register, handleSubmit, reset, getValues, formState } = useForm({
  //   defaultValues: isEditSession ? editValues : {},
  // });
  // const { errors } = formState;

  // const { isPending: isCreating, mutate: createNewCabin } = useMutation({
  //   mutationFn: createCabin,
  //   onSuccess: () => {
  //     toast.success("cabin is  successfully  created");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     // reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });
  // const { isPending: isEditing, mutate: editCabin } = useMutation({
  //   mutationFn: ({ newCabin, id }) => createCabin(newCabin, id),
  //   onSuccess: () => {
  //     toast.success("cabin is  successfully  edited");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabins"],
  //     });
  //     // reset();
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     console.log(err.message);
  //     toast.error(err.message);
  //   },
  // });
  const { editCabin, createNewCabin, isWorking } = useCreateCabin();
  // function onSubmit(data) {
  //   createNewCabin({ ...data, image: data.image[0] });
  // }
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editCabin(
        { newCabin: { ...data, image }, id: editId },
        { onSuccess: () => onCloseModal?.() },
      );
    } else {
      createNewCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        },
      );
    }
  }
  if (isWorking) {
    return <Spinner />;
  }
  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "this field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "this field is required",
            min: {
              value: 1,
              message: "Price should be at least 1 ",
            },
          })}
        />
      </FormRow>
      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          {...register("discount", {
            required: "this field is required",
            validate: (value) =>
              value < getValues().regularPrice ||
              "discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          id="description"
          disabled={isWorking}
          {...register("description", { required: "this field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "image is required ",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        {!isEditSession && (
          <Button
            onClick={() => onCloseModal?.()}
            size="medium"
            type="reset"
            variation="secondary"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isWorking}
          variation="primary"
          size="medium"
        >
          {isEditSession ? "Modify cabin" : "Create New  Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;

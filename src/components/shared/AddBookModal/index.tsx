import { useForm, SubmitHandler } from "react-hook-form";
import { useSWRConfig } from "swr";
import { endpoints } from "@/apis/interfaces/books";
import { useModal } from "../Modal/ModalContext";

import Modal from "@/components/shared/Modal";

import type { BookItemType } from "@/entities/Book";
import type { ModalDataState } from "../Modal/ModalContext";
import { useEffect } from "react";

type BookItemInputs = Omit<BookItemType, "id">;

export const MODAL_TYPE = "add-book";

const AddBookModal = () => {
  const { isVisible, closeModal, modalData } = useModal();
  const visible = isVisible(MODAL_TYPE);

  const bookData = (modalData as ModalDataState)[MODAL_TYPE];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookItemInputs>();
  const { cache, mutate } = useSWRConfig();

  const onSubmit: SubmitHandler<BookItemInputs> = async (data) => {
    const recentData = cache.get(endpoints.getBookList)?.data;

    // get the highest ID of item as referece to create new ID
    const highestId = Math.max(
      ...recentData.map((item: { id: number }) => item.id)
    );
    const books = localStorage.getItem("books") || "[]";
    const booksObject = JSON.parse(books);
    data.publicationDate = new Date(data.publicationDate).toISOString();

    const payload = {
      id: highestId + 1,
      isLocal: true,
      ...data,
    };

    const newData = [payload, ...booksObject];

    // add data to fetcher cache
    mutate(endpoints.getBookList, [payload, ...recentData], {
      revalidate: false,
    });

    localStorage.setItem("books", JSON.stringify(newData));
    closeModal();
    reset();
  };

  useEffect(() => {
    reset(bookData);
  }, [bookData?.id]);

  return (
    <Modal title="Add new book" visible={visible} onClose={closeModal}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p style={{ marginBottom: 6, marginTop: 12 }}>Title</p>
        <input type="text" {...register("title", { required: true })} />
        {errors.title && errors.title.type === "required" && (
          <span className="input-error-msg">Title is required</span>
        )}
        <p style={{ marginBottom: 6, marginTop: 12 }}>Author</p>
        <input type="text" {...register("author", { required: true })} />
        {errors.author && errors.author.type === "required" && (
          <span className="input-error-msg">Author is required</span>
        )}
        <p style={{ marginBottom: 6, marginTop: 12 }}>Description</p>
        <input type="text" {...register("description")} />

        <p style={{ marginBottom: 6, marginTop: 12 }}>Cover URL</p>
        <input type="text" {...register("cover", { required: true })} />
        {errors.cover && errors.cover.type === "required" && (
          <span className="input-error-msg">Cover is required</span>
        )}

        <p style={{ marginBottom: 6, marginTop: 12 }}>Publication Date</p>
        <input
          type="date"
          {...register("publicationDate", { required: true })}
        />
        {errors.publicationDate && errors.publicationDate.type === "required" && (
          <span className="input-error-msg">Date is required</span>
        )}
        

        <button className="btn w-full" style={{ marginTop: 20 }} type="submit">
          Save
        </button>
      </form>
    </Modal>
  );
};

export default AddBookModal;

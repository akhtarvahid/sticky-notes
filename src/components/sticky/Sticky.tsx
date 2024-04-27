import { useMemo, useState } from "react";
import CreateSticky from "./create-sticky/CreateSticky";
import StickyList from "./stickies-list/StickyList";
import {
  useDeleteSticky,
  useGetStickies,
  usePostSticky,
  useUpdateSticky,
} from "../../hooks/useStickyService";
import {
  InputSticky,
  Sticky,
} from "../../types/create-sticky/create-sticky.type";
import Skeleton from "../common/Skeleton";
import Button from "react-bootstrap/Button";
import ToastMessage from "./toast-message/ToastMessage";

function StickyIndex() {
  const [selectedSticky, setSelectedSticky] = useState<Sticky | null>(null);
  const [isCreatingSticky, setIsCreatingSticky] = useState(false);
  const [show, setShow] = useState(false);
  const { data: stickiesData, isLoading: isStickyLoading } = useGetStickies();
  const { createSticky, isCreating, createError } = usePostSticky();
  const { deleteSticky, isDeleting, deleteError } = useDeleteSticky();
  const { updateSticky, isUpdating, updateError } = useUpdateSticky();

  const stickyList = useMemo(() => {
    return stickiesData ? [...stickiesData].reverse() : [];
  }, [stickiesData]);

  const handleCreateSticky = async (sticky: InputSticky) => {
    let response;
    if (sticky.title) {
      try {
        response = await createSticky(sticky);
      } catch (err) {}

      if (response) {
        setShow(true);
        setIsCreatingSticky(false);
      }
    }
  };
  const handleDeleteSticky = async (id: string) => {
    try {
      await deleteSticky(id);
    } catch (err) {}
  };
  const handleUpdateSticky = async (sticky: any) => {
    try {
      await updateSticky({
        requestBody: sticky,
        queryParams: { id: sticky.id },
      });
    } catch (err) {}
    setSelectedSticky(null);
  };

  const isLoading = isStickyLoading || isCreating || isDeleting || isUpdating;
  const hasError = createError || deleteError || updateError;

  if (hasError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="sticky-root">
      <div className="sticky">
        <div className="sticky-header">
          <h1>Topics note</h1>
          <Button
            className="create-btn"
            variant="primary"
            onClick={() => setIsCreatingSticky(true)}
          >
            Create
          </Button>
        </div>

        {isCreatingSticky && (
          <CreateSticky
            onCreateSticky={handleCreateSticky}
            onUpdateSticky={handleUpdateSticky}
            selectedSticky={selectedSticky}
          />
        )}
        <hr />
        {isLoading ? (
          <Skeleton />
        ) : (
          <StickyList
            stickies={stickyList}
            deleteSticky={handleDeleteSticky}
            setSelectedSticky={setSelectedSticky}
          />
        )}
      </div>
      <ToastMessage show={show} setShow={setShow} />
    </div>
  );
}

export default StickyIndex;

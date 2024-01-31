import { SliceSummary } from "@components/DuffelNGSView/SliceSummary";
import { OfferSlice, OfferSliceProps } from "@components/OfferSlice/OfferSlice";
import { OfferSliceConditions } from "@components/OfferSlice/OfferSliceConditions";
import { Modal, ModalBody, ModalProps } from "@components/shared/Modal";
import { SliceCarriersTitle } from "@components/shared/SliceCarriersTitle";
import { VSpace } from "@components/shared/VSpace";

interface OfferSliceModalProps extends Pick<ModalProps, "isOpen" | "onClose"> {
  slice: OfferSliceProps["slice"];
}

export const OfferSliceModal: React.FC<OfferSliceModalProps> = ({
  slice,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps}>
      <ModalBody tall noPadding>
        <div className="offer-slice-modal-title offer-slice-modal-padding">
          Flight Details
        </div>
        <hr className="offer-slice-modal-divider" />
        <VSpace space={24} className="offer-slice-modal-padding">
          <SliceCarriersTitle slice={slice} />
          <SliceSummary slice={slice} />
        </VSpace>
        <OfferSlice slice={slice} />
        <hr className="offer-slice-modal-divider" />
        <div className="offer-slice-modal-padding">
          <OfferSliceConditions slice={slice} />
        </div>
      </ModalBody>
    </Modal>
  );
};

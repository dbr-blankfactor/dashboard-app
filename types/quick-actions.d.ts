import { ModalType } from "@/components/home/quick-actions";

export interface quickAction {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  bgIcon: string;
  bgIconApproved?: string;
  bgColorApproved?: string;
  bgColor: string;
  textColor: string;
  href?: string;
  openModal: boolean;
  modalType?: ModalType;
}

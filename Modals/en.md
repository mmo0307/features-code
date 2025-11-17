# Modals component

### Providers
```
import type { PropsWithChildren } from 'react';

import { Modals } from '@/components/ui/Modals';

export function Providers({ children }: PropsWithChildren) {
    return (
        <>
            // ...other providers
            {children}
            <Modals />
        </>
    );
}
```

### Modal types
```
export enum EModalName {
  PurchaseSuccessfulModal = 'PurchaseSuccessfulModal',
  LeaveEmailModal = 'LeaveEmailModal',
}

export type TModalPropsMap = {
  [EModalName.PurchaseSuccessfulModal]: undefined;
  [EModalName.LeaveEmailModal]: { skipRoute: string };
};

export type TModalConfig = {
  [K in keyof TModalPropsMap]: TModalPropsMap[K] extends undefined
    ? { name: K; cancelText?: string; props?: undefined }
    : { name: K; cancelText?: string; props: TModalPropsMap[K] };
}[keyof TModalPropsMap];
```

### ModalsStore
```
import { create } from 'zustand';

type TModalsStore = {
  modals: TModalConfig[];
  openModal: (modal: TModalConfig) => void;
  closeModal: () => void;
  closeModals: () => void;
};

export const useModalsStore = create<TModalsStore>((set) => ({
  modals: [],
  openModal: (modal) =>
    set((state) => {
      if (state.modals.find((m) => m.name === modal.name)) {
        return state;
      }
      return {
        modals: [...state.modals, modal],
      };
    }),
  closeModal: () =>
    set((state) => {
      const newModals = [...state.modals];
      newModals.pop();
      return { modals: newModals };
    }),
  closeModals: () => set({ modals: [] }),
}));
```

### Hooks: useModals / useModalsActions
```
import { useShallow } from 'zustand/react/shallow';

import { useModalsStore } from '@/stores/global/useModalsStore';

export const useModalsActions = () => {
  return useModalsStore(
    useShallow((s) => ({
      openModal: s.openModal,
      closeModal: s.closeModal,
      closeModals: s.closeModals,
    })),
  );
};

export const useModals = () => {
  const modals = useModalsStore((s) => s.modals);
  return { modals };
};
```

### LeaveEmailModal (Example)
```
import { EModalName, TModalPropsMap } from '@/stores/global/useModalsStore';

type TLeaveEmailModalProps = TModalPropsMap[EModalName.LeaveEmailModal];

export const LeaveEmailModal = ({ skipRoute }: TLeaveEmailModalProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">Leave your email</h2>
      <p className="text-sm text-neutral-700">
        After success we will redirect you to: {skipRoute}
      </p>
      {/* ...контент модалки */}
    </div>
  );
};
```

### renderModal
```
import { lazy } from 'react';

import { EModalName, type TModalConfig } from '@/stores/global/useModalsStore';
import { LeaveEmailModal } from './LeaveEmailModal';

const LazyPurchaseSuccessfulModal = lazy(() =>
  import('./PurchaseSuccessfulModal').then((module) => ({
    default: module.PurchaseSuccessfulModal,
  })),
);

const renderModal = (modal: TModalConfig) => {
  switch (modal.name) {
    case EModalName.PurchaseSuccessfulModal:
      return <LazyPurchaseSuccessfulModal {...modal.props} />;

    case EModalName.LeaveEmailModal:
      return <LeaveEmailModal {...modal.props} />;

    default:
      return null;
  }
};
```

### SingleModal
```
import { AnimatePresence, motion } from 'motion/react';

import { useModals, useModalsActions } from '@/hooks/useModals';
import { Button } from '@/components/ui';
import { Close } from '@/assets/icons';

const SingleModal = ({ modal }: { modal: TModalConfig }) => {
  const { modals } = useModals();
  const { closeModal } = useModalsActions();
  const currentModal = modals[modals.length - 1];

  if (!currentModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={modal.name}
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <div className="relative rounded-xl bg-white p-6 shadow-lg">
          <Button
            onClick={closeModal}
            className="absolute right-4 top-4 h-8 w-8 rounded-full"
          >
            <Close className="size-4" />
          </Button>

          {renderModal(modal)}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
```

### Modals
```
export const Modals = () => {
  const { modals } = useModals();

  return (
    <>
      {modals.map((modal, i) => (
        <SingleModal modal={modal} key={i + modal.name} />
      ))}
    </>
  );
};
```

### Example Call result
```
import { EModalName } from '@/stores/global/useModalsStore';
import { useModalsActions } from '@/hooks/useModals';

const Example = () => {
  const { openModal } = useModalsActions();

  return (
    <button
      onClick={() =>
        openModal({
          name: EModalName.LeaveEmailModal,
          cancelText: 'Cancel',
          props: {
            skipRoute: '/dashboard',
          },
        })
      }
    >
      Open LeaveEmailModal
    </button>
  );
};
```
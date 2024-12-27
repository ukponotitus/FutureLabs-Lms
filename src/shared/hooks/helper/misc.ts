import { NotificationType } from "@/core/types/enum/notification";
import { LoadingConfig, ErrorConfig } from "@/shared/components/loader/loader.interface";
import useLoadingStore from "@/stores/loadingState";
import useNotificationStore from "@/stores/notificationState";
import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>(value);
  if (ref.current !== value) {
    ref.current = value;
  }
  return ref.current;
};

export const useManageLoadingState = (isLoading: boolean, loadingConfig: LoadingConfig) => {
  const { setLoading, isLoading: stateLoader } = useLoadingStore((state: any) => state);
  const prevLoading = usePrevious(isLoading);

  useEffect(() => {
    if (isLoading != stateLoader && loadingConfig.displayLoader) {
      setLoading(isLoading, loadingConfig);
    }
  }, [prevLoading]);
};

export const useManageErrorNotifications = (error: Error, errorConfig: ErrorConfig) => {
  const setNotification = useNotificationStore((state: { setDisplay: any; }) => state.setDisplay);

  if (error && errorConfig.displayError) {
    setNotification(true, {
      type: NotificationType.error,
      content: {
        title: errorConfig.title ?? "Error",
        text: errorConfig.text ?? (error as Error).message,
      },
    });
  }
};
import { toast } from 'sonner';

export const showToast = ({ message, status }: { message: string; status: number }) => {
    if (status >= 200 && status <= 299) {
      toast.success(message);
    } else if (status >= 400 && status <= 499) {
      toast.warning(message);
    } else if (status >= 500 && status <= 599) {
      toast.error(message);
    } else {
      toast(message);
    }
};
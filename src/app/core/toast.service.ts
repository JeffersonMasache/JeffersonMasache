import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() { }
  showSuccess(message: string) {
    const toast = document.createElement('div');
    toast.classList.add('toast', 'toast-success');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  showError(message: string) {
    const toast = document.createElement('div');
    toast.classList.add('toast', 'toast-error');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}

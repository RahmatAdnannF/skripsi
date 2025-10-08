//helpers > index.js

import { format } from 'date-fns';

export function togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

export function CurrentDateTime() {
  const currentDate = new Date();
  const options = { timeZone: 'Asia/Jakarta' };
  console.log(options)
  const year = currentDate.toLocaleString('en-US', { year: 'numeric', timeZone: 'UTC' });
  const month = String(currentDate.toLocaleString('en-US', { month: '2-digit', timeZone: 'UTC' })).padStart(2, '0');
  const day = String(currentDate.toLocaleString('en-US', { day: '2-digit', timeZone: 'UTC' })).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}

export function formatDate(date, formatType) {
  let formattedDate = '';
  switch (formatType) {
    case 'type1':
      formattedDate = format(date, 'dd-MM-yyyy', { timeZone: 'Asia/Jakarta' });
      break;
    case 'type2':
      formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Jakarta' });
      break;
    case 'type3':
      formattedDate = format(date, 'MMM-dd', { timeZone: 'Asia/Jakarta' });
      break;
    case 'type4':
      formattedDate = format(date, 'yyyy-MM-dd', { timeZone: 'Asia/Jakarta' });
      break;
    case 'type5':
      formattedDate = format(date, 'dd-MMM-yyy', { timeZone: 'Asia/Jakarta' });
      break;
    default:
      formattedDate = '';
      break;
  }
  return formattedDate;
}

export function getDueDateClass(dueDate, diffDate) {
  const currentDate = new Date();
  const date = new Date(dueDate);
  const diffTime = date - currentDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'text-red-500 blink'; // Overdue
  } else if (diffDays <= diffDate) {
    return 'text-orange-500 blink'; // Due soon
  } else {
    return 'text-grey-800';
  }
}


export function formatCurrency(value) {
  const numericValue = typeof value === 'number' ? value : parseFloat(value);

  const formattedCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(numericValue);

  return formattedCurrency;
}


export function statusColors(status) {
  const colorMap = {
    complete: '#28a745',
    dueDate: '#FF5252',
    pending: '#FFD952',
    Doing: '#17a2b8',
    Active: '#28a745',
    Publish: '#28a745',
    Inactive: '#ff0000'
  };

  if (status in colorMap) {
    return colorMap[status];
  } else {
    return '#6c757d';
  }
}

export function randomColor() {

  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export function statusNumber(status) {
  if (status == 1) {
    return 'Active'
  } else if (status == 0) {
    return 'Inactive'
  }
}

export function statusRole(role) {
  if (role == 1) {
    return 'Super Admin'
  } else if (role == 99) {
    return 'Guest'
  } else {
    return 'Unknown'
  }
}



